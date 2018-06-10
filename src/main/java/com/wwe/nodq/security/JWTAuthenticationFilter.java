/*
 * MIT License
 * Copyright (c) 2018 David Acosta
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
 * NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
package com.wwe.nodq.security;

import java.io.IOException;

import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import static com.wwe.nodq.security.SecurityConstants.EXPIRATION_TIME;
import static com.wwe.nodq.security.SecurityConstants.HEADER_STRING;
import static com.wwe.nodq.security.SecurityConstants.SECRET;
import static com.wwe.nodq.security.SecurityConstants.TOKEN_PREFIX;
import com.wwe.nodq.user.ApplicationUser;
import io.jsonwebtoken.Claims;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import javax.servlet.ServletException;
import org.springframework.security.core.AuthenticationException;

/**
 *
 * @author David Acosta
 */
// This class is used to authenticate users and return JSON Web Tokens to them.
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    // This is used to process an authentication request.
    private final AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        super();
        this.authenticationManager = authenticationManager;
    }

    // Here, we override the attemptAuthenticatoin method. In this method, we parse and authenticate the credetinals provided in the request
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        ApplicationUser creds = new ApplicationUser();
        try {
            // ObjectMapper enables us to convert the JSON to a Java Object. In otherwords, we get the the ApplicatoinUser class from the request so that we can run the class methods.
            creds = new ObjectMapper().readValue(request.getInputStream(), ApplicationUser.class);
        } catch (IOException ex) {
            // .getInputStream() attempts to retrieve the body of the request, which can produce an Input/Output exception.
            Logger.getLogger(JWTAuthenticationFilter.class.getName()).log(Level.SEVERE, null, ex);
        }
        // Authenticate method attemps to authenticate our object for us, using credentials.
        // The method expects an Authentication implementation. UsernamePasswordAuthenticationToken provides this impelmenetation. It takes in username, password,
        // and a granted authority (or permission). If none, enter an empty ArrayList. Authenticate will trigger either unsuccessful or successfulAuthentication method.
        return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(creds.getUsername(), creds.getPassword(), null));
    }

    // Here, we override what is done upon successful authentication.
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) {
        User user = ((User) authResult.getPrincipal());
        Claims claims = Jwts.claims().setSubject(user.getUsername());
        claims.put("scopes", user.getAuthorities().stream().map(s -> s.toString()).collect(Collectors.toList()));
        String token = Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // Set the expirationt time of the token
                .signWith(SignatureAlgorithm.HS512, SECRET.getBytes()) // Set the signing algorithm and the secret (unqiue to app)
                .compact(); // Compact it (will look like this: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJKb2UifQ.ipevRNuRP6HflG8cFKnmUPtypruRC4fb1DWtoLL62SY;
        response.addHeader(HEADER_STRING, TOKEN_PREFIX + token); // Attach it to the header that we are sending back to the user.
        response.addHeader("access-control-expose-headers", "Authorization"); // Allows client to obtain header from response.
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
    }
    
    

}
