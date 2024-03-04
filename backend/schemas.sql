/* Schema for users table */
CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);

/* Schema for the table that stores a user's saved favorites */
CREATE TABLE user_favorites (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    cocktail_name TEXT NOT NULL
);