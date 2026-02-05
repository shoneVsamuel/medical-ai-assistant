"""
URL configuration for translation_assistant project.
"""
from django.contrib import admin
from django.urls import path, include, re_path  # Added re_path
from django.views.generic import TemplateView    # Added TemplateView
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

def api_info(request):
    """Simple info endpoint for API status."""
    return JsonResponse({
        'message': 'Doctor-Patient Translation Assistant API',
        'version': '1.0',
        'endpoints': {
            'send_message': '/api/messages/send',
            'upload_audio': '/api/audio/upload',
            'generate_summary': '/api/summary/generate',
            'search_messages': '/api/messages/search?q=keyword',
        },
        'docs': 'See README.md for API documentation'
    })

urlpatterns = [
    # 1. Admin Dashboard
    path('admin/', admin.site.urls),
    
    # 2. API Endpoints
    path('api/', include('api.urls')),
    path('api-status/', api_info, name='api_info'), # Moved this so it doesn't block the root
    
    # 3. React Frontend Catch-All
    # This must be LAST. It sends all non-API requests to React's index.html
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)