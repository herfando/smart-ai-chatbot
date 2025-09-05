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

// Tipe untuk body permintaan
interface ChatRequest {
  messages: Message[];
}

export async function POST(req: Request) {
  try {
    const { messages }: ChatRequest = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'Pesan tidak ditemukan dalam permintaan.' }, { status: 400 });
    }


