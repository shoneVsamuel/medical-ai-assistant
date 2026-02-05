"""
API views for the translation assistant.
"""
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils import timezone
from django.db.models import Q
from .models import Conversation, Message
from .services import translate_text, generate_summary


def get_or_create_default_conversation():
    """Get or create a default conversation for MVP."""
    conversation, _ = Conversation.objects.get_or_create(
        id=1,
        defaults={'created_at': timezone.now()}
    )
    return conversation


def format_timestamp(dt):
    """Format datetime to '09:15 AM' format."""
    return dt.strftime('%I:%M %p')


def format_message_response(message):
    """Format message for API response."""
    return {
        'id': str(message.id),
        'sender': message.sender,
        'text': message.text or '',
        'translatedText': message.translated_text or '',
        'timestamp': format_timestamp(message.timestamp),
        'hasAudio': bool(message.audio_file),
        'audioUrl': message.audio_file.url if message.audio_file else None
    }


@csrf_exempt
@require_http_methods(["POST"])
def send_message(request):
    """
    POST /api/messages/send
    
    Request JSON:
    {
        "text": "Hello",
        "sender": "Doctor",
        "targetLanguage": "Spanish"
    }
    """
    try:
        data = json.loads(request.body)
        text = data.get('text', '').strip()
        sender = data.get('sender', '')
        target_language = data.get('targetLanguage', 'English')
        
        if not text:
            return JsonResponse({'error': 'Text is required'}, status=400)
        
        if sender not in ['Doctor', 'Patient']:
            return JsonResponse({'error': 'Sender must be "Doctor" or "Patient"'}, status=400)
        
        # Get or create default conversation
        conversation = get_or_create_default_conversation()
        
        # Translate text
        try:
            translated_text = translate_text(text, target_language)
        except ValueError as e:
            # More specific error for API key issues
            return JsonResponse({
                'error': 'Translation failed',
                'message': str(e)
            }, status=500)
        except Exception as e:
            return JsonResponse({
                'error': 'Translation failed',
                'message': f'Unexpected error: {str(e)}'
            }, status=500)
        
        # Create message
        message = Message.objects.create(
            conversation=conversation,
            sender=sender,
            text=text,
            translated_text=translated_text
        )
        
        return JsonResponse(format_message_response(message), status=201)
        
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def upload_audio(request):
    """
    POST /api/audio/upload
    
    Request FormData:
    - audio: file blob
    - sender: "Doctor" or "Patient"
    - targetLanguage: "Spanish"
    """
    try:
        if 'audio' not in request.FILES:
            return JsonResponse({'error': 'Audio file is required'}, status=400)
        
        audio_file = request.FILES['audio']
        sender = request.POST.get('sender', '')
        target_language = request.POST.get('targetLanguage', 'English')
        
        if sender not in ['Doctor', 'Patient']:
            return JsonResponse({'error': 'Sender must be "Doctor" or "Patient"'}, status=400)
        
        # Get or create default conversation
        conversation = get_or_create_default_conversation()
        
        # For MVP: Use placeholder text
        placeholder_text = "Audio message"
        
        # Translate placeholder text
        try:
            translated_text = translate_text(placeholder_text, target_language)
        except Exception as e:
            return JsonResponse({
                'error': 'Translation failed',
                'message': str(e)
            }, status=500)
        
        # Create message with audio
        message = Message.objects.create(
            conversation=conversation,
            sender=sender,
            text=placeholder_text,
            translated_text=translated_text,
            audio_file=audio_file
        )
        
        return JsonResponse(format_message_response(message), status=201)
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def generate_summary_view(request):
    """
    POST /api/summary/generate
    
    Request JSON:
    {
        "messages": [
            {"sender": "Doctor", "text": "..."},
            {"sender": "Patient", "text": "..."}
        ]
    }
    """
    try:
        data = json.loads(request.body)
        messages = data.get('messages', [])
        
        if not messages:
            return JsonResponse({'error': 'Messages array is required'}, status=400)
        
        # Generate summary using OpenAI
        try:
            summary = generate_summary(messages)
        except ValueError as e:
            # More specific error for API key issues
            return JsonResponse({
                'error': 'Summary generation failed',
                'message': str(e)
            }, status=500)
        except Exception as e:
            return JsonResponse({
                'error': 'Summary generation failed',
                'message': f'Unexpected error: {str(e)}'
            }, status=500)
        
        return JsonResponse({'summary': summary}, status=200)
        
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@require_http_methods(["GET"])
def search_messages(request):
    """
    GET /api/messages/search?q=keyword
    
    Search messages by text (case-insensitive).
    """
    try:
        query = request.GET.get('q', '').strip()
        
        if not query:
            return JsonResponse({'results': []}, status=200)
        
        # Get or create default conversation
        conversation = get_or_create_default_conversation()
        
        # Search messages (case-insensitive)
        messages = Message.objects.filter(
            conversation=conversation
        ).filter(
            Q(text__icontains=query) | Q(translated_text__icontains=query)
        )
        
        results = [format_message_response(msg) for msg in messages]
        
        return JsonResponse({'results': results}, status=200)
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

