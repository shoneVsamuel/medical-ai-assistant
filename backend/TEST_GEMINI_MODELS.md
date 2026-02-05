# Test Available Gemini Models

## The Issue

Different Gemini API keys have access to different models. Let's find which one works for you.

## Quick Fix - Try Different Models

I've updated the code to try multiple model names automatically. But if it still doesn't work, we can test manually.

## Manual Test

Run this in Python to see available models:

```bash
cd backend
python manage.py shell
```

Then in Python shell:
```python
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=api_key)

# List available models
for model in genai.list_models():
    if 'generateContent' in model.supported_generation_methods:
        print(f"Model: {model.name}")
```

This will show you which models are available for your API key.

## Common Model Names

Try these in order:
1. `gemini-pro` - Most common, older version
2. `gemini-1.5-pro` - Newer, more capable
3. `gemini-1.5-flash` - Fast, newer

## Update Code Manually

If you find which model works, update `backend/api/services.py` line ~47:

Change:
```python
return genai.GenerativeModel('gemini-pro')
```

To the model name that works for you.



