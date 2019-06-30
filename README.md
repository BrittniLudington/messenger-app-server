 
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

### Message endpoints

endpoints regarding messages

#### POST /sending

- Inserts new message into table
- Parameters: to (id), from (id), header (varchar), subject (varchar)
- Returns success if it created a new message

#### GET /sending

- Parameters: none
- Returns array of all messages
- For TESTING ONLY

#### GET /messages

- Parameters: id from body
- Returns array of messages sent to that user id

#### PUT /sending

- Updates the status of read for the receiver
- Parameters: id in params in URL
- Returns success if update successful