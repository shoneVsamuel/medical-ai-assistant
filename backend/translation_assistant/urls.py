"""
URL configuration for translation_assistant project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

def api_info(request):
    """Simple info endpoint for root URL."""
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
    path('', api_info, name='api_info'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

