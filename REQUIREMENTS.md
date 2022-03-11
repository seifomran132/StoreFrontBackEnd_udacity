# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
  Index products route : '/product/index' [GET]
- Show (args: product id)
  Show product route : '/product/show/:id' [GET]
- Create (args: product) [token required]
  Create product route : '/product/create/' [POST] [TOKEN REQUIRED]

- [OPTIONAL] Products by category (args: product category)
  get product by category route : '/product/index/category' [GET]

- [ADDED] Delete Product (args: product id)
  get product by category route : '/product/delete/:id' [DELETE]


#### Users

- Index [token required]
  Index users route : '/user/index' [GET]

- Show (args: product id) [token required]
  Show user route : '/user/show/:id' [GET]

- Create (args: user)
  Create user route : '/user/create' [POST]

- Delete (args: user id) [token required]
  Delete users route : '/user/delete/:id' [GET]



#### Orders

- Current Order by user (args: user id)[token required]
  Get Order route : '/orders/:id' [GET]

- [OPTIONAL] Completed Orders by user (args: user id, status)[token required]
  Get Order route : '/orders/:id' [GET]

- [ADDED] Delete Order (args: order id)[token required]
  Get Order route : '/orders/delete/:id' [GET]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### Schema

CREATE TABLE product (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
price INTEGER NOT NULL,
category VARCHAR(50)
)

#### User

- id
- firstName
- lastName
- password

#### Schema

CREATE TABLE users (
id SERIAL PRIMARY KEY,
firstname VARCHAR(50) NOT NULL,
lastname VARCHAR(50) NOT NULL,
password VARCHAR(100) NOT NULL
)

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

#### Schema

CREATE TABLE orders (
id SERIAL PRIMARY KEY,
product_id INTEGER references product(id),
quantity INTEGER,
user_id INTEGER references users(id),
status VARCHAR(50)
)
