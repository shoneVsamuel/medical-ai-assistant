"""
URL configuration for API endpoints.
"""
from django.urls import path
from . import views

urlpatterns = [
    path('messages/send', views.send_message, name='send_message'),
    path('audio/upload', views.upload_audio, name='upload_audio'),
    path('summary/generate', views.generate_summary_view, name='generate_summary'),
    path('messages/search', views.search_messages, name='search_messages'),
]



