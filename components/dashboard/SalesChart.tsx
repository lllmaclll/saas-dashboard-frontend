// components/dashboard/SalesChart.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { MetricData } from '@/lib/types/metric'; // Import type
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// 1. กำหนด Props
interface SalesChartProps {
  data: MetricData[] | undefined; // รับ data ที่อาจจะเป็น undefined
  isLoading: boolean;
}

export function SalesChart({ data, isLoading }: SalesChartProps) {
  // 2. จัดการสถานะ Loading
  if (isLoading) {
    return (
      <Card className="col-span-1 md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Monthly Recurring Revenue (MRR) Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] w-full">
          <Skeleton className="h-full w-full" />
        </CardContent>
      </Card>
    );
  }

  // 3. จัดการกรณีไม่มีข้อมูล
  if (!data || data.length === 0) {
    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Monthly Recurring Revenue (MRR) Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] w-full flex items-center justify-center">
          <p>No data available to display.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-4">
      <CardHeader>
        <CardTitle>Monthly Recurring Revenue (MRR) Trend</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {/* 4. ใช้ data จาก props */}
          <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="mrr" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}