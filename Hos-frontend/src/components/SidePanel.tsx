import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  X,
  FileText,
  ChevronRight,
  ChevronLeft } from
'lucide-react';
interface SidePanelProps {
  summary: string | null;
  onGenerateSummary: () => void;
  isGenerating: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export function SidePanel({
  summary,
  onGenerateSummary,
  isGenerating,
  searchQuery,
  setSearchQuery,
  isOpen,
  setIsOpen
}: SidePanelProps) {
  return (
    <>
      {/* Mobile Toggle Button (Visible only when closed on mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg border border-gray-200 p-2 rounded-l-lg z-30 lg:hidden transition-transform duration-300 ${isOpen ? 'translate-x-full' : 'translate-x-0'}`}>

        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>

      {/* Panel Container */}
      <div
        className={`
        fixed inset-y-0 right-0 w-80 bg-white border-l border-gray-200 shadow-xl transform transition-transform duration-300 z-40
        lg:relative lg:transform-none lg:shadow-none lg:w-80 lg:flex-shrink-0 lg:z-0
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>

        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#1976D2]" />
              Tools & Summary
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1 hover:bg-gray-200 rounded-full text-gray-500">

              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-6 flex-1 overflow-y-auto">
            {/* Search Section */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Search History
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search messages..."
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#1976D2] focus:border-transparent outline-none transition-all" />

              </div>
            </div>

            {/* AI Summary Section */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Consultation Summary
                </label>
                <span className="bg-blue-50 text-[#1976D2] text-[10px] px-2 py-0.5 rounded-full font-medium">
                  AI Powered
                </span>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 min-h-[200px] relative">
                {summary ?
                <p className="text-sm text-gray-700 leading-relaxed animate-in fade-in duration-500">
                    {summary}
                  </p> :

                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-4 text-center">
                    <FileText className="w-8 h-8 mb-2 opacity-20" />
                    <p className="text-xs">No summary generated yet.</p>
                  </div>
                }
              </div>

              <button
                onClick={onGenerateSummary}
                disabled={isGenerating}
                className="w-full py-2.5 bg-[#1976D2] hover:bg-[#1565C0] text-white rounded-lg text-sm font-medium shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">

                {isGenerating ?
                <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating...
                  </> :

                <>
                    <Sparkles className="w-4 h-4" />
                    Generate AI Summary
                  </>
                }
              </button>
            </div>

            {/* Quick Actions (Visual Only) */}
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Quick Actions
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button className="p-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Export PDF
                </button>
                <button className="p-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Email Transcript
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen &&
      <div
        className="fixed inset-0 bg-black/20 z-30 lg:hidden backdrop-blur-sm"
        onClick={() => setIsOpen(false)} />

      }
    </>);

}