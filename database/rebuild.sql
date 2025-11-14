CREATE TYPE account_type AS ENUM ('Client', 'Admin');
CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    account_firstname VARCHAR NOT NULL,
    account_lastname VARCHAR NOT NULL,
    account_email VARCHAR NOT NULL UNIQUE,
    account_password VARCHAR NOT NULL,
    account_type account_type DEFAULT 'Client'
);

CREATE TABLE classification (
    classification_id SERIAL PRIMARY KEY,
    classification_name VARCHAR(20) NOT NULL
);

CREATE TABLE inventory (
    inv_id SERIAL PRIMARY KEY,
    inv_make VARCHAR(50),
    inv_model VARCHAR(50),
    inv_year INT,
    inv_description TEXT,
    inv_image TEXT,
    inv_thumbnail TEXT,
    inv_price NUMERIC,
    inv_miles INT,
    classification_id INT REFERENCES classification(classification_id)
);
INSERT INTO classification (classification_name)
VALUES 
('SUV'),
('Truck'),
('Sedan'),
('Sport'),
('Custom');
INSERT INTO account (
    account_firstname,
    account_lastname,
    account_email,
    account_password,
    account_type
)
VALUES 
('Admin', 'User', 'admin@byui.edu', 'password123', 'Admin'),
('Test', 'User', 'test@byui.edu', 'testpassword', 'Client');
INSERT INTO inventory (
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_year,
    classification_id
)

VALUES
('GM', 'Hummer', 'Huge interior with small interiors and powerful performance.', '/images/gm-hummer.jpg', '/images/gm-hummer-tn.jpg', 50000, 25000, 2018, 1),
('Jeep', 'Wrangler', 'Off-road capability with removable doors.', '/images/jeep-wrangler.jpg', '/images/jeep-wrangler-tn.jpg', 38000, 15000, 2019, 1),

('Ford', 'F150', 'Top selling truck with strong towing.', '/images/ford-f150.jpg', '/images/ford-f150-tn.jpg', 42000, 30000, 2020, 2),
('Chevrolet', 'Silverado', 'Reliable truck with great hauling.', '/images/chevy-silverado.jpg', '/images/chevy-silverado-tn.jpg', 45000, 20000, 2021, 2),

('Honda', 'Accord', 'Smooth sedan with great fuel efficiency.', '/images/honda-accord.jpg', '/images/honda-accord-tn.jpg', 30000, 10000, 2022, 3),
('Toyota', 'Camry', 'Comfortable sedan with advanced safety.', '/images/toyota-camry.jpg', '/images/toyota-camry-tn.jpg', 32000, 18000, 2020, 3),

('Porsche', '911', 'High-performance sport coupe.', '/images/porsche-911.jpg', '/images/porsche-911-tn.jpg', 120000, 5000, 2022, 4),
('Corvette', 'Stingray', 'Fast American sports car.', '/images/corvette-stingray.jpg', '/images/corvette-stingray-tn.jpg', 95000, 7000, 2021, 4),

('Dodge', 'Challenger', 'Customized muscle car.', '/images/dodge-challenger.jpg', '/images/dodge-challenger-tn.jpg', 60000, 12000, 2020, 5),
('Ford', 'Mustang', 'Iconic muscle car with custom trim.', '/images/ford-mustang.jpg', '/images/ford-mustang-tn.jpg', 58000, 9000, 2021, 5);

UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';
UPDATE inventory
SET 
    inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
