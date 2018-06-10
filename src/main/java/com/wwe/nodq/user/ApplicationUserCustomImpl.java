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
package com.wwe.nodq.user;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 *
 * @author David Acosta
 */
public class ApplicationUserCustomImpl implements ApplicationUserCustom {

    @PersistenceContext
    private EntityManager em;
    private final String TABLE_NAME = "application_user";

    @Override
    @Transactional
    public void register(ApplicationUser user) {
        List<ApplicationUser> users = em.createNativeQuery("SELECT * FROM " + TABLE_NAME + " WHERE LOWER(username) = ?", ApplicationUser.class)
                .setParameter(1, user.getUsername().toLowerCase())
                .getResultList();
        if (users == null || users.isEmpty()) {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String password = user.getPassword();
            user.setPassword(encoder.encode(password));
            em.merge(user);
        }
    }

    @Override
    @Transactional
    public ApplicationUser getUserById(Integer id) {
        List<ApplicationUser> users = em.createNativeQuery("SELECT * FROM " + TABLE_NAME + " WHERE id = ?", ApplicationUser.class)
                .setParameter(1, id)
                .getResultList();
        if (users.isEmpty()) {
            return null;
        }
        users.get(0).setPassword(null);
        return users.get(0);
    }

    @Override
    @Transactional
    public void updateUser(ApplicationUser user) {
        em.createNativeQuery("UPDATE " + TABLE_NAME + " SET first = ?, last = ?, role = ? WHERE id = ?", ApplicationUser.class)
                .setParameter(1, user.getFirst())
                .setParameter(2, user.getLast())
                .setParameter(3, user.getRole())
                .setParameter(4, user.getId())
                .executeUpdate();
    }

    @Override
    @Transactional
    public void deleteUserById(Integer id) {
        em.createNativeQuery("DELETE FROM " + TABLE_NAME + " WHERE id = ?", ApplicationUser.class)
                .setParameter(1, id)
                .executeUpdate();
    }

}
