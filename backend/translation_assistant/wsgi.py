"""
WSGI config for translation_assistant project.
"""
import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'translation_assistant.settings')

application = get_wsgi_application()




