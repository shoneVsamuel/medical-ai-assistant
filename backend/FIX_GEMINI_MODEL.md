# Fixed: Gemini Model Name Error

## The Problem

The error "404 models/gemini-pro is not found" means the model name is outdated.

## The Fix

I've updated the code to use `gemini-1.5-flash` instead of `gemini-pro`.

## What Changed

- **Old model:** `gemini-pro` (deprecated)
- **New model:** `gemini-1.5-flash` (current, faster, free tier friendly)

## Next Steps

1. **Restart your backend:**
   ```bash
   # Stop backend (Ctrl+C)
   # Start again:
   python manage.py runserver
   ```

2. **Test it:**
   - Send a message
   - It should work now!

## Alternative Models

If you want to use a different Gemini model, you can change it in `backend/api/services.py`:

- `gemini-1.5-flash` - Fast, free tier friendly (current)
- `gemini-1.5-pro` - More capable, slower
- `gemini-pro` - Older version (may not work)

The code is now updated and should work after restarting!



