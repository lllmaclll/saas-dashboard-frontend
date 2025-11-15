// app/dashboard/layout.tsx
'use client'; // 1. ต้องเป็น Client Component เพื่อใช้ Hook

import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { useSidebarStore } from '@/store/useSidebarStore'; // 2. นำเข้า Store

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSidebarStore(); // 3. ดึงค่า isOpen มาจาก Store

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />

      {/* 4. ปรับเปลี่ยน Class ของ Main Content Area */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${isOpen ? 'sm:pl-64' : 'sm:pl-0'}`}>
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}