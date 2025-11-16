// app/(dashboard)/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMetrics } from '@/hooks/useMetrics';
import { Skeleton } from '@/components/ui/skeleton'; // ต้องเพิ่ม Component นี้จาก shadcn/ui
import dynamic from 'next/dynamic'; // 1. Import dynamic จาก Next.js
import { RecentSignups } from '@/components/dashboard/RecentSignups';

// [แก้ไข] ไม่ต้องใช้ loading state ใน dynamic import แล้ว
const DynamicSalesChart = dynamic(
  () => import('@/components/dashboard/SalesChart').then((mod) => mod.SalesChart),
  {
    ssr: false, 
  }
);

export default function DashboardPage() {
  // 1. Implement Data Fetching
  const { data, isLoading, isError, error } = useMetrics();

  // เราจะจัดการ Loading state แค่ที่เดียว เพื่อความง่าย
  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-[120px]" />
          <Skeleton className="h-[120px]" />
          <Skeleton className="h-[120px]" />
          <Skeleton className="h-[120px]" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          <Skeleton className="lg:col-span-4 h-[350px]" />
          <Skeleton className="lg:col-span-3 h-[350px]" />
        </div>
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
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card เดิม 1 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MRR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${latestData?.mrr.toLocaleString() || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>

        {/* Card เดิม 2 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestData?.activeUsers.toLocaleString() || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">+15 users since last week</p>
          </CardContent>
        </Card>

        {/* --- [เพิ่ม] Card ใหม่ 1: Churn Rate --- */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestData?.churnRate.toFixed(1) || 'N/A'}%</div>
            <p className="text-xs text-muted-foreground">-0.5% from last month</p>
          </CardContent>
        </Card>

        {/* --- [เพิ่ม] Card ใหม่ 2: LTV --- */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lifetime Value (LTV)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${latestData?.ltv.toLocaleString() || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">Average customer value</p>
          </CardContent>
        </Card>
      </div>

      {/* ส่วนที่ 2: Chart และ Recent Signups */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {/* ทำให้ Chart กินพื้นที่ 4 ส่วน */}
        <div className="lg:col-span-4">
          <DynamicSalesChart data={data} isLoading={isLoading} />
        </div>
        {/* ทำให้ Recent Signups กินพื้นที่ 3 ส่วน */}
        <div className="lg:col-span-3 flex flex-col">
          <RecentSignups />
        </div>
      </div>
    </div>
  );
}