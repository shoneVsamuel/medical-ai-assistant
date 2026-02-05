# How to Run the Full Application

## 🚀 Quick Start - Run Everything Together

### Step 1: Start Django Backend

Open **Terminal/Command Prompt #1**:

```bash
cd backend
python manage.py runserver
```

**Expected output:**
```
Starting development server at http://127.0.0.1:8000/
```

✅ Backend is running at `http://localhost:8000`

---

### Step 2: Start React Frontend

Open **Terminal/Command Prompt #2** (new window):

```bash
cd Hos-frontend
npm run dev
```

**Expected output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

✅ Frontend is running at `http://localhost:5173`

---

### Step 3: Open in Browser

Open your browser and go to:
```
http://localhost:5173
```

---

## ✅ Testing Checklist

### 1. Check Backend is Running
- Visit: `http://localhost:8000/`
- Should see: JSON with API endpoints info

### 2. Check Frontend is Running
- Visit: `http://localhost:5173`
- Should see: Doctor-Patient Translation Chat UI

### 3. Test Send Message
1. Type a message in the chat input
2. Click "Send" button
3. **Expected:** Message appears with translation
4. **Check:** Translation should be in the selected language

### 4. Test Language Switching
1. Change language dropdown (e.g., to Spanish)
2. Send a new message
3. **Expected:** Message translated to Spanish

### 5. Test Role Switching
1. Change role from "Doctor" to "Patient"
2. Send a message
3. **Expected:** Message shows as from "Patient"

### 6. Test Summary Generation
1. Send a few messages (Doctor and Patient)
2. Click "Generate AI Summary" button in side panel
3. **Expected:** Summary appears after a few seconds

### 7. Test Search
1. Type something in the search box (side panel)
2. **Expected:** Messages filter based on search query

---

## 🔧 Troubleshooting

### Frontend can't connect to backend

**Check:**
1. Backend is running on port 8000
2. Frontend has `.env` file with:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```
3. Restart frontend after creating/updating `.env`

### CORS Errors

**Error:** `Access to fetch at 'http://localhost:8000/api/...' from origin 'http://localhost:5173' has been blocked by CORS policy`

**Fix:** Backend already has CORS configured. Make sure:
- Backend is running
- Frontend URL matches `CORS_ALLOWED_ORIGINS` in `backend/translation_assistant/settings.py`

### Translation not working

**Check:**
1. `.env` file in `backend/` has valid `OPENAI_API_KEY`
2. OpenAI API key is correct and has credits
3. Check backend terminal for error messages

### Messages not saving

**Check:**
1. Database migrations ran: `python manage.py migrate`
2. Check backend terminal for errors

---

## 📊 What to Look For

### ✅ Everything Working:
- ✅ Messages send and appear instantly
- ✅ Translations appear below original text
- ✅ Summary generates successfully
- ✅ Search filters messages
- ✅ No errors in browser console (F12)
- ✅ No errors in backend terminal

### ❌ Issues to Watch:
- ❌ Network errors in browser console
- ❌ 500 errors from backend
- ❌ "OPENAI_API_KEY not set" errors
- ❌ CORS errors

---

## 🎯 Quick Test Commands

### Test Backend API Directly:

```bash
# Test send message
curl -X POST http://localhost:8000/api/messages/send \
  -H "Content-Type: application/json" \
  -d "{\"text\": \"Hello\", \"sender\": \"Doctor\", \"targetLanguage\": \"Spanish\"}"
```

### Check Browser Console:
1. Open browser DevTools (F12)
2. Go to "Console" tab
3. Look for errors (red text)
4. Look for network requests in "Network" tab

---

## 📝 Next Steps After Testing

If everything works:
1. ✅ You're ready to use the app!
2. ✅ All features are connected
3. ✅ Backend and frontend are communicating

If something doesn't work:
1. Check the error messages
2. Verify `.env` files are set up correctly
3. Make sure both servers are running
4. Check the troubleshooting section above



