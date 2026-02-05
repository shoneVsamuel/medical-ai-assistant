from django.contrib import admin
from .models import Conversation, Message


@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ['id', 'created_at']
    list_filter = ['created_at']
    readonly_fields = ['created_at']


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['id', 'conversation', 'sender', 'text', 'timestamp']
    list_filter = ['sender', 'timestamp']
    search_fields = ['text', 'translated_text']
    readonly_fields = ['timestamp']



