# Django Backend - Doctor-Patient Translation Assistant

A Django backend API for the healthcare translation application.

## Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Environment Variables

Create a `.env` file in the `backend/` directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
SECRET_KEY=your-secret-key-here
DEBUG=True
```

### 3. Database Migration

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

### 5. Run Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`

## API Endpoints

### 1. POST /api/messages/send

Send a message and get translation.

**Request:**
```json
{
  "text": "Hello",
  "sender": "Doctor",
  "targetLanguage": "Spanish"
}
```

**Response:**
```json
{
  "id": "1",
  "sender": "Doctor",
  "text": "Hello",
  "translatedText": "Hola",
  "timestamp": "09:15 AM",
  "hasAudio": false,
  "audioUrl": null
}
```

### 2. POST /api/audio/upload

Upload an audio file.

**Request:** FormData
- `audio`: file blob
- `sender`: "Doctor" or "Patient"
- `targetLanguage`: "Spanish"

**Response:**
```json
{
  "id": "2",
  "sender": "Patient",
  "text": "Audio message",
  "translatedText": "Mensaje de audio",
  "timestamp": "09:18 AM",
  "hasAudio": true,
  "audioUrl": "/media/audio/filename.webm"
}
```

### 3. POST /api/summary/generate

Generate AI summary of conversation.

**Request:**
```json
{
  "messages": [
    {"sender": "Doctor", "text": "..."},
    {"sender": "Patient", "text": "..."}
  ]
}
```

**Response:**
```json
{
  "summary": "Patient reports headache and nausea. Advised hydration..."
}
```

### 4. GET /api/messages/search?q=keyword

Search messages by keyword.

**Response:**
```json
{
  "results": [
    {
      "id": "1",
      "sender": "Doctor",
      "text": "Hello",
      "translatedText": "Hola",
      "timestamp": "09:15 AM",
      "hasAudio": false,
      "audioUrl": null
    }
  ]
}
```

## Project Structure

```
backend/
├── api/
│   ├── models.py          # Conversation and Message models
│   ├── views.py           # API view functions
│   ├── services.py        # OpenAI integration
│   ├── urls.py            # API URL routing
│   └── admin.py           # Django admin configuration
├── translation_assistant/
│   ├── settings.py        # Django settings
│   └── urls.py            # Main URL configuration
├── manage.py
├── requirements.txt
└── .env                   # Environment variables (create this)
```

## Database Models

### Conversation
- `id`: Primary key
- `created_at`: Auto timestamp

### Message
- `id`: Primary key
- `conversation`: ForeignKey to Conversation
- `sender`: "Doctor" or "Patient"
- `text`: Original message text
- `translated_text`: Translated version
- `audio_file`: FileField for audio uploads
- `timestamp`: Auto timestamp

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173` (Vite dev server)
- `http://127.0.0.1:5173`

Update `CORS_ALLOWED_ORIGINS` in `settings.py` if needed.

## Media Files

Audio files are stored in `backend/media/audio/` directory.

Make sure the `media/` directory exists and is writable.




