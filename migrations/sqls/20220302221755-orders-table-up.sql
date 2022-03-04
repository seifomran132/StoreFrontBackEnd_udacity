CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id INTEGER references product(id),
    quantity INTEGER,
    user_id INTEGER references users(id),
    status VARCHAR(50)
)