import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Sparkles } from 'lucide-react';

const ChatMessage = ({ role, content, timestamp }) => {
  const isAssistant = role === 'assistant';
  
  const renderContentWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, idx) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={idx}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-semibold hover:underline transition-all ${
              isAssistant ? 'text-[#3bab35]' : 'text-white underline decoration-white/60'
            }`}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: isAssistant ? -20 : 20, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      className={`flex items-end space-x-2 ${isAssistant ? '' : 'flex-row-reverse space-x-reverse'}`}
    >
      <div className={`flex flex-col min-w-0 max-w-[85%] sm:max-w-[80%] ${isAssistant ? 'items-start' : 'items-end'}`}>
        <div 
          className={`
            px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-sm leading-relaxed text-xs sm:text-sm relative group
            ${isAssistant 
              ? 'bg-white text-slate-700 rounded-bl-sm border border-emerald-100' 
              : 'bg-gradient-to-tr from-[#3bab35] via-[#2d8a28] to-[#1e5d1b] text-white rounded-br-sm'
            }
          `}
        >
          {isAssistant && (
            <div className="absolute -top-2 -right-2 bg-emerald-50 border border-emerald-100 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Sparkles className="w-3 h-3 text-emerald-500" />
            </div>
          )}
          
          <p className="whitespace-pre-wrap [overflow-wrap:anywhere] overflow-hidden selection:bg-emerald-100">
            {renderContentWithLinks(content)}
          </p>
        </div>
        
        <span className="text-[10px] mt-1 text-slate-400 font-medium px-1 flex items-center space-x-1 uppercase tracking-tighter">
          {isAssistant ? (
            <>
              <Bot size={10} className="mr-1" />
              <span>{new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </>
          ) : (
            <>
              <span>{new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <User size={10} className="ml-1" />
            </>
          )}
        </span>
      </div>

      <div 
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border shadow-sm mb-5 flex-shrink-0
          ${isAssistant 
            ? 'bg-emerald-50 border-emerald-100 text-[#3bab35]' 
            : 'bg-slate-50 border-slate-200 text-slate-600'
          }
        `}
      >
        {isAssistant ? <Bot size={14} className="sm:size-4" /> : <User size={14} className="sm:size-4" />}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
