'use client';

import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// สร้าง Query Client สำหรับ TanStack Query
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // 1. QueryClientProvider: สำหรับจัดการการดึงข้อมูล (useMetrics)
    <QueryClientProvider client={queryClient}>
      {/* 2. ThemeProvider: สำหรับ Dark/Light Mode (Shadcn/ui ต้องการ) */}
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}