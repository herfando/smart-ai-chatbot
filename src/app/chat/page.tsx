'use client';

import { useState } from 'react';

// Tipe untuk format pesan
interface Message {
  role: 'user' | 'system' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/chat/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error('Gagal komunikasi API.');

      const data = await response.json();
      const aiMessage: Message = { role: 'assistant', content: data.reply };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: '⚠️ Maaf, terjadi kesalahan.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg flex justify-between items-center">
        <h1 className="text-lg font-bold">🤖 AI Chatbox</h1>
        <span className="text-sm animate-pulse text-green-300">● Online</span>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          ></div>

          <div
              className={`max-w-xs md:max-w-md p-3 rounded-2xl shadow-md animate-fade-in ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-none'
                  : 'bg-gray-700 text-gray-100 rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-gray-300 px-4 py-2 rounded-2xl rounded-bl-none shadow-md animate-fade-in flex space-x-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
            </div>
          </div>
        )}
      </div>