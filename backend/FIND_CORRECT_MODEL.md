# Find the Correct Gemini Model

## Quick Test

Since you got the key from Google AI Studio, let's find which model works:

### Step 1: Run the Test Script

```bash
cd backend
python test_gemini_models.py
```

This will:
- ✅ Show all available models for your API key
- ✅ Test which model works
- ✅ Tell you which model name to use

### Step 2: Update the Model Name

If the test shows a different model name, update `backend/api/services.py`:

Find this line (around line 47):
```python
return genai.GenerativeModel('gemini-pro')
```

Change `'gemini-pro'` to the model name that works (from the test output).

### Step 3: Restart Backend

```bash
python manage.py runserver
```

---

## Common Model Names

Based on the test output, you might see:
- `models/gemini-pro`
- `models/gemini-1.5-pro`
- `models/gemini-1.5-flash`
- Or something else

Use the exact name shown in the test output!

---

## If Test Script Doesn't Work

Make sure you have the package installed:
```bash
pip install google-generativeai
```

Then try the test again.



