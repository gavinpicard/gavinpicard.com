-- Migration: Add lede column to posts table
-- Run this SQL command in your MySQL database to add the lede column
-- Run with: mysql -u root -p blog < add_lede_column.sql

USE blog;

ALTER TABLE posts ADD COLUMN lede VARCHAR(500) AFTER slug;

-- If the column already exists, you can use this instead:
-- ALTER TABLE posts MODIFY COLUMN lede VARCHAR(500);

