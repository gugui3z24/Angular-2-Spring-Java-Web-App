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

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import io.jsonwebtoken.Jwts;

import org.springframework.security.core.context.SecurityContextHolder;

import static com.wwe.nodq.security.SecurityConstants.HEADER_STRING;
import static com.wwe.nodq.security.SecurityConstants.SECRET;
import static com.wwe.nodq.security.SecurityConstants.TOKEN_PREFIX;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.SignatureException;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

/**
 *
 * @author David Acosta
 */
// This class is used to validate requests that contain JSON Web tokens. 
// In other words, we intercept the request, decode the token, and ensure it is valid.
// The BasicAuthenticationFilter is Spring Security's class for handling HTTP request basic authorization headers. 
// We extend and do our own handling of headers.
public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    public JWTAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    // The doFilterInternal method is used to store a request attribute from a request.
    // Spring Security uses filters to intercept and process requests and responses. 
    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws IOException, ServletException {
        String header = req.getHeader(HEADER_STRING); // Used to get the Authorization Header sent from the front-end.

        // Check if the header is null or doesn't start with 'Bearer' prefix.
        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
//            chain.doFilter(req, res); // Used to call the the next filter using the request and response.
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // At this point, we know we have a token. getAuthentication will validate the token.
        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);
        SecurityContextHolder.getContext().setAuthentication(authentication); // Set the security context. In other words, we attempt to authenticate the user.
        chain.doFilter(req, res); // Used to call the the next filter using the request and response.
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING); // Get token from header.
        // Check if it is null.
        if (token != null) {
            // Verify a valid token issued by application.
            try {
                Jws<Claims> decodedToken = Jwts.parser()
                        .setSigningKey(SECRET.getBytes()) // Check if secret matches.
                        .parseClaimsJws(token.replace(TOKEN_PREFIX, "")); // Remove prefix
                List<String> scopes = Jwts.parser()
                        .setSigningKey(SECRET.getBytes())
                        .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                        .getBody()
                        .get("scopes", List.class);
                String user = decodedToken.getBody().getSubject();
                List<GrantedAuthority> authorities = scopes.stream()
                        .map(authority -> new SimpleGrantedAuthority(authority))
                        .collect(Collectors.toList());
                if (user != null) {
                    // As before, we create the AuthenticationToken and then use it in doFilterInternal, to determine whether or not valid credentials.
                    UsernamePasswordAuthenticationToken userToken = new UsernamePasswordAuthenticationToken(user, null, authorities);
                    return userToken;
                } else {
                    return null; // Return null.
                }
            } catch (SignatureException ex) {
                return null;
            }
        } else {
            return null; // Return null if no valid token found.
        }               
    }
}
