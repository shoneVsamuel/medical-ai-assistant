# Update .env File for Gemini

## Just Update Your Existing .env File

You don't need to create a new file. Just edit `backend/.env` and add/update these lines:

## What to Add/Change

Open `backend/.env` and make sure it has:

```env
# Choose AI provider: 'openai' or 'gemini'
AI_PROVIDER=gemini

# Gemini API Key (your new key)
GEMINI_API_KEY=your_gemini_api_key_here

# OpenAI Key (you can keep it or remove it - doesn't matter)
# OPENAI_API_KEY=sk-...
SECRET_KEY=django-insecure-change-this-in-production
DEBUG=True
```

## Steps

1. Open `backend/.env` in your text editor
2. Add this line at the top: `AI_PROVIDER=gemini`
3. Add your Gemini key: `GEMINI_API_KEY=your_actual_key_here`
4. Save the file
5. Restart backend server (Ctrl+C, then `python manage.py runserver`)

## That's It!

No need to:
- ❌ Create a new .env file
- ❌ Remove the old OpenAI key (you can keep it)
- ❌ Do anything else

Just add those two lines and restart!



