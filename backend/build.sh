cat > backend/build.sh << 'EOF'
#!/usr/bin/env bash
set -o errexit

echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Running migrations..."
python manage.py migrate

echo "Verifying gunicorn installation..."
which gunicorn
gunicorn --version
EOF