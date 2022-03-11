# Storefront backend project UDACITY

Back end API built in NODEJS to provide a RESTful API for front end usage

## Installation

To install all packages run `npm install` or `yarn`

Used Packages

- bcrypt
- body-parser
- db-migrate
- db-migrate-pg
- dotenv
- express
- jsonwebtoken
- pg
- typescript
- yarn

DEV Packages

- Types for all required packages
- eslint
- eslint-config-prettier
- eslint-plugin-prettier
- prettier
- jasmine
- jasmine-spec-reporter
- jasmine-ts
- supertest
- ts-node
- tsc-watch

## Create Database

We need to create dev and test databases

- `CREATE DATABASE store_dev`
- `CREATE DATABASE store_test`

All database tables and columns in [REQUIREMENTS.md](REQUIREMENTS.md) file

## Scripts

to run the server use `npm run watch` or `yarn watch`
to run the testing suites use `npm run fulltest` or `yarn fulltest`
to run migeration up use `npm run mgup` or `yarn mgup`
to run migeration down use `npm run mgdown` or `yarn mgdown`
to run prettier use `npm run prettier` or `yarn prettier`
to run eslint use `npm run lint` or `yarn lint`

## Migerations

All migerations up and down files are in migeration folder

### migerations for:-

- users table
- product table
- orders table

## Expamples and how to use

### Product

#### Index

To index all products you go to this link `http://localhost:3000/product/index` with `GET` method, no body argeuments required and this will return all users in the database

#### Show

To show a specific product you should go to this link `http://localhost:3000/product/show/:id` with `GET` method and you need to add the product id in the body of request like that
{
"id":1
}

and this will return the product json like that
{
"id": 1,
"name": "ppp",
"price": 500,
"category": "cat"
}

#### Create

To create new product you should go to this link `http://localhost:3000/product/create` with `POST` method and you will need to add the product details in the request body like this
{
"name": "My Product",
"price": 100,
"category": "My Category"
}
and don't forget to add the authonetication token
and this will return the created product like that
{
"id": 2,
"name": "My Product",
"price": 100,
"category": "My Category"
}

#### Get by Category

To get product by category you should go to this link `http://localhost:3000/product/index/category` with `GET` method and add the category in the request body like that
{
"category": "My Category"
}
and this will return the products in this category like that
[
{
"id": 2,
"name": "My Product",
"price": 100,
"category": "My Category"
}
]

#### Delete

To delete product you should go to this link `http://localhost:3000/product/delete/:id` with `DELETE` method and you should add the id in the body of the request like that
{
"id": 2
}
and this will return the deleted product with delete message like that
{
"message": "product deleted",
"userDetails": {
"id": 2,
"name": "My Product",
"price": 100,
"category": "My Category"
}
}

### Users

#### Create

To create a new user you should go to this link `http://localhost:3000/user/create` with `POST` with the user details in the body of the request like this
{
"firstname": "Seif",
"lastname": "Omran",
"password": "123456"
}
and this will return a json consists of `user` key which is for the user details and `token` key for the user token like this
{
"user": {
"id": 5,
"firstname": "Seif",
"lastname": "Omran",
"password": "$2b$10$lH3IkPmopyHsMolM9wR7jetj22tubqme/MIH5ZwbDzK6aj4ITD5Rm"
},
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZmlyc3RuYW1lIjoiU2VpZiIsImxhc3RuYW1lIjoiT21yYW4iLCJwYXNzd29yZCI6IiQyYiQxMCRsSDNJa1Btb3B5SHNNb2xNOXdSN2pldGoyMnR1YnFtZS9NSUg1WndiRHpLNmFqNElURDVSbSIsImlhdCI6MTY0Njg4MzY2Mn0.6bpFHBi4vM58l6ceHVfWqm_I3mPnN1z44KMQj9zsOzI"
}

#### Show

To show a specific user from the database you should go to this link `http://localhost:3000/user/show/:id` with `GET` method and with the user id in the body of the request like this

{
"id":1
}

and this will return the specific user like this
{
"id": 1,
"firstname": "seif",
"lastname": "omran",
"password": "$2b$10$bfz5c7XMyzD/oPSWCkQ5due1EkH1ApTGHdN5EbXokYe8dVcZxU9qO"
}

#### Index

To index all users you should go to this link `http://localhost:3000/user/index` with `GET` method and dont forget to add the authonetication token in the request

#### Delete

To delete user you should go to this link `http://localhost:3000/user/delete/:id` with `DELETE` method and you need to add the id in the request body like that
{
"id": 2
}

### Orders

#### Get orders by user

To get order by user you should go to this link `http://localhost:3000/orders/:id` with `GET` method and you should add the user id in the request body like this

{
"user_id": 1
}

#### Get completed orders

To get completed orders by user you should go to this link `http://localhost:3000/orders/:id` with `GET` method and you should add the user id and status in the request body like this

{
"user_id": 1,
"status":"completed"
}

And don't forget to add the authonetication token

#### Delete Order

To delete order you should follow this link `http://localhost:3000/orders/delete/:id` and add the order id to the request body like this
{
"id":2
}

And don't forget to add the authonetication token
