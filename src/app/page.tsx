'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

interface Word {
  id: string
  word: string
  pinyin: string
  meaning: string
  learned: boolean
}

export default function Home() {
  const [tab, setTab] = useState('flashcard')
  const [words, setWords] = useState<Word[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    fetch('/api/vocabulary')
      .then((res) => res.json())
      .then((data) => setWords(data))
  }, [])

  const currentWord = words[currentIndex]

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'zh-CN'
      window.speechSynthesis.speak(utterance)
    }
  }

  const toggleLearned = (id: string) => {
    setWords((prev) =>
      prev.map((w) => (w.id === id ? { ...w, learned: !w.learned } : w))
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentTab={tab} setCurrentTab={setTab} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8 flex-1 flex flex-col items-center justify-center">
          {tab === 'flashcard' && currentWord && (
            <div className="w-full max-w-md flex flex-col items-center gap-6">
              {/* Flashcard Component */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full h-72 bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center justify-center cursor-pointer p-6 relative transition-transform duration-300"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    speakText(currentWord.word)
                  }}
                  className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-lg"
                  title="Phát âm Google TTS"
                >
                  🔊
                </button>

                {!isFlipped ? (
                  <div className="text-center">
                    <p className="text-5xl font-bold text-gray-800 mb-2">{currentWord.word}</p>
                    <p className="text-lg text-indigo-600 font-medium">{currentWord.pinyin}</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800 mb-2">{currentWord.meaning}</p>
                    <p className="text-sm text-gray-400">Bấm để lật lại</p>
                  </div>
                )}
              </div>

              {/* Điều khiển */}
              <div className="flex gap-4 w-full justify-between items-center">
                <button
                  onClick={() => {
                    setIsFlipped(false)
                    setCurrentIndex((prev) => Math.max(0, prev - 1))
                  }}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 bg-gray-200 rounded-xl disabled:opacity-50"
                >
                  Trước
                </button>

                <button
                  onClick={() => toggleLearned(currentWord.id)}
                  className={`px-4 py-2 rounded-xl text-white font-medium ${
                    currentWord.learned ? 'bg-green-600' : 'bg-amber-500'
                  }`}
                >
                  {currentWord.learned ? 'Đã nhớ' : 'Chưa nhớ'}
                </button>

                <button
                  onClick={() => {
                    setIsFlipped(false)
                    setCurrentIndex((prev) => Math.min(words.length - 1, prev + 1))
                  }}
                  disabled={currentIndex === words.length - 1}
                  className="px-4 py-2 bg-gray-200 rounded-xl disabled:opacity-50"
                >
                  Tiếp
                </button>
              </div>
            </div>
          )}

          {tab === 'vocabulary' && (
            <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-bold mb-4">Danh sách từ vựng ({words.length})</h2>
              <div className="divide-y">
                {words.map((w) => (
                  <div key={w.id} className="py-3 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-gray-800 mr-2">{w.word}</span>
                      <span className="text-sm text-indigo-600 mr-2">[{w.pinyin}]</span>
                      <span className="text-sm text-gray-600">- {w.meaning}</span>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full ${
                        w.learned ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {w.learned ? 'Đã thuộc' : 'Chưa thuộc'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
