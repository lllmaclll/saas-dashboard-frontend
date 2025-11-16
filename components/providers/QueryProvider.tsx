// components/providers/QueryProvider.tsx
'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // สำหรับการ Debug

// สร้าง Query Client สำหรับ TanStack Query
const queryClient = new QueryClient();

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    // QueryClientProvider: สำหรับจัดการการดึงข้อมูล (useMetrics)
    <QueryClientProvider client={queryClient}>
      {children}
      {/* แสดง Devtools เฉพาะในโหมด Development */}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}