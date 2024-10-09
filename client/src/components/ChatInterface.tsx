import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../store/chatSlice';
import { RootState } from '../store/store';
import ChatBubble from './ChatBubble';
import axios from 'axios';

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addMessage({ text: input, isUser: true }));
      setInput('');
      setIsLoading(true);

      try {
        const response = await axios.post('http://localhost:3001/api/chat', { message: input });
        dispatch(addMessage({ text: response.data.message, isUser: false }));
      } catch (error) {
        console.error('Error fetching AI response:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 via-gray-100 to-white p-4">
      {/* Chat Box Container */}
      <div className="w-full max-w-3xl h-[80vh] md:h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="text-center py-2 px-4 font-bold text-lg md:text-xl text-blue-600 bg-red-300 rounded-t-3xl shadow-md">
          Chat with us
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-white">
          {messages.map((msg, index) => (
            <ChatBubble key={index} message={msg.text} isUser={msg.isUser} />
          ))}

          {isLoading && (
            <div className="flex justify-center items-center space-x-2 animate-pulse">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form 
          onSubmit={handleSubmit} 
          className="p-3 md:p-4 bg-white border-t border-gray-200 rounded-b-xl">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 md:p-3 text-sm md:text-base border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 md:p-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;