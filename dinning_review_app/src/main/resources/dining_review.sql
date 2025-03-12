/* track of the sql */

/* create database */
CREATE DATABASE IF NOT EXISTS dining_review;
USE dining_review;

/* create tables */

CREATE TABLE restaurant (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    cuisine_type VARCHAR(100),
    average_rating DECIMAL(2,1) DEFAULT 0.0
);
CREATE TABLE user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN') DEFAULT 'USER'
);
CREATE TABLE dining_review (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    rating DECIMAL(2,1) CHECK (rating BETWEEN 0 AND 5),
    review_text TEXT,
    status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);
CREATE TABLE admin_review_action (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    review_id BIGINT NOT NULL,
    admin_id BIGINT NOT NULL,
    action ENUM('APPROVE', 'REJECT') NOT NULL,
    reason TEXT,
    action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (review_id) REFERENCES dining_review(id),
    FOREIGN KEY (admin_id) REFERENCES user(id)
);

/* insert data */

INSERT INTO restaurant (name, location, cuisine_type, average_rating) VALUES
('The Golden Fork', 'New York, NY', 'American', 4.5),
('Sushi Haven', 'Los Angeles, CA', 'Japanese', 4.2),
('La Piazza', 'Chicago, IL', 'Italian', 4.7),
('Spice Kingdom', 'Houston, TX', 'Indian', 4.0),
('Le Petit Bistro', 'San Francisco, CA', 'French', 4.8);

INSERT INTO user (username, email, password, role) VALUES
('john_doe', 'john.doe@example.com', 'password123', 'USER'),
('jane_smith', 'jane.smith@example.com', 'securepass', 'USER'),
('alice_w', 'alice.w@example.com', 'alicepass', 'USER'),
('admin1', 'admin1@example.com', 'adminpass1', 'ADMIN'),
('admin2', 'admin2@example.com', 'adminpass2', 'ADMIN');

INSERT INTO dining_review (restaurant_id, user_id, rating, review_text, status) VALUES
(1, 1, 4.5, 'Great food and excellent service!', 'APPROVED'),
(2, 2, 4.0, 'The sushi was fresh and delicious.', 'PENDING'),
(3, 3, 5.0, 'Best Italian food I’ve ever had!', 'APPROVED'),
(4, 1, 3.5, 'Good flavors but a bit too spicy for me.', 'REJECTED'),
(5, 2, 4.8, 'A perfect French dining experience.', 'PENDING');

INSERT INTO admin_review_action (review_id, admin_id, action, reason) VALUES
(1, 4, 'APPROVE', 'Review meets all guidelines.'),
(4, 5, 'REJECT', 'Review contains subjective complaints about spice levels.'),
(3, 4, 'APPROVE', 'Positive review with no issues.');
