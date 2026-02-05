import React, { useState } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatControls } from './ChatControls';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { SidePanel } from './SidePanel';
import { useChatState } from '../hooks/useChatState';
export function ChatInterface() {
  const {
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
  } = useChatState();
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans overflow-hidden">
      <ChatHeader />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-white shadow-xl z-10">
          <ChatControls
            currentRole={currentRole}
            onRoleChange={setCurrentRole}
            targetLanguage={targetLanguage}
            onLanguageChange={setTargetLanguage} />


          <ChatMessages messages={messages} searchQuery={searchQuery} />

          <ChatInput
            inputText={inputText}
            setInputText={setInputText}
            onSend={sendMessage}
            isRecording={isRecording}
            onToggleRecording={toggleRecording} />

        </main>

        {/* Side Panel (Collapsible on mobile, fixed on desktop) */}
        <SidePanel
          summary={summary}
          onGenerateSummary={generateSummary}
          isGenerating={isGeneratingSummary}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isOpen={isSidePanelOpen}
          setIsOpen={setIsSidePanelOpen} />

      </div>
    </div>);

}