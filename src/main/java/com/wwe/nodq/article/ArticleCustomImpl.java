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
package com.wwe.nodq.article;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

/**
 *
 * @author David Acosta
 */
public class ArticleCustomImpl implements ArticleCustom {

    @PersistenceContext
    private EntityManager em;
    private final String TABLE_NAME = "article";

    @Override
    @Transactional
    public void createArticle(Article article) {
        em.merge(article);
    }

    @Override
    @Transactional
    public void updateArticle(Article article) {
        em.createNativeQuery("UPDATE " + TABLE_NAME + " SET subject = ?, body = ?, category = ?, last_modifier_id = ?, updated_at = ? WHERE id = ?")
                .setParameter(1, article.getSubject())
                .setParameter(2, article.getBody())
                .setParameter(3, article.getCategory())
                .setParameter(4, article.getLastModifier().getId())
                .setParameter(5, Date.valueOf(LocalDate.now()))
                .setParameter(6, article.getId())
                .executeUpdate();
    }

    @Override
    @Transactional
    public void deleteArticle(Integer id) {
        em.createNativeQuery("DELETE FROM " + TABLE_NAME + " WHERE id = ?", Article.class)
                .setParameter(1, id)
                .executeUpdate();
    }

    @Override
    @Transactional
    public Article getArticleById(Integer id) {
        Query query = em.createNativeQuery("SELECT * FROM " + TABLE_NAME + " WHERE id = ?", Article.class);
        query.setParameter(1, id);
        List<Article> articles = query.getResultList();
        if (articles.isEmpty()) {
            return null;
        }
        return articles.get(0);
    }

    @Override
    @Transactional
    public List<Article> getArticlesByCategory(String category) {
        List<Article> articles = em.createNativeQuery("SELECT * FROM " + TABLE_NAME + " WHERE category_id = (SELECT id FROM category WHERE name = ?) ORDER BY id DESC", Article.class)
                .setParameter(1, category)
                .setMaxResults(10)
                .getResultList();
        return articles;
    }

}
