import React from 'react';
import { motion } from 'framer-motion';
import { Bot, X } from 'lucide-react';

const ChatBubble = ({ isOpen, onClick }) => {
  return (
    <motion.button
      onClick={onClick} 
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', damping: 15, stiffness: 400 }}
      className={`relative w-12 h-12 md:h-16 md:w-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300
        ${isOpen 
          ? 'bg-gradient-to-tr from-[#5dda56] via-[#44bb3d] to-[#2d8a28] text-white hover:shadow-green-500/30' 
          : 'bg-gradient-to-tr from-[#3bab35] via-[#2d8a28] to-[#1e5d1b] text-white hover:shadow-green-500/30'
        }
      `}
      aria-label={isOpen ? 'Close chat' : 'Open AI assistant'}
    >
      <div className="absolute inset-0 rounded-full animate-pulse opacity-50 bg-inherit filter blur-md -z-10" />
      
      {/* {!isOpen && (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-1 -right-1"
        >
          <div className="flex items-center justify-center w-5 h-5 bg-orange-500 text-white text-[10px] rounded-full border-2 border-white shadow-sm font-bold">
            1
          </div>
        </motion.div>
      )} */}

      {isOpen ? (
        <X className="w-7 h-7 text-white" />
      ) : (
        <div className="relative">
          <Bot className="w-7 h-7" />
          {/* <motion.div
            animate={{ 
              y: [0, -3, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
            }}
            className="absolute -top-1 -right-1"
          >
            <Sparkles className="w-4 h-4 text-emerald-100 fill-emerald-100" />
          </motion.div> */}
        </div>
      )}
    </motion.button>
  );
};

export default ChatBubble;
