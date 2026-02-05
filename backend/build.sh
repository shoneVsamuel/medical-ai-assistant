#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "📦 Installing dependencies..."
pip install -r requirements.txt

echo "📁 Moving into backend folder..."
cd backend

echo "🗄 Running migrations..."
python manage.py migrate

echo "📦 Collecting static files..."
python manage.py collectstatic --noinput

echo "✅ Build completed"
