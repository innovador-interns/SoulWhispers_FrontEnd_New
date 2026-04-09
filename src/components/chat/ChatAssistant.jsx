import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import ChatBubble from './ChatBubble';
import ChatWindow from './ChatWindow';
import { getChatResponse } from '../../services/chat.service';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am your Soul Whispers AI. How can I help you on your journey today?',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async (content) => {
    if (!content.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const payload = {
        question: content,
        user_id: 'default_user'
      };
      
      const response = await getChatResponse(payload);
      console.log("Chat response", response);
      
      // Extract the text content from the response object
      const replyText = typeof response === 'object' && response.answer 
        ? response.answer 
        : (typeof response === 'string' ? response : "I'm sorry, I couldn't process that response.");
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: replyText,
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error connecting to our server. Please try again later.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const onClearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Conversation cleared. How can I help you start fresh?',
        timestamp: new Date().toISOString(),
      },
    ]);
    toast.success("Chat cleared");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-row-reverse items-end pointer-events-none space-x-4 space-x-reverse">
      <div className="pointer-events-auto">
        <ChatBubble isOpen={isOpen} onClick={toggleChat} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50, transformOrigin: 'bottom right' }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="pointer-events-auto"
          >
            <ChatWindow 
              messages={messages} 
              onClose={() => setIsOpen(false)} 
              onSendMessage={sendMessage}
              onClearChat={onClearChat}
              isTyping={isTyping}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatAssistant;
