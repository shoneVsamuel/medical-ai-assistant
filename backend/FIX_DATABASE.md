# Fix: "no such table: api_conversation"

## Quick Fix: Run Database Migrations

The database tables haven't been created yet. Run these commands:

### Step 1: Stop the Backend Server
Press `Ctrl+C` in the backend terminal to stop it.

### Step 2: Create Migrations
```bash
cd backend
python manage.py makemigrations
```

**Expected output:**
```
Migrations for 'api':
  api/migrations/0001_initial.py
    - Create model Conversation
    - Create model Message
```

### Step 3: Apply Migrations
```bash
python manage.py migrate
```

**Expected output:**
```
Operations to perform:
  Apply all migrations: admin, api, auth, contenttypes, sessions
Running migrations:
  Applying api.0001_initial... OK
  ...
```

### Step 4: Start Server Again
```bash
python manage.py runserver
```

---

## Complete Commands (Copy & Paste)

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

---

## Verify It Worked

After running migrations, you should see:
- ✅ `db.sqlite3` file created in `backend/` folder
- ✅ No more "no such table" errors
- ✅ Messages can be sent successfully

---

## If You Get Errors

### "No changes detected"
- Make sure you're in the `backend` folder
- Check that `api/models.py` exists

### "ModuleNotFoundError"
- Run: `pip install -r requirements.txt`

### "python: command not found"
- Try: `python3` or `py` instead of `python`



