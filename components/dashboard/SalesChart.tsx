// components/dashboard/SalesChart.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockData } from '@/lib/utilities/mockData'; // เราจะใช้ Mock Data ที่มีอยู่
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export function SalesChart() {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-4">
      <CardHeader>
        <CardTitle>Monthly Recurring Revenue (MRR) Trend</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] w-full">
        {/* ResponsiveContainer ทำให้กราฟปรับขนาดตาม Card */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
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