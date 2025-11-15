// สำหรับข้อมูล Metrics หลัก
export type MetricData = {
  date: string; // YYYY-MM-DD
  mrr: number; // Monthly Recurring Revenue
  activeUsers: number;
  churnRate: number;
  ltv: number; // Lifetime Value
};