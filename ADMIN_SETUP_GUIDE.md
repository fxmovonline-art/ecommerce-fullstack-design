# Admin Panel Implementation - Migration Guide

## Step 1: Update Your Database Schema

The schema has been updated to add a `role` field to the User model. Now you need to run the Prisma migration.

### Run the Migration

```bash
# Navigate to your project directory and run:
npx prisma migrate dev --name add_role_to_user
```

This command will:
1. Create a new migration file in `prisma/migrations/`
2. Apply the changes to your database
3. Regenerate the Prisma Client

### Regenerate Prisma Client (if needed)

```bash
npx prisma generate
```

## Step 2: Promote Your Test User to ADMIN

Now that the schema is updated, you need to promote your test user to ADMIN role so you can access the admin dashboard.

### Option A: Using Prisma Studio (Easiest)

```bash
npm run prisma:studio
```

Then:
1. Click on "User" table
2. Find your test user by email
3. Click on the user row to edit
4. Change the `role` field from "USER" to "ADMIN"
5. Click the checkmark to save

### Option B: Using SQL directly in psql

If you have access to your PostgreSQL database command line:

```bash
psql -U postgres -d your_database_name
```

Then run:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-test-email@example.com';
```

Replace `your-test-email@example.com` with your actual test user email.

To verify:

```sql
SELECT id, email, role FROM "User" WHERE email = 'your-test-email@example.com';
```

### Option C: Run the provided SQL script

See `ADMIN_PROMOTION.sql` for ready-to-use SQL commands.

## Step 3: Access the Admin Dashboard

1. Start your development server: `npm run dev`
2. Log in with your test user account
3. Navigate to `http://localhost:3000/admin`
4. You should now see the Product Management Dashboard

## Step 4: Test the Features

The admin dashboard includes:

- **Add Product Form**: Fill in the form to create new products
- **Product Table**: View all products with their details
- **Edit Button**: Click to modify existing products
- **Delete Button**: Click to remove products
- **Toast Notifications**: Success/error messages for all operations

## What Was Implemented

### Database Schema
- Added `role` field to User model (default: "USER")
- Existing users will have role = "USER"

### API Endpoints
- `POST /api/products` - Create new product (ADMIN only)
- `PUT /api/products/[id]` - Update product (ADMIN only)
- `DELETE /api/products/[id]` - Delete product (ADMIN only)
- `GET /api/auth/user` - Get current user info (for auth check)

### Admin Page (`/admin`)
- Protected route with automatic redirect to /login if not ADMIN
- Product management form (add/edit)
- Product listing table with edit/delete actions
- Real-time feedback with toast notifications

### Security
- All CRUD operations check if user.role === "ADMIN"
- Unauthorized requests return 403 error
- Session-based authentication

## Troubleshooting

### Migration failed?
- Make sure your DATABASE_URL is correct in `.env.local`
- Check PostgreSQL is running
- Try: `npx prisma migrate reset` (warning: this will clear all data)

### Can't access /admin?
- Make sure you promoted the user to ADMIN
- Log out and log back in to refresh the session
- Check browser console for error messages

### Products not showing?
- Make sure you have products in your database
- Check the network tab in browser DevTools
- Verify API endpoints are responding correctly

## Next Steps

- Customize the dashboard styling to match your brand
- Add more product fields (brand, dimensions, images, etc.)
- Add user management features
- Implement order management
- Add analytics/reporting
