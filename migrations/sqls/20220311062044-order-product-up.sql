CREATE TABLE order_product (
    id SERIAL PRIMARY KEY,
    order_id INTEGER references orders(id),
    product_id INTEGER references product(id),
    quantity INTEGER
)