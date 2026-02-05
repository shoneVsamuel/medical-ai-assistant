# How to Switch to Google Gemini

## Quick Setup

### Step 1: Install Dependencies

```bash
cd backend
pip install google-generativeai
```

Or reinstall all requirements:
```bash
pip install -r requirements.txt
```

### Step 2: Get Gemini API Key

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key

### Step 3: Update .env File

Edit `backend/.env` and add:

```env
# Choose AI provider: 'openai' or 'gemini'
AI_PROVIDER=gemini

# Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# You can keep OpenAI key or remove it
# OPENAI_API_KEY=sk-...
```

### Step 4: Restart Backend

```bash
# Stop backend (Ctrl+C)
# Then start again:
python manage.py runserver
```

---

## Benefits of Gemini

- ✅ **Free tier available** - More generous free usage
- ✅ **Good translation quality** - Excellent for multilingual support
- ✅ **Fast responses** - Quick API response times
- ✅ **No credit card required** - For free tier

---

## Switch Back to OpenAI

Just change in `.env`:
```env
AI_PROVIDER=openai
```

And make sure `OPENAI_API_KEY` is set.

---

## Test It

After switching, try sending a message. It should work with Gemini now!

---

## Troubleshooting

### "GEMINI_API_KEY not set"
- Make sure you added the key to `backend/.env`
- Check the key is correct (no extra spaces)

### "Gemini API key is invalid"
- Get a new key from https://makersuite.google.com/app/apikey
- Make sure the key is complete

### Still getting OpenAI errors
- Make sure `AI_PROVIDER=gemini` in `.env`
- Restart the backend server



