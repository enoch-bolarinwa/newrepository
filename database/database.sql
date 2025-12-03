-- database.sql

-- Create classification table
CREATE TABLE classification (
    classification_id SERIAL PRIMARY KEY,
    classification_name VARCHAR(50) UNIQUE NOT NULL
);

-- Create inventory table
CREATE TABLE inventory (
    inv_id SERIAL PRIMARY KEY,
    inv_make VARCHAR(50) NOT NULL,
    inv_model VARCHAR(50) NOT NULL,
    inv_year INT NOT NULL,
    inv_description TEXT,
    inv_image VARCHAR(255),
    inv_thumbnail VARCHAR(255),
    inv_price NUMERIC(10, 2),
    inv_miles INT,
    inv_color VARCHAR(20),
    classification_id INT REFERENCES classification(classification_id)
);

-- Optional: Insert some sample classifications
INSERT INTO classification (classification_name) VALUES ('SUV'), ('Sedan'), ('Truck');

-- Optional: Insert some sample inventory
INSERT INTO inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
VALUES
('Toyota', 'Camry', 2020, 'Reliable sedan', '/images/camry.jpg', '/images/camry-thumb.jpg', 24000, 15000, 'Blue', 2),
('Ford', 'F-150', 2021, 'Powerful truck', '/images/f150.jpg', '/images/f150-thumb.jpg', 35000, 12000, 'Red', 3);
