import React, { useEffect, useRef } from 'react';
import { Message } from '../types/chat';
import { MessageBubble } from './MessageBubble';
interface ChatMessagesProps {
  messages: Message[];
  searchQuery: string;
}
export function ChatMessages({ messages, searchQuery }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  // Filter messages based on search query
  const filteredMessages = messages.filter(
    (msg) =>
    msg.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.translatedText?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50 scroll-smooth">
      <div className="max-w-3xl mx-auto">
        {/* Date Divider */}
        <div className="flex justify-center mb-6">
          <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
            Today, {new Date().toLocaleDateString()}
          </span>
        </div>

        {filteredMessages.length === 0 ?
        <div className="text-center text-gray-400 py-10">
            <p>No messages found matching "{searchQuery}"</p>
          </div> :

        filteredMessages.map((msg) =>
        <MessageBubble key={msg.id} message={msg} />
        )
        }
        <div ref={bottomRef} />
      </div>
    </div>);

}