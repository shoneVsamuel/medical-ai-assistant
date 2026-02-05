#!/usr/bin/env bash
# exit on error
set -o errexit

# --- 1. BUILD FRONTEND ---
echo "Building Frontend..."
# Step out of 'backend' to reach 'hos-frontend'
cd ../Hos-frontend
npm install
npm run build
cd ../backend

# --- 2. BUILD BACKEND ---
echo "Building Backend..."
pip install --upgrade pip
pip install -r requirements.txt

echo "Collecting static files..."
# This command will look into the path defined in your settings.py
python manage.py collectstatic --noinput

echo "Running migrations..."
python manage.py migrate

echo "Build Process Complete!"