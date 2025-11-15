// hooks/useMetrics.test.tsx

import { renderHook, waitFor } from '@testing-library/react';
import { useMetrics } from './useMetrics';
import { fetchMetrics } from '@/services/metricsService';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MetricData } from '@/lib/types/metric';

// 1. [แก้ไข] เปลี่ยนวิธีการ Mock เป็นแบบ Explicit Factory Function
jest.mock('@/services/metricsService', () => ({
  __esModule: true, // จำเป็นสำหรับการ mock ES Modules
  fetchMetrics: jest.fn(), // บอก Jest ให้สร้าง mock function ชื่อ fetchMetrics อย่างชัดเจน
}));

// 2. [แก้ไข] Cast type ของ fetchMetrics ที่ import เข้ามาให้เป็น Jest Mock
const mockedFetchMetrics = fetchMetrics as jest.Mock;

// สร้าง Wrapper สำหรับ Provider
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useMetrics Hook', () => {
  beforeEach(() => {
    // ตอนนี้ .mockClear() จะทำงานได้แล้ว!
    mockedFetchMetrics.mockClear();
    queryClient.clear();
  });

  it('should return loading state initially and then the mock data', async () => {
    const mockData: MetricData[] = [
      { date: '2025-01-01', mrr: 100, activeUsers: 10, churnRate: 1, ltv: 1000 },
    ];
    // ตอนนี้ .mockResolvedValue() จะทำงานได้แล้ว!
    mockedFetchMetrics.mockResolvedValue(mockData);

    const { result } = renderHook(() => useMetrics(), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
  });

  it('should return an error state if the fetch fails', async () => {
    const errorMessage = 'API is down';
    // ตอนนี้ .mockRejectedValue() จะทำงานได้แล้ว!
    mockedFetchMetrics.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useMetrics(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe(errorMessage);
  });
});