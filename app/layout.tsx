// app/layout.tsx

import type { Metadata } from 'next';
// นำเข้า Inter หรือ Font อื่นๆ ตามต้องการ
import { Inter } from 'next/font/google'; // แก้ไขตรงนี้
import './globals.css';
import { Providers } from '@/components/providers/Providers';

// ใช้ Inter แทน Geist
const inter = Inter({
  subsets: ['latin'],
  // กำหนดเป็น variable เพื่อใช้ใน CSS ได้ (Optional)
  variable: '--font-sans',
});

// อัปเดต Metadata ให้ตรงกับโปรเจกต์
export const metadata: Metadata = {
  title: 'SaaS Metrics Dashboard',
  description: 'Performance analytics platform built with Next.js and Tailwind CSS.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning> 
      {/* เพิ่ม suppressHydrationWarning ใน html tag หากใช้ Dark/Light Mode หรือ Theme */}
      <body
        // ใช้ className จาก Shadcn/ui และ Tailwind
        className={`${inter.className} min-h-screen bg-background font-sans antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}