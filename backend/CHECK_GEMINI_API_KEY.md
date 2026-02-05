# Check Your Gemini API Key

## The Problem

The 404 error suggests your API key might be:
1. For a different Google AI service (not Gemini)
2. From the wrong API version
3. Not activated properly

## Solution: Get the Correct API Key

### Option 1: Use Google AI Studio (Recommended)

1. Go to: **https://aistudio.google.com/app/apikey**
2. Sign in with Google account
3. Click **"Create API Key"**
4. Select a Google Cloud project (or create new one)
5. Copy the API key
6. Update `backend/.env`:
   ```env
   GEMINI_API_KEY=your_new_key_here
   ```

### Option 2: Use Google Cloud Console

1. Go to: **https://console.cloud.google.com/**
2. Enable "Generative Language API"
3. Create API credentials
4. Get the API key

## Important Notes

- **Make sure you're using the Gemini API key**, not:
  - Google Translate API key
  - Google Cloud Translation API key
  - Other Google service keys

- **The key should work with `gemini-pro` model**

## Test Your Key

After getting a new key, restart backend and test. The key from Google AI Studio should work with `gemini-pro`.

## Alternative: Switch Back to OpenAI

If Gemini keeps having issues, you can switch back:

In `backend/.env`:
```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-openai-key
```

Then restart backend.



