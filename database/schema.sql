CREATE TABLE public.classification (
  classification_id SERIAL PRIMARY KEY,
  classification_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE public.inventory (
  inv_id SERIAL PRIMARY KEY,
  inv_make VARCHAR(50) NOT NULL,
  inv_model VARCHAR(50) NOT NULL,
  inv_year INTEGER NOT NULL,
  inv_description TEXT NOT NULL,
  inv_image VARCHAR(255) NOT NULL,
  inv_thumbnail VARCHAR(255) NOT NULL,
  inv_price NUMERIC(10,2) NOT NULL,
  inv_miles INTEGER NOT NULL,
  inv_color VARCHAR(50) NOT NULL,
  classification_id INTEGER NOT NULL REFERENCES classification(classification_id)
);
