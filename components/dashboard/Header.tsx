// components/dashboard/Header.tsx
'use client';

import { Button } from '@/components/ui/button';
import { User } from '@/lib/types/user';
import { useSidebarStore } from '@/store/useSidebarStore'; // 1. นำเข้า Store และ Action
import { PanelLeftClose, PanelRightClose } from 'lucide-react'; // 2. Icon สวยๆ (ต้องติดตั้ง lucide-react)
import Image from 'next/image';

// Mock User
const MOCK_USER: User = { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' };

export function Header() {
  const { isOpen, toggle } = useSidebarStore(); // 3. ดึง State และ Action มา

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">      
      <Button variant="ghost" size="icon" onClick={toggle}>
        {isOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelRightClose className="h-5 w-5" />}
      </Button>
      <div className="text-xl font-semibold hidden md:block">
        Dashboard Overview
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Image
          src="/images/avatar.jpg" // 3. Path ไปยังรูปภาพในโฟลเดอร์ public
          alt="User Avatar"
          width={32} // 4. กำหนดความกว้าง (pixel)
          height={32} // 5. กำหนดความสูง (pixel)
          className="rounded-full" // 6. จัดสไตล์ด้วย Tailwind
        />
        {/* <Image
          src="https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww" // 3. Path ไปยังรูปภาพในโฟลเดอร์ public
          alt="User Avatar"
          width={32} // 4. กำหนดความกว้าง (pixel)
          height={32} // 5. กำหนดความสูง (pixel)
          className="rounded-full" // 6. จัดสไตล์ด้วย Tailwind
        /> */}
        <span className="text-sm font-medium">{MOCK_USER.name}</span>
        <Button variant="ghost" size="sm">
          Sign Out
        </Button>
      </div>
    </header>
  );
}