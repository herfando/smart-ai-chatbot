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