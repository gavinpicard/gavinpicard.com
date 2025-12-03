-- Migration: Add tags column to posts table
-- Run this SQL command in your MySQL database to add the tags column

USE blog;

ALTER TABLE posts ADD COLUMN tags JSON;

-- If the column already exists, you can use this instead:
-- ALTER TABLE posts MODIFY COLUMN tags JSON;

