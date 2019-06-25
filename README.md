 
# Messenger server

The server side of the private messenger app for Thinkful Capstone

## Tools

- Node.js
- PostgreSQL

## Purpose

The server will hold endpoints to the database related to the private messenger app.
The client side can use these endpoints to receive necessary information.

## Endpoints

### User endpoints

endpoints regarding individual users

#### GET /users

- Parameters: none
- Returns array of all users and their respective information

#### GET /users/:user

- Parameters: user param in url
- Returns user information

#### GET /search/:query

- Parameters: query param in url
- Returns array of users whose name contains the query (case insensitive)

#### POST /users

- Inserts new user into table
- Parameters: name (varchar), password (varchar)
- Returns success if it created a new user