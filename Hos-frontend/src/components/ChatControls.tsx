import React from 'react';
import { UserCircle2, Globe2, ChevronDown } from 'lucide-react';
import { Role, Language } from '../types/chat';
interface ChatControlsProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  targetLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}
export function ChatControls({
  currentRole,
  onRoleChange,
  targetLanguage,
  onLanguageChange
}: ChatControlsProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex flex-wrap gap-4 items-center shadow-sm sticky top-[64px] z-10">
      {/* Role Selector */}
      <div className="relative flex items-center">
        <UserCircle2 className="absolute left-3 w-4 h-4 text-gray-500" />
        <select
          value={currentRole}
          onChange={(e) => onRoleChange(e.target.value as Role)}
          className="pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent appearance-none cursor-pointer hover:bg-gray-100 transition-colors">

          <option value="Doctor">Doctor</option>
          <option value="Patient">Patient</option>
        </select>
        <ChevronDown className="absolute right-3 w-3 h-3 text-gray-500 pointer-events-none" />
      </div>

      {/* Language Selector */}
      <div className="relative flex items-center">
        <Globe2 className="absolute left-3 w-4 h-4 text-gray-500" />
        <select
          value={targetLanguage}
          onChange={(e) => onLanguageChange(e.target.value as Language)}
          className="pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent appearance-none cursor-pointer hover:bg-gray-100 transition-colors">

          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="Hindi">Hindi</option>
          <option value="Mandarin">Mandarin</option>
          <option value="Arabic">Arabic</option>
        </select>
        <ChevronDown className="absolute right-3 w-3 h-3 text-gray-500 pointer-events-none" />
      </div>

      <div className="ml-auto text-xs text-gray-500 hidden sm:block">
        Session ID: #8492-MD
      </div>
    </div>);

}