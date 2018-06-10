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

import com.wwe.nodq.security.AccessControlManager;
import com.wwe.nodq.user.ApplicationUser;
import com.wwe.nodq.user.ApplicationUserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author David Acosta
 */
@RestController
public class ArticleController {

    @Autowired
    private ArticleService articleService;
    @Autowired
    private ApplicationUserService applicationUserService;

    @Autowired
    private AccessControlManager accessControlManager;

    @RequestMapping(method = RequestMethod.POST, value = "/api/article")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MODERATOR')")
    public void createArticle(@RequestBody Article article) {
        ApplicationUser editUser = applicationUserService.getUserByUsername(accessControlManager.getUsername());
        article.setCreator(editUser);
        article.setLastModifier(editUser);
        articleService.createArticle(article);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/api/article")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MODERATOR')")
    public void updateArticle(@RequestBody Article article) {
        ApplicationUser editUser = applicationUserService.getUserByUsername(accessControlManager.getUsername());
        article.setLastModifier(editUser);
        articleService.updateArticle(article);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/api/article/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteArticle(@PathVariable Integer id) {
        articleService.deleteArticle(id);
    }

    @RequestMapping(value = "/public/article")
    public List<Article> getAllArticles() {
        return articleService.getAllArticles();
    }

    @RequestMapping(value = "/public/article/{id}")
    public Article getArticleById(@PathVariable Integer id) {
        return articleService.getArticleById(id);
    }

    @RequestMapping(value = "/public/article/category")
    public List<Article> getArticlesByCategory(@RequestParam String category) {
        return articleService.getArticlesByCategory(category);
    }

}
