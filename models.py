from django.db import models
from django.utils import timezone


class Conversation(models.Model):
    """Represents a conversation session between doctor and patient."""
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Conversation {self.id} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"


class Message(models.Model):
    """Represents a message in a conversation."""
    SENDER_CHOICES = [
        ('Doctor', 'Doctor'),
        ('Patient', 'Patient'),
    ]

    conversation = models.ForeignKey(
        Conversation,
        on_delete=models.CASCADE,
        related_name='messages'
    )
    sender = models.CharField(max_length=10, choices=SENDER_CHOICES)
    text = models.TextField(null=True, blank=True)
    translated_text = models.TextField(null=True, blank=True)
    audio_file = models.FileField(upload_to='audio/', null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"{self.sender}: {self.text[:50] if self.text else 'Audio message'}"



