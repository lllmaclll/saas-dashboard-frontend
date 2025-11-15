// lib/mockData.ts

import { MetricData } from "./types/metric";

export const mockData: MetricData[] = [
  { date: '2025-01-01', mrr: 15000, activeUsers: 250, churnRate: 5.2, ltv: 3000 },
  { date: '2025-01-02', mrr: 15500, activeUsers: 260, churnRate: 5.1, ltv: 3100 },
  { date: '2025-01-03', mrr: 16200, activeUsers: 275, churnRate: 4.8, ltv: 3250 },
  { date: '2025-01-04', mrr: 16800, activeUsers: 290, churnRate: 4.5, ltv: 3360 },
  { date: '2025-01-05', mrr: 17500, activeUsers: 305, churnRate: 4.2, ltv: 3500 },
  { date: '2025-01-06', mrr: 18100, activeUsers: 320, churnRate: 4.1, ltv: 3620 },
  { date: '2025-01-07', mrr: 19500, activeUsers: 335, churnRate: 3.9, ltv: 3900 }, // ข้อมูลล่าสุด
];