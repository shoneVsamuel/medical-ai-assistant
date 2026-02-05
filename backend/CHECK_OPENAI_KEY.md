# Check OpenAI API Key

## The Issue

If you're seeing "Translation failed" or "Summary generation failed" errors, it's likely because:

1. **OpenAI API key is missing** in `backend/.env`
2. **OpenAI API key is invalid**
3. **OpenAI API key has no credits/quota**

## How to Fix

### Step 1: Check Your .env File

Make sure `backend/.env` exists and has:

```env
OPENAI_API_KEY=sk-your-actual-key-here
```

**Important:** 
- The key should start with `sk-`
- No quotes around the key
- No spaces

### Step 2: Get Your OpenAI API Key

1. Go to: https://platform.openai.com/api-keys
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (you'll only see it once!)
5. Paste it in `backend/.env`

### Step 3: Verify the Key Works

Test in Python:

```bash
cd backend
python manage.py shell
```

Then in Python shell:
```python
from api.services import get_openai_client
client = get_openai_client()
print("✅ API key is valid!")
```

If you get an error, the key is invalid.

### Step 4: Check Your OpenAI Account

- Make sure you have credits/quota
- Check billing: https://platform.openai.com/account/billing
- Free tier has limited usage

### Step 5: Restart Backend

After updating `.env`:
1. Stop backend (Ctrl+C)
2. Start again: `python manage.py runserver`

---

## Common Errors

### "OPENAI_API_KEY not set"
- **Fix:** Add key to `backend/.env`
- **Check:** File exists and has correct format

### "OpenAI API key is invalid"
- **Fix:** Get a new key from OpenAI
- **Check:** Key starts with `sk-` and is complete

### "insufficient_quota"
- **Fix:** Add credits to your OpenAI account
- **Check:** https://platform.openai.com/account/billing

### "rate limit exceeded"
- **Fix:** Wait a few minutes and try again
- **Check:** You may be making too many requests

---

## Quick Test

After setting up your key, test the API:

```bash
curl -X POST http://localhost:8000/api/messages/send \
  -H "Content-Type: application/json" \
  -d "{\"text\": \"Hello\", \"sender\": \"Doctor\", \"targetLanguage\": \"Spanish\"}"
```

If it works, you'll get a translated message back!



