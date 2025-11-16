// app/dashboard/_components/dashboard-shell.tsx
'use client';

import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useResponsiveSidebar } from '@/hooks/useResponsiveSidebar';

export function DashboardShell({ 
  children,
  userButton,
}: { 
  children: React.ReactNode;
  userButton: React.ReactNode;
}) {
  const { isOpen } = useSidebarStore();
  useResponsiveSidebar();

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className={`flex flex-col flex-1 transition-all duration-300 ${isOpen ? 'sm:pl-64' : 'sm:pl-0'}`}> 
        <Header userButton={userButton} />
        <main className="flex-1 p-4 sm:px-6">
          {children}
        </main>
      </div>
    </div>
  );
}