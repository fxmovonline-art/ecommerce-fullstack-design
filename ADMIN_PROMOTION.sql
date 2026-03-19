-- Admin User Promotion SQL Commands
-- ===================================

-- UPDATE: Promote a user to ADMIN
-- Replace 'your-email@example.com' with the actual email of the user you want to promote
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';

-- VERIFY: Check if the promotion was successful
-- This query will show you the user's updated role
SELECT id, email, role, createdAt FROM "User" WHERE email = 'your-email@example.com';

-- VIEW ALL USERS: See all users and their roles
SELECT id, email, role, createdAt FROM "User" ORDER BY createdAt DESC;

-- DEMOTE: If needed, you can change a user back to USER role
-- UPDATE "User" SET role = 'USER' WHERE email = 'your-email@example.com';

-- FIND BY NAME: Find a user by name if you don't know the email
-- SELECT id, email, name, role FROM "User" WHERE name ILIKE '%search-term%';
