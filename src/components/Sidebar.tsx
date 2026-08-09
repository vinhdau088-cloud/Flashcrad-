'use client'

import React from 'react'

interface SidebarProps {
  currentTab: string
  setCurrentTab: (tab: string) => void
}

export default function Sidebar({ currentTab, setCurrentTab }: SidebarProps) {
  const menu = [
    { id: 'flashcard', label: '🎴 Flashcard' },
    { id: 'practice', label: '✍️ Luyện tập' },
    { id: 'vocabulary', label: '📚 Quản lý từ vựng' },
    { id: 'ai-assistant', label: '🤖 Trợ lý AI' },
  ]

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col">
      <div className="text-2xl font-black mb-8 px-2 text-indigo-400">HSK PRO</div>
      <nav className="flex-1 space-y-2">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition ${
              currentTab === item.id
                ? 'bg-indigo-600 text-white'
                : 'hover:bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
