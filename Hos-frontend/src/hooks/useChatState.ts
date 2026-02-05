import { useState } from 'react';
import { Message, Role, Language } from '../types/chat';

const INITIAL_MESSAGES: Message[] = [
{
  id: '1',
  sender: 'Doctor',
  text: 'Good morning. How are you feeling today?',
  translatedText: 'Buenos días. ¿Cómo se siente hoy?',
  timestamp: '09:00 AM',
  hasAudio: true
},
{
  id: '2',
  sender: 'Patient',
  text: 'I have a headache and I feel dizzy.',
  translatedText: 'Tengo dolor de cabeza y me siento mareado.',
  timestamp: '09:01 AM',
  hasAudio: false
},
{
  id: '3',
  sender: 'Doctor',
  text: 'How long have you had these symptoms?',
  translatedText: '¿Cuánto tiempo ha tenido estos síntomas?',
  timestamp: '09:02 AM',
  hasAudio: true
}];


export function useChatState() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [currentRole, setCurrentRole] = useState<Role>('Doctor');
  const [targetLanguage, setTargetLanguage] = useState<Language>('Spanish');
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const textToSend = inputText;
    setInputText(''); // Clear input immediately for better UX

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
      const response = await fetch(`${apiUrl}/messages/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToSend,
          sender: currentRole,
          targetLanguage: targetLanguage
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error', message: 'Could not parse error response' }));
        const errorMsg = errorData.message || errorData.error || `Server error: ${response.status}`;
        throw new Error(errorMsg);
      }

      const newMessage: Message = await response.json();
      setMessages([...messages, newMessage]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      // More detailed error message
      let errorMessage = 'Translation failed';
      if (error.message) {
        errorMessage = error.message;
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = 'Cannot connect to backend. Is the server running?';
      }
      
      // Fallback: add message without translation on error
      const fallbackMessage: Message = {
        id: Date.now().toString(),
        sender: currentRole,
        text: textToSend,
        translatedText: `[Error: ${errorMessage}]`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
        hasAudio: false
      };
      setMessages([...messages, fallbackMessage]);
      setInputText(textToSend); // Restore input text on error
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Placeholder for actual recording logic
    if (!isRecording) {
      console.log('Started recording...');
    } else {
      console.log('Stopped recording...');
    }
  };

  const generateSummary = async () => {
    setIsGeneratingSummary(true);
    
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
      
      // Format messages for API
      const messagesForAPI = messages.map(msg => ({
        sender: msg.sender,
        text: msg.text || ''
      }));

      const response = await fetch(`${apiUrl}/summary/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messagesForAPI })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error', message: 'Could not parse error response' }));
        const errorMsg = errorData.message || errorData.error || 'Failed to generate summary';
        throw new Error(errorMsg);
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error generating summary:', error);
      setSummary('Failed to generate summary. Please try again.');
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  return {
    messages,
    currentRole,
    setCurrentRole,
    targetLanguage,
    setTargetLanguage,
    inputText,
    setInputText,
    isRecording,
    sendMessage,
    toggleRecording,
    summary,
    generateSummary,
    isGeneratingSummary,
    searchQuery,
    setSearchQuery
  };
}