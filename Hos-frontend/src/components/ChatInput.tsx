import React from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';
interface ChatInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  onSend: () => void;
  isRecording: boolean;
  onToggleRecording: () => void;
}
export function ChatInput({
  inputText,
  setInputText,
  onSend,
  isRecording,
  onToggleRecording
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };
  return (
    <div className="bg-white border-t border-gray-200 p-4 sticky bottom-0 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="max-w-3xl mx-auto flex items-end gap-3">
        {/* Attachment Button (Visual only) */}
        <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
          <Paperclip className="w-5 h-5" />
        </button>

        {/* Input Field */}
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl flex items-center px-4 py-2 focus-within:ring-2 focus-within:ring-[#1976D2] focus-within:border-transparent focus-within:bg-white transition-all">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[24px] py-2 text-gray-700 placeholder-gray-400"
            rows={1}
            style={{
              height: 'auto',
              minHeight: '44px'
            }} />

        </div>

        {/* Record Button */}
        <button
          onClick={onToggleRecording}
          className={`p-3 rounded-full transition-all duration-200 ${isRecording ? 'bg-red-50 text-red-600 ring-2 ring-red-500 animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          title={isRecording ? 'Stop Recording' : 'Start Recording'}>

          <Mic className="w-5 h-5" />
        </button>

        {/* Send Button */}
        <button
          onClick={onSend}
          disabled={!inputText.trim()}
          className={`p-3 rounded-full transition-all duration-200 ${inputText.trim() ? 'bg-[#1976D2] text-white shadow-md hover:bg-[#1565C0] hover:shadow-lg transform hover:-translate-y-0.5' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}>

          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>);

}