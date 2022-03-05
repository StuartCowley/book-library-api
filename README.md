# Book Library API

## About
This Book Library API project is part of the Manchester Codes back-end module. 

It is built using Node, Express, MySQL and Sequelize. 

Mocha, Chai and supertest are used for testing within this project. 

## Installation
- Pull a MySQL image and run the container
- Clone this repo
- Run `npm install`
- Create a .env file and local variables:
DB_PASSWORD
DB_NAME
DB_USER
DB_HOST
DB_PORT
- Run `npm start` to start the project
- Run `npm test` to run the tests

## Models

### Readers

A reader requires a name, email and password.

### Books

A book requires a title, ISBN, GenreId, AuthorId and ReaderId.

### Genre

Requires a genre name.

### Authors

Requires an author name.

# Author of project 
Emily Cotter