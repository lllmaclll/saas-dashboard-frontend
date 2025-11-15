// app/(dashboard)/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMetrics } from '@/hooks/useMetrics';
import { Skeleton } from '@/components/ui/skeleton'; // ต้องเพิ่ม Component นี้จาก shadcn/ui
import { SalesChart } from '@/components/dashboard/SalesChart'; // <--- เพิ่ม import นี้
import dynamic from 'next/dynamic'; // 1. Import dynamic จาก Next.js

// 2. สร้าง Dynamic Component
const DynamicSalesChart = dynamic(
  () => import('@/components/dashboard/SalesChart').then((mod) => mod.SalesChart),
  {
    // 3. กำหนด Loading State
    loading: () => (
      <Card className="col-span-1 md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Monthly Recurring Revenue (MRR) Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] w-full">
          <Skeleton className="h-full w-full" />
        </CardContent>
      </Card>
    ),
    // 4. ปิด Server-Side Rendering (SSR)
    ssr: false, 
  }
);

export default function DashboardPage() {
  // 1. Implement Data Fetching
  const { data, isLoading, isError, error } = useMetrics();

  if (isLoading) {
    // 2. แสดง Skeleton/Loading State (Best Practice)
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-[120px]" />
        <Skeleton className="h-[120px]" />
        <Skeleton className="h-[120px]" />
        <Skeleton className="h-[120px]" />
      </div>
    );
  }

  if (isError) {
    // 3. แสดง Error State
    return <div className="text-red-500">Error fetching data: {error.message}</div>;
  }

  // 4. แสดงผลข้อมูล (คำนวณจาก Mock Data ล่าสุด)
  const latestData = data ? data[data.length - 1] : null;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Recurring Revenue (MRR)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${latestData?.mrr.toLocaleString() || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestData?.activeUsers.toLocaleString() || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">
              +15 users since last week
            </p>
          </CardContent>
        </Card>
        {/* เพิ่ม Card อื่นๆ เช่น Churn Rate หรือ Metrics อื่นๆ */}
      </div>

      <div className="mt-4">
        {/* 5. ใช้ Dynamic Component แทน */}
        <DynamicSalesChart />
      </div>
    </>
  );
}

// ต้องติดตั้ง Skeleton Component ของ Shadcn/ui เพิ่ม
// npx shadcn-ui@latest add skeleton