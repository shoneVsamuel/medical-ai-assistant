# API Specification - Frontend Requirements

## Current Status: ⚠️ NO API CALLS IMPLEMENTED

**All functionality is currently mocked/placeholder.** This document specifies what API routes the frontend **needs** to call and what data formats it expects.

---

## 1. API Routes the Frontend Should Call

### 1.1 Send Message with Translation
**Route:** `POST /api/messages/send` or `POST /api/translate`

**When:** User clicks "Send" button or presses Enter in `ChatInput.tsx`
**Triggered by:** `sendMessage()` function in `useChatState.ts` (line 41)

**Request:**
```json
{
  "text": "Hello, how are you?",
  "sender": "Doctor",
  "targetLanguage": "Spanish",
  "sessionId": "8492-MD" // Optional, from ChatControls
}
```

**Expected Response:**
```json
{
  "id": "1234567890",
  "sender": "Doctor",
  "text": "Hello, how are you?",
  "translatedText": "Hola, ¿cómo estás?",
  "timestamp": "09:15 AM",
  "hasAudio": false,
  "audioUrl": null
}
```

**Error Response:**
```json
{
  "error": "Translation failed",
  "message": "Unable to translate text"
}
```

---

### 1.2 Upload Audio Recording
**Route:** `POST /api/audio/upload`

**When:** User stops recording (clicks mic button again)
**Triggered by:** `toggleRecording()` function in `useChatState.ts` (line 60) when stopping

**Request:**
- **Content-Type:** `multipart/form-data`
- **Body:** FormData with audio file
  ```
  audio: [Blob/File object]
  sender: "Doctor" | "Patient"
  targetLanguage: "Spanish"
  ```

**Expected Response:**
```json
{
  "id": "1234567891",
  "sender": "Doctor",
  "text": "[Transcribed text from audio]",
  "translatedText": "[Translated transcribed text]",
  "timestamp": "09:16 AM",
  "hasAudio": true,
  "audioUrl": "https://api.example.com/audio/abc123.webm"
}
```

**Error Response:**
```json
{
  "error": "Audio upload failed",
  "message": "File too large or invalid format"
}
```

---

### 1.3 Generate AI Summary
**Route:** `POST /api/summary/generate`

**When:** User clicks "Generate AI Summary" button
**Triggered by:** `generateSummary()` function in `useChatState.ts` (line 70)
**Button location:** `SidePanel.tsx` line 103-119

**Request:**
```json
{
  "messages": [
    {
      "id": "1",
      "sender": "Doctor",
      "text": "Good morning. How are you feeling today?",
      "translatedText": "Buenos días. ¿Cómo se siente hoy?",
      "timestamp": "09:00 AM"
    },
    {
      "id": "2",
      "sender": "Patient",
      "text": "I have a headache and I feel dizzy.",
      "translatedText": "Tengo dolor de cabeza y me siento mareado.",
      "timestamp": "09:01 AM"
    }
  ]
}
```

**Expected Response:**
```json
{
  "summary": "Patient presented with headache and dizziness. Symptoms started this morning. Doctor inquired about duration. Vital signs pending check."
}
```

**Error Response:**
```json
{
  "error": "Summary generation failed",
  "message": "Unable to generate summary"
}
```

---

### 1.4 Search Messages (Optional - Currently Client-Side)
**Route:** `GET /api/messages/search?q=query` (if backend search needed)

**When:** User types in search box
**Triggered by:** `setSearchQuery()` in `SidePanel.tsx` line 72
**Current:** Search is done client-side in `ChatMessages.tsx` (line 11-15)

**Request:**
```
GET /api/messages/search?q=headache&sessionId=8492-MD
```

**Expected Response:**
```json
{
  "results": [
    {
      "id": "2",
      "sender": "Patient",
      "text": "I have a headache and I feel dizzy.",
      "translatedText": "Tengo dolor de cabeza y me siento mareado.",
      "timestamp": "09:01 AM",
      "hasAudio": false
    }
  ]
}
```

---

## 2. JSON Data Shapes

### 2.1 Message Type (TypeScript Interface)
```typescript
interface Message {
  id: string;              // Unique message ID
  sender: 'Doctor' | 'Patient';
  text: string;            // Original text
  translatedText?: string; // Translated text (optional)
  timestamp: string;       // Format: "09:15 AM" or ISO string
  hasAudio?: boolean;      // Whether message has audio
  audioUrl?: string;       // URL to audio file if hasAudio is true
}
```

### 2.2 Send Message Request
```typescript
interface SendMessageRequest {
  text: string;
  sender: 'Doctor' | 'Patient';
  targetLanguage: 'English' | 'Spanish' | 'French' | 'Hindi' | 'Mandarin' | 'Arabic';
  sessionId?: string;     // Optional session identifier
}
```

### 2.3 Audio Upload Request
```typescript
// FormData with:
{
  audio: Blob | File;      // Audio file
  sender: 'Doctor' | 'Patient';
  targetLanguage: string;
  sessionId?: string;
}
```

### 2.4 Summary Request
```typescript
interface SummaryRequest {
  messages: Message[];     // Array of all messages in conversation
}
```

### 2.5 Summary Response
```typescript
interface SummaryResponse {
  summary: string;         // Generated summary text
}
```

---

## 3. How Audio Upload Works (To Be Implemented)

