// hooks/useMetrics.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchMetrics } from '@/services/metricsService';
import { MetricData } from '@/lib/types/metric';

export function useMetrics() {
  return useQuery<MetricData[], Error>({
    queryKey: ['saasMetrics'],
    queryFn: fetchMetrics,
    // data is stale after 5 minutes
    staleTime: 1000 * 60 * 5, 
  });
}