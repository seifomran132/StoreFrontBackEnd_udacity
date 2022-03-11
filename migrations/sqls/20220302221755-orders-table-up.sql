CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER references users(id),
    status VARCHAR(50)
)