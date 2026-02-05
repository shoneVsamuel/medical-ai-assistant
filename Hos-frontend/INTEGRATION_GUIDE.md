# Backend Integration Guide

This document outlines what needs to be implemented to make the Doctor–Patient Translation Chat fully functional.

## 1. Translation API Integration

### Current Status
The translation is currently a placeholder in `useChatState.ts`:
```typescript
translatedText: `[Translated to ${targetLanguage}]: ${inputText}`
```

### Implementation Options

#### Option A: Google Cloud Translation API
```typescript
// Install: npm install @google-cloud/translate
import { Translate } from '@google-cloud/translate/build/src/v2';

const translate = new Translate({
  key: import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY
});

async function translateText(text: string, targetLang: string): Promise<string> {
  const [translation] = await translate.translate(text, targetLang);
  return translation;
}
```

#### Option B: Azure Translator
```typescript
// Install: npm install @azure/ms-rest-js
async function translateText(text: string, targetLang: string): Promise<string> {
  const response = await fetch(
    `${import.meta.env.VITE_AZURE_TRANSLATOR_ENDPOINT}/translate?api-version=3.0&to=${targetLang}`,
    {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': import.meta.env.VITE_AZURE_TRANSLATOR_KEY,
        'Ocp-Apim-Subscription-Region': import.meta.env.VITE_AZURE_TRANSLATOR_REGION,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([{ text }])
    }
  );
  const data = await response.json();
  return data[0].translations[0].text;
}
```

#### Option C: DeepL API
```typescript
async function translateText(text: string, targetLang: string): Promise<string> {
  const langMap: Record<string, string> = {
    'English': 'EN',
    'Spanish': 'ES',
    'French': 'FR',
    'Hindi': 'HI',
    'Mandarin': 'ZH',
    'Arabic': 'AR'
  };
  
  const response = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      'Authorization': `DeepL-Auth-Key ${import.meta.env.VITE_DEEPL_API_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `text=${encodeURIComponent(text)}&target_lang=${langMap[targetLang]}`
  });
  
  const data = await response.json();
  return data.translations[0].text;
}
```

### Update useChatState.ts
Replace the placeholder translation in the `sendMessage` function with actual API calls.

## 2. Audio Recording Implementation

### Current Status
Audio recording only logs to console in `useChatState.ts`.

### Implementation
```typescript
// Add to useChatState.ts
const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks: Blob[] = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      setAudioBlob(blob);
      // Upload to server or convert to base64
    };

    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);
  } catch (error) {
    console.error('Error accessing microphone:', error);
  }
};

const stopRecording = () => {
  if (mediaRecorder) {
    mediaRecorder.stop();
    mediaRecorder.stream.getTracks().forEach(track => track.stop());
    setIsRecording(false);
  }
};
```

### Audio Playback
Update `MessageBubble.tsx` to play audio:
```typescript
const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

const playAudio = () => {
  if (message.audioUrl) {
    const audioElement = new Audio(message.audioUrl);
    audioElement.play();
    setAudio(audioElement);
  }
};
```

## 3. AI Summary Generation

### Current Status
Uses a setTimeout mock in `useChatState.ts`.

### Implementation Options

#### Option A: OpenAI API
```typescript
async function generateSummary(messages: Message[]): Promise<string> {
  const conversationText = messages
    .map(m => `${m.sender}: ${m.text}`)
    .join('\n');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a medical assistant. Generate a concise consultation summary from the following conversation.'
        },
        {
          role: 'user',
          content: conversationText
        }
      ],
      max_tokens: 300
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
```

#### Option B: Azure OpenAI
Similar to OpenAI but with different endpoint and headers.

### Update useChatState.ts
Replace the setTimeout mock in `generateSummary` with actual API calls.

## 4. Backend API Integration (Optional)

If you have a custom backend, create an API service:

```typescript
// src/services/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const api = {
  translate: async (text: string, targetLang: string) => {
    const response = await fetch(`${API_BASE_URL}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetLang })
    });
    return response.json();
  },

  uploadAudio: async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    const response = await fetch(`${API_BASE_URL}/audio/upload`, {
      method: 'POST',
      body: formData
    });
    return response.json();
  },

  generateSummary: async (messages: Message[]) => {
    const response = await fetch(`${API_BASE_URL}/summary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });
    return response.json();
  }
};
```

## 5. Error Handling

Add proper error handling for all API calls:
```typescript
try {
  const result = await apiCall();
  // Handle success
} catch (error) {
  console.error('API Error:', error);
  // Show user-friendly error message
  // You might want to add a toast notification system
}
```

## 6. Loading States

Update UI components to show loading states during API calls:
- Translation: Show loading indicator while translating
- Audio: Show recording indicator
- Summary: Already implemented with `isGeneratingSummary`

## 7. Environment Variables

Make sure all required environment variables are set in `.env`:
- Translation API key
- AI Summary API key
- Backend API URL (if applicable)

## Next Steps

1. Choose your translation API provider
2. Choose your AI summary provider
3. Implement the API integrations in `useChatState.ts`
4. Add error handling and loading states
5. Test with real API calls
6. Deploy with proper environment variables



