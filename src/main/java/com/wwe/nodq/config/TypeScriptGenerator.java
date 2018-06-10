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
package com.wwe.nodq.config;

import com.wwe.nodq.article.Article;
import com.wwe.nodq.category.Category;
import com.wwe.nodq.role.Role;
import com.wwe.nodq.user.ApplicationUser;
import cz.habarta.typescript.generator.ClassMapping;
import cz.habarta.typescript.generator.Input;
import cz.habarta.typescript.generator.JsonLibrary;
import cz.habarta.typescript.generator.Output;
import java.io.File;
import cz.habarta.typescript.generator.Settings;
import cz.habarta.typescript.generator.TypeScriptFileType;
import cz.habarta.typescript.generator.TypeScriptOutputKind;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author David Acosta
 */
public class TypeScriptGenerator {

    public static void main(String[] args) {
        File file = new File("");
        String filePath = file.getAbsolutePath();
        file = new File(filePath + "/src/main/resources/dev/src/app/interfaces.ts");
        Settings settings = new Settings();
        settings.outputKind = TypeScriptOutputKind.module;
        settings.outputFileType = TypeScriptFileType.implementationFile;
        settings.jsonLibrary = JsonLibrary.jackson2;
        settings.mapClasses = ClassMapping.asInterfaces;
        settings.noFileComment = true;
        settings.sortDeclarations = true;
        settings.sortTypeDeclarations = true;
        settings.noTslintDisable = true;
        List<String> excludedClasses = new ArrayList<>();
        excludedClasses.add("java.io.Serializable");
        settings.setExcludeFilter(excludedClasses, null);
        cz.habarta.typescript.generator.TypeScriptGenerator tsGen = new cz.habarta.typescript.generator.TypeScriptGenerator(settings);
        tsGen.generateTypeScript(Input.from(Role.class, ApplicationUser.class, Article.class, Category.class), Output.to(file));
    }
}
