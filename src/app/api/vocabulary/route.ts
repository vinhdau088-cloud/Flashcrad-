import { NextResponse } from 'next/server'

// Sample data / JSON fallback
const initialVocabulary = [
  { id: '1', word: '你好', pinyin: 'nǐ hǎo', meaning: 'Xin chào', learned: false },
  { id: '2', word: '谢谢', pinyin: 'xiè xie', meaning: 'Cảm ơn', learned: false },
  { id: '3', word: '再见', pinyin: 'zài jiàn', meaning: 'Tạm biệt', learned: true },
]

export async function GET() {
  return NextResponse.json(initialVocabulary)
}

export async function POST(req: Request) {
  const body = await req.json()
  // Xử lý thêm từ vựng mới hoặc lưu trữ
  return NextResponse.json({ success: true, data: body })
}
