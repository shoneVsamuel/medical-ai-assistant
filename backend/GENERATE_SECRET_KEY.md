# How to Get Django SECRET_KEY

## For Development (MVP) - Quick Option

You can use this simple key for development:

```env
SECRET_KEY=django-insecure-change-this-in-production
```

This is fine for local development and testing.

---

## Generate a Secure Secret Key

### Option 1: Using Django (Recommended)

Run this command in your terminal:

```bash
cd backend
python manage.py shell -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

This will output a secure random key like:
```
django-insecure-abc123xyz789...
```

Copy that output and use it in your `.env` file.

---

### Option 2: Using Python Directly

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

---

### Option 3: Online Generator

You can also use Django's secret key generator:
- Visit: https://djecrety.ir/
- Click "Generate" button
- Copy the generated key

---

## Important Notes

- **For Development:** Any string works, even `django-insecure-change-this-in-production`
- **For Production:** Must be a secure, random string (use one of the methods above)
- **Keep it Secret:** Never commit your `.env` file to git (it's already in `.gitignore`)
- **One Key Per Project:** Each Django project should have its own unique secret key

---

## Quick Setup

For now, just use this in your `.env` file:

```env
SECRET_KEY=django-insecure-change-this-in-production
```

You can generate a proper one later when you're ready for production!



