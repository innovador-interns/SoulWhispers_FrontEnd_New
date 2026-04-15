import { Bot, X, Image as ImageIcon, Trash2 } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useEffect, useRef } from 'react';

const ChatWindow = ({ messages, onClose, onClearChat, onSendMessage, isTyping }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col w-[calc(100vw-6rem)] sm:w-[380px] h-[70vh] sm:h-[500px] max-h-[600px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-emerald-100 ring-1 ring-emerald-100 transition-all">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-tr from-[#3bab35] via-[#2d8a28] to-[#1e5d1b] text-white flex items-center justify-between shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform rotate-12 scale-150 pointer-events-none">
          <Bot size={120} />
        </div>
        
        <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-200 to-white flex items-center justify-center p-1.5 ring-2 ring-emerald-400/50">
              <Bot className="w-full h-full text-emerald-700" />
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-[2.5px] border-emerald-700 rounded-full animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-wide">Soul Whispers</h3>
            <p className="text-[10px] text-white/70 font-medium tracking-wider uppercase leading-none mt-0.5">Online AI Support</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 relative z-10">
          <button 
            onClick={onClearChat}
            className="p-1.5 hover:bg-white/20 rounded-full transition-all hover:scale-110 active:scale-95 duration-300"
            title="Clear Chat"
          >
            <Trash2 size={18} />
          </button>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-[#3bab35] rounded-full transition-all group-hover:rotate-90 duration-300"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden p-5 space-y-4 scroll-smooth bg-[#FBFDFA] custom-scrollbar"
      >
        <div className="flex flex-col items-center justify-center text-center opacity-40 mb-8 mt-2 pointer-events-none">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">Beginning of a journey</p>
          <div className="w-10 h-0.5 bg-gradient-to-r from-transparent via-[#3bab35]/30 to-transparent mt-1" />
        </div>

        {messages.map((message) => (
          <ChatMessage key={message.id} {...message} />
        ))}

        {isTyping && (
          <div className="flex space-x-2 items-end">
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 shadow-sm overflow-hidden p-1.5 mb-1">
              <Bot className="w-full h-full text-[#3bab35] animate-bounce" />
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-emerald-100 flex items-center space-x-1 min-h-[40px]">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-[#3bab35] rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput onSendMessage={onSendMessage} />
      
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3bab3555;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3bab35;
        }
      `}} />
    </div>
  );
};

export default ChatWindow;
