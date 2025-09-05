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

    // Kirim pesan ke API OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages as any, // Perhatikan: 'as any' digunakan karena tipe dari 'messages' mungkin tidak sepenuhnya cocok dengan skema OpenAI
    });

    // Ambil respons teks dari AI
    const reply = response.choices[0].message.conte


