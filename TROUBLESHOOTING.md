# Troubleshooting: "Translation failed" Error

## Quick Fixes

### 1. Check Backend is Running

**In Terminal 1, you should see:**
```
Starting development server at http://127.0.0.1:8000/
```

**If not running:**
```bash
cd backend
python manage.py runserver
```

---

### 2. Check Frontend .env File

Make sure `Hos-frontend/.env` exists with:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

**After creating/updating `.env`, restart frontend:**
1. Stop frontend (Ctrl+C)
2. Run `npm run dev` again

---

### 3. Check OpenAI API Key

Make sure `backend/.env` has:
```env
OPENAI_API_KEY=sk-your-actual-key-here
```

**Test if key works:**
```bash
cd backend
python manage.py shell
```

Then in Python shell:
```python
from api.services import get_openai_client
client = get_openai_client()
print("API key is set!")
```

---

### 4. Check Browser Console

1. Open browser DevTools (F12)
2. Go to "Console" tab
3. Look for error messages
4. Go to "Network" tab
5. Try sending a message
6. Click on the failed request
7. Check the error details

**Common errors:**
- `Failed to fetch` = Backend not running or wrong URL
- `CORS error` = Backend CORS not configured (should be fixed)
- `500 Internal Server Error` = Backend error (check backend terminal)

---

### 5. Test Backend Directly

Test if backend API works:

**Using curl (Command Prompt):**
```cmd
curl -X POST http://localhost:8000/api/messages/send -H "Content-Type: application/json" -d "{\"text\": \"Hello\", \"sender\": \"Doctor\", \"targetLanguage\": \"Spanish\"}"
```

**Or use Postman/Thunder Client:**
- URL: `http://localhost:8000/api/messages/send`
- Method: POST
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "text": "Hello",
  "sender": "Doctor",
  "targetLanguage": "Spanish"
}
```

**Expected response:**
```json
{
  "id": "1",
  "sender": "Doctor",
  "text": "Hello",
  "translatedText": "Hola",
  "timestamp": "09:15 AM",
  "hasAudio": false,
  "audioUrl": null
}
```

---

### 6. Check Backend Terminal for Errors

When you send a message, check the backend terminal. You should see:
```
[XX/XX/XXXX XX:XX:XX] "POST /api/messages/send HTTP/1.1" 201 XXX
```

**If you see errors:**
- `OPENAI_API_KEY not set` = Check `.env` file
- `ValueError` = OpenAI API key issue
- `500` error = Check the full error message in terminal

---

## Step-by-Step Debugging

### Step 1: Verify Backend
```bash
# In browser, visit:
http://localhost:8000/
```
Should show JSON with API info.

### Step 2: Verify Frontend Config
Check `Hos-frontend/.env` exists and has correct URL.

### Step 3: Check Network Request
1. Open browser DevTools (F12)
2. Go to Network tab
3. Send a message
4. Find the request to `/api/messages/send`
5. Check:
   - Status code (should be 201)
   - Response body
   - Error message if failed

### Step 4: Check Backend Logs
Look at backend terminal for error messages.

---

## Common Error Messages

### "Cannot connect to backend"
- **Fix:** Start backend server
- **Check:** `http://localhost:8000/` works

### "OPENAI_API_KEY not set"
- **Fix:** Add key to `backend/.env`
- **Check:** File exists and has correct key

### "Translation failed"
- **Fix:** Check OpenAI API key is valid
- **Check:** Backend terminal for specific error

### "CORS error"
- **Fix:** Should already be configured
- **Check:** `CORS_ALLOWED_ORIGINS` in `settings.py`

---

## Still Not Working?

1. **Restart both servers:**
   - Stop backend (Ctrl+C)
   - Stop frontend (Ctrl+C)
   - Start backend again
   - Start frontend again

2. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R
   - Or clear cache in browser settings

3. **Check ports:**
   - Backend: Port 8000 (check if something else is using it)
   - Frontend: Port 5173 (check if something else is using it)

4. **Verify files:**
   - `backend/.env` exists
   - `Hos-frontend/.env` exists
   - Both have correct values

---

## Quick Test Script

Run this to test everything:

```bash
# Terminal 1: Start backend
cd backend
python manage.py runserver

# Terminal 2: Test API
curl -X POST http://localhost:8000/api/messages/send -H "Content-Type: application/json" -d "{\"text\": \"Test\", \"sender\": \"Doctor\", \"targetLanguage\": \"Spanish\"}"
```

If curl works but frontend doesn't, it's a frontend configuration issue.
If curl doesn't work, it's a backend issue.



