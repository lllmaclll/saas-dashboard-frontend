// components/dashboard/Sidebar.tsx
'use client'; // ต้องเป็น Client Component

import Link from 'next/link';
import { useSidebarStore } from '@/store/useSidebarStore'; // นำเข้า Store
import { cn } from '@/lib/utils'; // นำเข้า Utility สำหรับรวม Class (มีอยู่แล้ว)

export function Sidebar() {
  const { isOpen } = useSidebarStore(); // ดึง State มาใช้

  return (
    // ใช้ cn เพื่อรวม Class และควบคุมการแสดงผล
    <aside className={cn(
      "fixed inset-y-0 left-0 z-10 flex-col border-r bg-background transition-all duration-300",
      isOpen ? "w-64" : "w-0", // ถ้าเปิดให้กว้าง 64, ถ้าปิดให้กว้าง 0
      "sm:flex" // ยังคงให้แสดงบน Desktop
    )}>
      {/* ซ่อนเนื้อหาข้างในเมื่อ Sidebar ปิด */}
      <nav className={cn(
        "flex flex-col gap-2 p-4",
        !isOpen && "hidden" // ถ้าปิด ให้ซ่อนเนื้อหา
      )}>
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
    </aside>
  );
}