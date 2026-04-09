import React, { useState } from 'react';
import { Send, Smile, Paperclip, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const words = message.trim() ? message.trim().split(/\s+/).length : 0;
  const chars = message.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (words > 50) {
      toast.error("Message exceeds 50 words");
      return;
    }

    if (chars > 100) {
      toast.error("Message exceeds 100 characters");
      return;
    }

    onSendMessage(message);
    setMessage('');
  };

  return (
    <>
      <div className="p-4 bg-white border-t border-emerald-50 flex-shrink-0">
        <div className="flex items-center justify-start mb-2 ml-2 space-x-3 opacity-60 text-[10px] font-medium transition-colors">
          <span className={`flex items-center gap-1 ${words > 50 ? 'text-red-500 font-bold opacity-100' : 'text-emerald-800/80'}`}>
            {words} / 50 words
          </span>
          <span className={`w-1 h-1 rounded-full ${words > 50 || chars > 100 ? 'bg-red-300' : 'bg-emerald-300'}`} />
          <span className={`flex items-center gap-1 ${chars > 100 ? 'text-red-500 font-bold opacity-100' : 'text-emerald-800/80'}`}>
            {chars} / 100 characters
          </span>
        </div>
        <form
          onSubmit={handleSubmit}
          className={`flex items-end space-x-2 relative
            ${isFocused ? 'ring-2 ring-[#3bab35]/20' : 'ring-1 ring-emerald-100'}
            rounded-2xl transition-all duration-300
          `}
        >
          <div className="flex-1 flex flex-col p-1 min-h-[36px] justify-center ml-2">
            <textarea
              rows="1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Type your message..."
              className="w-full bg-transparent border-none focus:ring-0 text-sm text-slate-700 resize-none max-h-24 py-2 pr-10 placeholder-emerald-800/40 font-medium font-sans outline-none"
            />
          </div>
          <motion.button
            type="submit"
            disabled={!message.trim()}
            whileHover={message.trim() ? { scale: 1.1, x: 2 } : {}}
            whileTap={message.trim() ? { scale: 0.9 } : {}}
            className={`
              w-11 h-11 flex items-center justify-center rounded-xl transition-all shadow-md
              ${message.trim()
                ? 'bg-gradient-to-tr from-[#3bab35] to-[#2d8a28] text-white shadow-[#3bab35]/20'
                : 'bg-emerald-50 text-emerald-300/70  cursor-not-allowed shadow-none border border-emerald-200'
              }
            `}
          >
            <Send size={20} className={message.trim() ? 'rotate-[-15deg]' : ''} />
          </motion.button>
        </form>


        <p className="text-[10px] text-center mt-2 text-emerald-800/40 font-medium tracking-tight px-4 leading-none flex items-center justify-center pointer-events-none">
          Powered by Soul AI Assistant
        </p>
      </div>
    </>
  );
};

export default ChatInput;
