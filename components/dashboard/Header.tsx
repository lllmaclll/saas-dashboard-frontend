// components/dashboard/Header.tsx
'use client';

import { Button } from '@/components/ui/button';
import { User } from '@/lib/types/user';
import { useSidebarStore } from '@/store/useSidebarStore'; // 1. นำเข้า Store และ Action
import { Menu, PanelLeftClose, PanelRightClose } from 'lucide-react'; // 2. Icon สวยๆ (ต้องติดตั้ง lucide-react)

// Mock User
const MOCK_USER: User = { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' };

export function Header({ userButton }: { userButton: React.ReactNode }) {
  const { isOpen, toggle } = useSidebarStore();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background py-2 px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent">
      
      {/* ปุ่มสำหรับ Mobile */}
      <Button variant="ghost" size="icon" onClick={toggle} aria-label="Open sidebar menu" className="sm:hidden">
        <Menu className="h-5 w-5" />
      </Button>

      {/* ปุ่มสำหรับ Desktop */}
      <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle sidebar collapse" className="hidden sm:inline-flex">
        {isOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelRightClose className="h-5 w-5" />}
      </Button>

      <div className="text-xl font-semibold hidden md:block">
        Dashboard Overview
      </div>
      <div className="ml-auto flex items-center gap-4">
        {/* 2. Render prop ที่ได้รับมา */}
        {userButton}
      </div>
    </header>
  );
}