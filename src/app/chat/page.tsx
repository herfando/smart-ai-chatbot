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
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Perbarui jalur fetch ke /chat/api
      const response = await fetch('/chat/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error('Gagal berkomunikasi dengan API.');
      }

      const data = await response.json();
      const aiMessage: Message = { role: 'assistant', content: data.reply };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Ada kesalahan:', error);
      const errorMessage: Message = { role: 'assistant', content: 'Maaf, terjadi kesalahan. Silakan coba lagi.' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
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
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="py-4 px-6 bg-gray-800 shadow-md">
        <h1 className="text-xl font-bold">AI Chatbot Sederhana</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg shadow-md ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-100'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 p-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Ketik pesan Anda di sini..."
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
          >
            {isLoading ? 'Mengirim...' : 'Kirim'}
          </button>
        </div>
      </div>
    </div>
  );
}