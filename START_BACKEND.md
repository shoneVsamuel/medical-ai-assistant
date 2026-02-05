# How to Start the Backend Server

## Quick Start

### Step 1: Open Terminal/Command Prompt

### Step 2: Navigate to Backend Folder

```bash
cd backend
```

### Step 3: Start the Server

```bash
python manage.py runserver
```

**You should see:**
```
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
Django version 5.0.1, using settings 'translation_assistant.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

**✅ Keep this terminal open!** The server must stay running.

---

## Verify It's Working

### Option 1: Open in Browser
Visit: `http://localhost:8000/`

You should see JSON with API endpoints.

### Option 2: Check Terminal
You should see the "Starting development server" message.

---

## Common Issues

### "python: command not found"
- Try: `python3 manage.py runserver`
- Or: `py manage.py runserver`

### "No module named 'django'"
- Install dependencies: `pip install -r requirements.txt`

### "Port 8000 already in use"
- Another process is using port 8000
- Either stop that process or use a different port:
  ```bash
  python manage.py runserver 8001
  ```
  Then update frontend `.env` to use port 8001

### "ModuleNotFoundError"
- Make sure you're in the `backend` folder
- Run: `pip install -r requirements.txt`

---

## After Starting

1. ✅ Backend terminal shows "Starting development server"
2. ✅ Browser shows JSON at `http://localhost:8000/`
3. ✅ Now start frontend in a NEW terminal window
4. ✅ Frontend should connect successfully



