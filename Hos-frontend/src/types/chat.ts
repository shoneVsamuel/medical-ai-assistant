export type Role = 'Doctor' | 'Patient';

export type Language =
'English' |
'Spanish' |
'French' |
'Hindi' |
'Mandarin' |
'Arabic';

export interface Message {
  id: string;
  sender: Role;
  text: string;
  translatedText?: string;
  timestamp: string;
  hasAudio?: boolean;
  audioUrl?: string;
}

export interface ChatState {
  messages: Message[];
  currentRole: Role;
  targetLanguage: Language;
  inputText: string;
  isRecording: boolean;
  summary: string | null;
  searchQuery: string;
}