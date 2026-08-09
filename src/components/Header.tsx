'use client'

import React from 'react'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">HSK Flashcard Pro Plus</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Xin chào, User</span>
        <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition">
          Đăng xuất
        </button>
      </div>
    </header>
  )
}
