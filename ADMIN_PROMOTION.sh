#!/bin/bash

# Admin User Promotion Script
# This script helps you promote a user to ADMIN role in the database

# IMPORTANT: Before running this, make sure you have:
# 1. Created a test user account in your eCommerce app
# 2. Have access to your PostgreSQL database
# 3. Know the user's email address

# ============================================
# Option 1: Using Prisma Studio (RECOMMENDED)
# ============================================
#
# Run this command in your project directory:
#   npm run prisma:studio
#
# Then:
# 1. Navigate to the "User" table
# 2. Find your test user by email
# 3. Edit the "role" field and change it from "USER" to "ADMIN"
# 4. Save the changes
#
# That's it! Your user is now an admin.

# ============================================
# Option 2: Using psql (Direct Database Access)
# ============================================
#
# Run this SQL command in your PostgreSQL database:
#
#   UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
#
# Replace 'your-email@example.com' with your actual email address
#
# To verify the change worked:
#
#   SELECT id, email, role FROM "User" WHERE email = 'your-email@example.com';

# ============================================
# Option 3: Run SQL via psql Command Line
# ============================================
#
# First, make sure you're connected to your PostgreSQL database:
#   psql -U postgres -d ecommerce (or your database name)
#
# Then run the UPDATE query above

echo "=========================================="
echo "Admin User Promotion Script"
echo "=========================================="
echo ""
echo "Follow these steps to promote a user to ADMIN:"
echo ""
echo "1. Open Prisma Studio: npm run prisma:studio"
echo ""
echo "2. Or run SQL directly in your database:"
echo "   UPDATE \"User\" SET role = 'ADMIN' WHERE email = 'your-email@example.com';"
echo ""
echo "3. After promotion, log in and visit /admin"
echo ""
