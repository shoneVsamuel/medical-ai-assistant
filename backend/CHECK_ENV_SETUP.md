# Check Your .env File Setup

## The Error Means

The error "OPENAI_API_KEY not set" means the code is still trying to use OpenAI instead of Gemini.

## Quick Fix

### Step 1: Check Your .env File

Make sure `backend/.env` has these lines **exactly**:

```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_actual_gemini_key_here
```

**Important:**
- No spaces around the `=` sign
- No quotes around the values
- `AI_PROVIDER` must be exactly `gemini` (lowercase)

### Step 2: Verify the File Location

The `.env` file must be in the `backend/` folder (same folder as `manage.py`)

### Step 3: Restart Backend

**After updating .env, you MUST restart the backend:**

1. Stop backend: Press `Ctrl+C` in backend terminal
2. Start again: `python manage.py runserver`

**The .env file is only read when Django starts, so restart is required!**

---

## Example .env File

Your `backend/.env` should look like this:

```env
AI_PROVIDER=gemini
GEMINI_API_KEY=AIzaSy...your_key_here

SECRET_KEY=django-insecure-change-this-in-production
DEBUG=True
```

---

## Still Not Working?

1. **Double-check .env file:**
   - Is `AI_PROVIDER=gemini` (not `AI_PROVIDER = gemini` with spaces)?
   - Is the file in `backend/` folder?
   - Did you save the file?

2. **Restart backend:**
   - Stop it completely (Ctrl+C)
   - Start again

3. **Check backend terminal:**
   - When you start, do you see any errors?
   - Look for messages about loading .env

---

## Quick Test

After restarting, try sending a message. If you still get OpenAI error, the .env isn't being read correctly.



