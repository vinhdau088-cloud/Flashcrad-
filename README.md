# HSK FlashCard Pro+

Web ứng dụng học từ vựng tiếng Trung HSK 1-6 chuẩn UI Dark Theme cao cấp, tích hợp thuật toán Spaced Repetition, Gemini AI Tutor, Realtime Presence, Thống kê học tập và Admin Dashboard.

## 🚀 Công nghệ sử dụng
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons
- **Backend & Database**: PostgreSQL, Prisma ORM, NextAuth.js
- **AI Integration**: Google Gemini API (`@google/generative-ai`)
- **Realtime**: Pusher JS
- **Deployment**: Vercel Ready

## 🛠️ Hướng dẫn cài đặt & Chạy ứng dụng

1. **Cài đặt thư viện**:
   ```bash
   npm install
   ```

2. **Cấu hình môi trường**:
   - Tệp `.env.example` đã được tạo sẵn.
   - Tạo file `.env` và điền thông tin Database PostgreSQL & Gemini API Key.

3. **Khởi tạo Database Schema**:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

4. **Chạy ứng dụng chế độ Development**:
   ```bash
   npm run dev
   ```
   Truy cập `http://localhost:3000`.

5. **Build cho Production**:
   ```bash
   npm run build
   npm start
   ```

## 📂 Cấu trúc thư mục
- `prisma/`: Chứa file `schema.prisma` định nghĩa PostgreSQL Database.
- `src/app/`: Next.js App Router (Giao diện chính, API routes, Auth, Gemini AI, Admin).
- `src/components/`: Layout, Sidebar, Header, FlashcardViewer, GeminiTutor, RealtimeOnline.
- `src/lib/`: Prisma client, Auth options, Gemini SDK setup, Pusher setup.
