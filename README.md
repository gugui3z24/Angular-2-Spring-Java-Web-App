# Angular 6/Spring Java Web Application - NoDQ

[Live Demo](https://nodq-3z24.herokuapp.com)

This web application combines Angular 6, a TypeScript-based open-source front-end web application platform, and Spring 5 (Spring Boot w/Maven), a comprehensive programming and configuration model for modern Java-based enterprise applications. NoDQ is a wrestling article managing website, which implements rich-text article creation, user management, and twitter/disqus commenting integration. Some key features include:

- Spring Security (Stateless Authentication, Authorization w/Permissions and Access Control),
- Spring Data JPA (Custom queries and DB Operations using Javax Persistence Entity Manager)
- Java MySQL Connector
- Spring REST
- Java TypeScript Generator that creates all needed classes and interfaces for Angular

## Screenshots
![Screenshot 1](https://i.imgur.com/Rkal4z9.png)
![Screenshot 2](https://i.imgur.com/XOWYrGS.png)
![Screenshot 3](https://i.imgur.com/ZyO6ELI.png)

## Getting Started

To get started, clone the project to your local directory:
```
$ git clone https://github.com/gugui3z24/Angular-2-Spring-Java-Web-App.git
```

### Prerequisites

What you will need:
- Java and Java SDK
- NodeJS and NPM
- Angular CLI
- MySQL Database

### Installing

First, build the project using Apache Maven (or use IDE of choice, such as Netbeans, Eclipse, or Spring Suite Tools).
Next, install all of the Angular dependencies:

```
$ cd root\src\main\resources\dev\
$ npm install
```

## App Configuration
The following configuration is required:
- Create a database named 'nodq' (or change name of default db - see below)
- Database Configuration (See Spring Project Properties file: application.properties)
```
root\src\main\resources\application.properties

spring.jpa.hibernate.ddl-auto=create
spring.datasource.url=jdbc:mysql://localhost:3306/nodq
spring.datasource.username=root
spring.datasource.password=password

# After starting app for first time, change first line to =update. Else, database will be re-created 
# during each deployment. For more info, see:
# https://docs.spring.io/spring-boot/docs/current/reference/html/howto-database-initialization.html
```

## Angular Development Server

From inside of the dev\ folder:
```
$ cd root\src\main\resources\dev\
$ ng serve
```
This will start an instance of the development server at: http://localhost:4200

## Spring Server

Before making any requests to your API, make sure to start the backend server (uses embedded Tomcat) and that MySQL is running.

## Built With

* [Angular 2 - Version 6](https://angular.io) - Frontend framework
* [Maven](https://maven.apache.org/) - Dependency Management
* [Spring Boot](https://spring.io) - Backend Framework

## Authors

* **David Acosta** - [Portfolio](www.acostadavid.com)

## License

MIT License

Copyright (c) 2018 - David Acosta

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
