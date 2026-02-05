# Frontend Integration Guide

## Backend is Ready! ✅

The Django backend is complete and ready to connect to your React frontend.

## Quick Connection Steps

### 1. Update Frontend Environment

In `Hos-frontend/.env`, add:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### 2. Update Frontend Code

Update `Hos-frontend/src/hooks/useChatState.ts` to use the backend API.

**Example for `sendMessage()` function:**

```typescript
const sendMessage = async () => {
  if (!inputText.trim()) return;

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/messages/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: inputText,
        sender: currentRole,
        targetLanguage: targetLanguage
      })
    });

    if (!response.ok) throw new Error('Failed to send message');

    const newMessage: Message = await response.json();
    setMessages([...messages, newMessage]);
    setInputText('');
  } catch (error) {
    console.error('Error sending message:', error);
    // Show error to user
  }
};
```

**Example for `generateSummary()` function:**

```typescript
const generateSummary = async () => {
  setIsGeneratingSummary(true);
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/summary/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });

    if (!response.ok) throw new Error('Failed to generate summary');

    const data = await response.json();
    setSummary(data.summary);
  } catch (error) {
    console.error('Error generating summary:', error);
  } finally {
    setIsGeneratingSummary(false);
  }
};
```

## API Endpoints Available

All endpoints match the frontend's expected format:

1. ✅ `POST /api/messages/send` - Send message with translation
2. ✅ `POST /api/audio/upload` - Upload audio file
3. ✅ `POST /api/summary/generate` - Generate AI summary
4. ✅ `GET /api/messages/search?q=keyword` - Search messages

## Response Formats

All responses match the frontend's expected JSON structure:

**Message Response:**
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

**Summary Response:**
```json
{
  "summary": "Patient reports headache..."
}
```

## Testing

1. Start Django backend:
   ```bash
   cd backend
   python manage.py runserver
   ```

2. Start React frontend:
   ```bash
   cd Hos-frontend
   npm run dev
   ```

3. Test in browser at `http://localhost:5173`

## CORS Configuration

The backend is already configured to accept requests from:
- `http://localhost:5173` (Vite default)
- `http://127.0.0.1:5173`

If your frontend runs on a different port, update `CORS_ALLOWED_ORIGINS` in `backend/translation_assistant/settings.py`.



