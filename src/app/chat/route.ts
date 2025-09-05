// Impor modul OpenAI dan NextResponse dari Next.js
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Inisialisasi klien OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Tipe untuk format pesan
interface Message {
  role: 'user' | 'system' | 'assistant';
  content: string;
}