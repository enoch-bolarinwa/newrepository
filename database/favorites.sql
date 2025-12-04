CREATE TABLE favorites (
  favorite_id SERIAL PRIMARY KEY,
  account_id INT REFERENCES account(account_id) ON DELETE CASCADE,
  inv_id INT REFERENCES inventory(inv_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (account_id, inv_id)
);
