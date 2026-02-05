# API Quick Reference - Answers to Your Questions

## ❌ CURRENT STATUS: NO API CALLS ARE IMPLEMENTED

Everything is currently **mocked/placeholder**. Below is what **should** be implemented.

---

## 1. What API Routes Your Frontend Should Call

### Route 1: Send Message with Translation
```
POST /api/messages/send
```
**OR**
```
POST /api/translate
```

**Triggered by:** Send button click → `sendMessage()` in `useChatState.ts:41`

---

### Route 2: Upload Audio
```
POST /api/audio/upload
```

**Triggered by:** Stop recording → `toggleRecording()` in `useChatState.ts:60` (when stopping)

---

### Route 3: Generate Summary
```
POST /api/summary/generate
```

**Triggered by:** "Generate AI Summary" button → `generateSummary()` in `useChatState.ts:70`

---

### Route 4: Search Messages (Optional)
```
GET /api/messages/search?q=query
```

**Currently:** Client-side only (no API call)

---

## 2. JSON Shape Expected Back

### Send Message Response:
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

### Audio Upload Response:
```json
{
  "id": "1234567891",
  "sender": "Doctor",
  "text": "[Transcribed text]",
  "translatedText": "[Translated text]",
  "timestamp": "09:16 AM",
  "hasAudio": true,
  "audioUrl": "https://api.example.com/audio/abc123.webm"
}
```

### Summary Response:
```json
{
  "summary": "Patient presented with headache and dizziness..."
}
```

---

## 3. How Audio Is Being Uploaded

### ❌ CURRENTLY: NOT IMPLEMENTED

**Expected Implementation:**

1. **User clicks mic button** → Starts recording
2. **User clicks mic again** → Stops recording
3. **Audio blob created:**
   ```typescript
   const blob = new Blob(chunks, { type: 'audio/webm' });
   ```

4. **Upload via FormData:**
   ```typescript
   const formData = new FormData();
   formData.append('audio', blob, 'recording.webm');
   formData.append('sender', 'Doctor');
   formData.append('targetLanguage', 'Spanish');
   
   fetch('/api/audio/upload', {
     method: 'POST',
     body: formData
   });
   ```

5. **Backend should:**
   - Receive audio file
   - Transcribe to text
   - Translate text
   - Return message with audioUrl

---

## 4. How Summary/Search Buttons Trigger Requests

### Summary Button:

**Location:** `SidePanel.tsx` line 103-119

**Flow:**
1. User clicks "Generate AI Summary" button
2. `onClick={onGenerateSummary}` → calls `generateSummary()` in `useChatState.ts:70`
3. **Currently:** Uses `setTimeout` mock (line 73-78)
4. **Should:** Make POST request to `/api/summary/generate`

**Expected Code:**
```typescript
const generateSummary = async () => {
  setIsGeneratingSummary(true);
  const response = await fetch('/api/summary/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages })
  });
  const data = await response.json();
  setSummary(data.summary);
  setIsGeneratingSummary(false);
};
```

---

### Search Input:

**Location:** `SidePanel.tsx` line 69-76

**Flow:**
1. User types in search box
2. `onChange={(e) => setSearchQuery(e.target.value)}` updates state
3. **Currently:** Client-side filtering in `ChatMessages.tsx:11-15`
4. **Optional:** Could call `GET /api/messages/search?q=query`

**Current Implementation (Client-Side):**
```typescript
// In ChatMessages.tsx
const filteredMessages = messages.filter(
  (msg) =>
    msg.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.translatedText?.toLowerCase().includes(searchQuery.toLowerCase())
);
```

---

## 📋 Complete Request Examples

### Example 1: Send Message
```http
POST /api/messages/send
Content-Type: application/json

{
  "text": "Hello, how are you?",
  "sender": "Doctor",
  "targetLanguage": "Spanish",
  "sessionId": "8492-MD"
}
```

### Example 2: Upload Audio
```http
POST /api/audio/upload
Content-Type: multipart/form-data

audio: [Blob file]
sender: "Doctor"
targetLanguage: "Spanish"
```

### Example 3: Generate Summary
```http
POST /api/summary/generate
Content-Type: application/json

{
  "messages": [
    {
      "id": "1",
      "sender": "Doctor",
      "text": "Good morning...",
      "translatedText": "Buenos días...",
      "timestamp": "09:00 AM"
    }
  ]
}
```

---

## 🎯 Key Files to Update

1. **`src/hooks/useChatState.ts`**
   - Line 41: `sendMessage()` - Add API call
   - Line 60: `toggleRecording()` - Add audio upload
   - Line 70: `generateSummary()` - Add API call

2. **`src/components/MessageBubble.tsx`**
   - Line 56-63: Add audio playback functionality

3. **Create `src/services/api.ts`** (new file)
   - Centralized API service functions

---

## 📚 See Also

- **`API_SPECIFICATION.md`** - Complete detailed specification
- **`INTEGRATION_GUIDE.md`** - Implementation code examples