### Current State:
- **Audio recording:** Only console logs (line 64-66 in `useChatState.ts`)
- **Audio upload:** NOT IMPLEMENTED
- **Audio playback:** NOT IMPLEMENTED (button exists in `MessageBubble.tsx` line 56-63)

### Expected Implementation Flow:

1. **User clicks mic button** → `toggleRecording()` called
2. **Start recording:**
   ```typescript
   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
   const recorder = new MediaRecorder(stream);
   recorder.start();
   ```

3. **User clicks mic again to stop** → `toggleRecording()` called again
4. **Stop recording and upload:**
   ```typescript
   recorder.stop();
   const blob = new Blob(chunks, { type: 'audio/webm' });
   
   // Upload to backend
   const formData = new FormData();
   formData.append('audio', blob, 'recording.webm');
   formData.append('sender', currentRole);
   formData.append('targetLanguage', targetLanguage);
   
   const response = await fetch('/api/audio/upload', {
     method: 'POST',
     body: formData
   });
   ```

5. **Backend should:**
   - Receive audio file
   - Transcribe audio to text (using speech-to-text API)
   - Translate transcribed text
   - Store audio file
   - Return message object with audioUrl

---

## 4. How Summary/Search Buttons Trigger Requests

### 4.1 Summary Button

**Location:** `SidePanel.tsx` line 103-119

**Current Implementation:**
```typescript
// Line 104: onClick={onGenerateSummary}
// This calls generateSummary() from useChatState.ts line 70
```

**Current Code (Mock):**
```typescript
const generateSummary = () => {
  setIsGeneratingSummary(true);
  setTimeout(() => {
    setSummary('Patient presented with headache...');
    setIsGeneratingSummary(false);
  }, 1500);
};
```

**Expected Implementation:**
```typescript
const generateSummary = async () => {
  setIsGeneratingSummary(true);
  try {
    const response = await fetch('/api/summary/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });
    const data = await response.json();
    setSummary(data.summary);
  } catch (error) {
    console.error('Failed to generate summary:', error);
    // Show error to user
  } finally {
    setIsGeneratingSummary(false);
  }
};
```

**Flow:**
1. User clicks "Generate AI Summary" button
2. `onGenerateSummary()` callback triggered
3. `generateSummary()` function called
4. POST request to `/api/summary/generate` with messages array
5. Backend processes and returns summary
6. Summary displayed in SidePanel (line 91-100)

---

### 4.2 Search Input

**Location:** `SidePanel.tsx` line 69-76

**Current Implementation:**
```typescript
// Line 72: onChange={(e) => setSearchQuery(e.target.value)}
// This updates searchQuery state
```

**Current Code (Client-Side):**
```typescript
// In ChatMessages.tsx line 11-15
const filteredMessages = messages.filter(
  (msg) =>
    msg.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.translatedText?.toLowerCase().includes(searchQuery.toLowerCase())
);
```

**Expected Backend Implementation (Optional):**
```typescript
// If you want server-side search:
const handleSearch = async (query: string) => {
  if (!query.trim()) {
    setSearchQuery('');
    return;
  }
  
  try {
    const response = await fetch(`/api/messages/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    // Update filtered messages
  } catch (error) {
    console.error('Search failed:', error);
  }
};
```

**Flow:**
1. User types in search input
2. `setSearchQuery()` updates state (currently client-side filtering)
3. Messages filtered in `ChatMessages.tsx` component
4. Filtered results displayed

---

## 5. Environment Variables Needed

```env
# Backend API Base URL
VITE_API_BASE_URL=http://localhost:3000/api

# Or if using direct third-party APIs:
VITE_GOOGLE_TRANSLATE_API_KEY=...
VITE_OPENAI_API_KEY=...
```

---

## 6. Complete API Integration Example

### Example: Updated `useChatState.ts` with API Calls

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const sendMessage = async () => {
  if (!inputText.trim()) return;

  try {
    const response = await fetch(`${API_BASE_URL}/messages/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: inputText,
        sender: currentRole,
        targetLanguage: targetLanguage,
        sessionId: '8492-MD' // Get from state or props
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

const generateSummary = async () => {
  setIsGeneratingSummary(true);
  try {
    const response = await fetch(`${API_BASE_URL}/summary/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });

    if (!response.ok) throw new Error('Failed to generate summary');

    const data = await response.json();
    setSummary(data.summary);
  } catch (error) {
    console.error('Error generating summary:', error);
    // Show error to user
  } finally {
    setIsGeneratingSummary(false);
  }
};
```

---

## 7. Summary Table

| Feature | Route | Method | Trigger | Current Status |
|---------|-------|--------|---------|----------------|
| Send Message | `/api/messages/send` | POST | Send button | ❌ Mock |
| Translate | `/api/translate` | POST | Send message | ❌ Mock |
| Upload Audio | `/api/audio/upload` | POST | Stop recording | ❌ Not implemented |
| Generate Summary | `/api/summary/generate` | POST | Summary button | ❌ Mock (setTimeout) |
| Search Messages | `/api/messages/search` | GET | Search input | ✅ Client-side only |

---

## 8. Next Steps

1. **Implement API service layer** in `src/services/api.ts`
2. **Update `useChatState.ts`** to use real API calls
3. **Add error handling** and loading states
4. **Implement audio recording** and upload
5. **Test all endpoints** with backend

See `INTEGRATION_GUIDE.md` for implementation code examples.



