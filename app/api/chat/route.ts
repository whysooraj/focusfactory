import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

const SYSTEM_PROMPT = `You are a helpful AI assistant for FocusFactory, a productivity app. 
Your role is to help users with:
- Study techniques and focus strategies
- Time management and productivity tips
- Answering questions about the app's features
- Providing motivation and accountability

Keep responses concise, helpful, and focused on productivity and learning.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1]?.content || '';

    if (!apiKey) {
      return NextResponse.json({
        content: `I'm your FocusFactory AI assistant! To get full AI responses, please configure your GEMINI_API_KEY. In the meantime, here is a focus tip: Break your work into 25-minute sprints using the Pomodoro timer, eliminate distractions, and take 5-minute active breaks. You've got this!`
      });
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    const chatHistory = [
      {
        role: 'user',
        parts: [{ text: SYSTEM_PROMPT }],
      },
      {
        role: 'model',
        parts: [{ text: 'Hello! I\'m your FocusFactory AI assistant. How can I help you with your studies today?' }],
      },
      ...messages.slice(0, -1).map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content || '' }],
      })),
    ];

    const chat = model.startChat({
      history: chatHistory,
    });
    
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({
      content: 'I had trouble connecting to the AI service, but remember: consistency beats intensity. Start a 25-minute Pomodoro session now and focus on one specific deliverable!'
    });
  }
}
