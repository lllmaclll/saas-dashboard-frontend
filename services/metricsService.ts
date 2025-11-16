// services/metricsService.ts

import { MetricData } from '@/lib/types/metric';
import { 
  // getMockMetrics, 
  mockData } from '@/lib/utilities/mockData';

export const fetchMetrics = async (): Promise<MetricData[]> => {
  // จำลองความล่าช้าในการ Fetch (เช่น 500ms) เพื่อให้เห็น Loading State
  await new Promise(resolve => setTimeout(resolve, 500)); 
  
  // จำลองการเกิด Error 10% ของเวลาทั้งหมด (สามารถลบได้)
  // if (Math.random() < 0.1) {
  //   throw new Error('Failed to connect to Analytics API.');
  // }
  
  return mockData;
};
