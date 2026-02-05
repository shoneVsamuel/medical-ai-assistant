# Complete Testing Guide - Run Everything Together

## 🚀 Step-by-Step: Run Full Application

### Terminal 1: Start Django Backend

```bash
cd backend
python manage.py runserver
```

**✅ Success looks like:**
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

**Keep this terminal open!**

---

### Terminal 2: Start React Frontend

```bash
cd Hos-frontend
npm run dev
```

**✅ Success looks like:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Keep this terminal open!**

---

### Step 3: Configure Frontend

Make sure `Hos-frontend/.env` exists with:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

**If you just created/updated `.env`, restart the frontend (Ctrl+C and run `npm run dev` again)**

---

### Step 4: Open Browser

Go to: **http://localhost:5173**

---

## ✅ Testing Checklist

### Test 1: Basic UI Loads
- [ ] Page loads without errors
- [ ] Header shows "Doctor–Patient Translator"
- [ ] Chat interface is visible
- [ ] Side panel is visible (or can be opened)

### Test 2: Send Message with Translation
1. Type a message: "Hello, how are you?"
2. Make sure language is set to "Spanish"
3. Click "Send" button
4. **Expected:**
   - [ ] Message appears in chat
   - [ ] Translation appears below (in Spanish)
   - [ ] No errors in browser console (F12)

### Test 3: Language Switching
1. Change language dropdown to "French"
2. Send a new message: "I have a headache"
3. **Expected:**
   - [ ] Message translated to French
   - [ ] Translation appears correctly

### Test 4: Role Switching
1. Change role from "Doctor" to "Patient"
2. Send a message
3. **Expected:**
   - [ ] Message shows as from "Patient"
   - [ ] Avatar/icon changes

### Test 5: Generate Summary
1. Send 3-4 messages (mix of Doctor and Patient)
2. Click "Generate AI Summary" button in side panel
3. **Expected:**
   - [ ] Button shows "Generating..." with spinner
   - [ ] Summary appears after a few seconds
   - [ ] Summary contains relevant medical information

### Test 6: Search Messages
1. Type something in search box (e.g., "headache")
2. **Expected:**
   - [ ] Messages filter to show only matching ones
   - [ ] Search works in real-time

### Test 7: Check Backend Terminal
- [ ] No error messages in backend terminal
- [ ] See API requests logged (if Django logging is enabled)

### Test 8: Check Browser Console
1. Press F12 to open DevTools
2. Go to "Console" tab
3. **Expected:**
   - [ ] No red error messages
   - [ ] Network requests show 200 status (in Network tab)

---

## 🔍 What to Check

### ✅ Everything Working:
- Messages send instantly
- Translations appear correctly
- Summary generates successfully
- No console errors
- No backend errors

### ❌ Common Issues:

**"Failed to fetch" or Network Error:**
- Backend not running? Check Terminal 1
- Wrong API URL? Check `.env` file
- CORS error? Backend should handle this automatically

**Translation not working:**
- Check OpenAI API key in `backend/.env`
- Check backend terminal for errors
- Verify API key has credits

**Summary not generating:**
- Check OpenAI API key
- Make sure you have messages in chat
- Check backend terminal for errors

---

## 🧪 Quick API Test (Optional)

Test backend directly without frontend:

```bash
# Test send message
curl -X POST http://localhost:8000/api/messages/send ^
  -H "Content-Type: application/json" ^
  -d "{\"text\": \"Hello\", \"sender\": \"Doctor\", \"targetLanguage\": \"Spanish\"}"
```

**Expected:** JSON response with translated message

---

## 📊 Success Indicators

### Backend Terminal:
```
[XX/XX/XXXX XX:XX:XX] "POST /api/messages/send HTTP/1.1" 201 XXX
[XX/XX/XXXX XX:XX:XX] "POST /api/summary/generate HTTP/1.1" 200 XXX
```

### Browser Console:
- No red errors
- Network requests show 200/201 status codes

### Frontend:
- Messages appear instantly
- Translations work
- Summary generates
- Everything feels responsive

---

## 🎯 Final Checklist

Before considering it "working":
- [ ] Backend running on port 8000
- [ ] Frontend running on port 5173
- [ ] Can send messages
- [ ] Translations appear
- [ ] Summary generates
- [ ] Search works
- [ ] No errors in console
- [ ] No errors in backend terminal

---

## 🆘 Still Having Issues?

1. **Check both terminals** - Are both servers running?
2. **Check `.env` files** - Both frontend and backend
3. **Check browser console** - F12 → Console tab
4. **Check network tab** - F12 → Network tab → Look for failed requests
5. **Restart both servers** - Sometimes helps

---

## 🎉 Success!

If all tests pass:
- ✅ Your app is fully functional!
- ✅ Backend and frontend are connected
- ✅ All features are working
- ✅ Ready to use!



