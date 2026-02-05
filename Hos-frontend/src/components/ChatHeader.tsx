import React from 'react';
import { Stethoscope } from 'lucide-react';
export function ChatHeader() {
  return (
    <header className="bg-[#1976D2] text-white p-4 shadow-md flex items-center gap-3 sticky top-0 z-20">
      <div className="bg-white/20 p-2 rounded-full">
        <Stethoscope className="w-6 h-6 text-white" />
      </div>
      <div>
        <h1 className="text-lg font-bold leading-tight">
          Doctor–Patient Translator
        </h1>
        <p className="text-xs text-blue-100 font-medium">
          Real-time multilingual medical communication
        </p>
      </div>
    </header>);

}