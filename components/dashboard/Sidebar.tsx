// components/dashboard/Sidebar.tsx
'use client'; // ต้องเป็น Client Component

import Link from 'next/link';
import { useSidebarStore } from '@/store/useSidebarStore'; // นำเข้า Store
import { cn } from '@/lib/utilities/utils'; // นำเข้า Utility สำหรับรวม Class (มีอยู่แล้ว)

export function Sidebar() {
  const { isOpen } = useSidebarStore(); // ดึง State มาใช้

  return (
    <>
      {/* 1. เพิ่ม Overlay Background สำหรับมือถือ */}
      {isOpen && (
        <div 
          onClick={() => useSidebarStore.getState().toggle()} 
          className="fixed inset-0 bg-black/50 z-30 sm:hidden"
          data-testid="sidebar-overlay"
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 flex-col border-r bg-background transition-all duration-300",
        // Logic สำหรับ Mobile (< sm): เลื่อนเข้า-ออก
        isOpen ? "translate-x-0" : "-translate-x-full",
        // Logic สำหรับ Desktop (>= sm): เปลี่ยนความกว้าง
        "sm:translate-x-0", // บน Desktop ให้อยู่กับที่เสมอ
        isOpen ? "sm:w-64" : "sm:w-0" // บน Desktop ให้เปลี่ยนความกว้างตาม isOpen
      )}>
        {/* ซ่อน/แสดงเนื้อหา (สำคัญมาก) */}
        <div className={cn(
          "overflow-hidden", // ป้องกันไม่ให้เนื้อหาล้นออกมาตอนหุบ
          isOpen ? "w-64" : "w-0"
        )}>
          <nav className="flex flex-col gap-2 p-4 w-64">
            <h1 className="text-lg font-bold">Metrics Dashboard</h1>
            <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary">
              Home
            </Link>
            <Link href="/dashboard/reports" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              Reports
            </Link>
            <Link href="/dashboard/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              Settings
            </Link>
          </nav>
        </div>
      </aside>
      </>
  );
}