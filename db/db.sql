CREATE TABLE image_store (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_name VARCHAR(255) NOT NULL,
    image_data LONGBLOB NOT NULL
);
