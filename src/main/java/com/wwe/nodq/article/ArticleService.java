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

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author David Acosta
 */
@Service
public class ArticleService {
    
    @Autowired
    private ArticleRepository articleRepository;
    
    public void createArticle(Article article) {
        articleRepository.createArticle(article);
    }
    
    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }
    
    public Article getArticleById(Integer id) {
        return articleRepository.getArticleById(id);
    }
    
    public void updateArticle(Article article) {
        articleRepository.updateArticle(article);
    }
    
    public void deleteArticle(Integer id) {
        articleRepository.deleteArticle(id);
    }
    
    public List<Article> getArticlesByCategory(String category) {
        return articleRepository.getArticlesByCategory(category);
    }
    
}
