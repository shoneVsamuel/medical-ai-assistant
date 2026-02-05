# Quick Setup Guide

## Step 1: Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

Or use a virtual environment (recommended):

```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

## Step 2: Create .env File

Create a `.env` file in the `backend/` directory:

**On Windows:**
- Option 1: Use Command Prompt:
  ```cmd
  cd backend
  echo. > .env
  ```
  Then open `.env` in a text editor and add the content below.

- Option 2: Use PowerShell:
  ```powershell
  cd backend
  New-Item -Path .env -ItemType File
  ```
  Then open `.env` in a text editor and add the content below.

- Option 3: Create it manually:
  1. In your code editor, create a new file
  2. Save it as `.env` (make sure it starts with a dot)
  3. Make sure it's in the `backend/` folder

**File content:**
```env
OPENAI_API_KEY=sk-your-openai-api-key-here
SECRET_KEY=django-insecure-change-this-in-production
DEBUG=True
```

**Get OpenAI API Key:**
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy and paste it into `.env`

## Step 3: Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

This creates the SQLite database and tables.

## Step 4: Create Media Directory

```bash
mkdir media
mkdir media\audio
```

Or on Mac/Linux:
```bash
mkdir -p media/audio
```

## Step 5: Start the Server

```bash
python manage.py runserver
```

The API will be available at: `http://localhost:8000/api/`

## Step 6: Test the API

You can test with curl or Postman:

```bash
# Test send message
curl -X POST http://localhost:8000/api/messages/send \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello", "sender": "Doctor", "targetLanguage": "Spanish"}'
```

## Troubleshooting

### "OPENAI_API_KEY not set"
- Make sure `.env` file exists in `backend/` directory
- Check that the file has `OPENAI_API_KEY=your_key_here`
- Restart the Django server after creating/updating `.env`

### "ModuleNotFoundError: No module named 'openai'"
- Run `pip install -r requirements.txt`
- Make sure you're in the virtual environment if using one

### CORS errors from frontend
- Make sure Django server is running on port 8000
- Check `CORS_ALLOWED_ORIGINS` in `settings.py` includes your frontend URL

