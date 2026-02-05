import React from 'react';
import { Message } from '../types/chat';
import { Languages, PlayCircle, User, Stethoscope } from 'lucide-react';
interface MessageBubbleProps {
  message: Message;
}
export function MessageBubble({ message }: MessageBubbleProps) {
  const isDoctor = message.sender === 'Doctor';
  return (
    <div
      className={`flex w-full mb-6 ${isDoctor ? 'justify-end' : 'justify-start'}`}>

      <div
        className={`flex max-w-[85%] md:max-w-[70%] ${isDoctor ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>

        {/* Avatar Icon */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mb-1 shadow-sm ${isDoctor ? 'bg-[#1976D2]' : 'bg-gray-400'}`}>

          {isDoctor ?
          <Stethoscope className="w-4 h-4 text-white" /> :

          <User className="w-4 h-4 text-white" />
          }
        </div>

        {/* Bubble */}
        <div
          className={`relative p-4 rounded-2xl shadow-sm border ${isDoctor ? 'bg-[#E3F2FD] border-blue-100 rounded-br-none' : 'bg-white border-gray-100 rounded-bl-none'}`}>

          {/* Sender Label */}
          <div
            className={`text-xs font-bold mb-1 ${isDoctor ? 'text-[#1565C0]' : 'text-gray-600'}`}>

            {message.sender}
          </div>

          {/* Original Text */}
          <p className="text-gray-800 text-base leading-relaxed mb-3">
            {message.text}
          </p>

          {/* Translated Text */}
          {message.translatedText &&
          <div className="relative mt-2 pt-2 border-t border-black/5">
              <div className="flex gap-2 items-start">
                <Languages className="w-3 h-3 text-gray-400 mt-1 flex-shrink-0" />
                <p className="text-gray-600 text-sm italic leading-relaxed">
                  {message.translatedText}
                </p>
              </div>
            </div>
          }

          {/* Audio Player (Placeholder) */}
          {message.hasAudio &&
          <div className="mt-3 flex items-center gap-2 bg-black/5 rounded-full px-3 py-1.5 w-fit cursor-pointer hover:bg-black/10 transition-colors">
              <PlayCircle className="w-4 h-4 text-[#1976D2]" />
              <span className="text-xs font-medium text-gray-600">
                Play Audio
              </span>
              <span className="text-[10px] text-gray-400 ml-1">0:12</span>
            </div>
          }

          {/* Timestamp */}
          <div className="mt-2 text-[10px] text-gray-400 text-right font-medium">
            {message.timestamp}
          </div>
        </div>
      </div>
    </div>);

}