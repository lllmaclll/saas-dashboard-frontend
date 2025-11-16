// components/dashboard/ReportsTable.test.tsx
import { render, screen, fireEvent, act, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReportsTable } from './ReportsTable';
import { useMetrics } from '@/hooks/useMetrics';

jest.mock('@/hooks/useMetrics');
const mockedUseMetrics = useMetrics as jest.Mock;

describe('ReportsTable Component', () => {
  it('should render loading skeletons initially', () => {
    mockedUseMetrics.mockReturnValue({ isLoading: true, data: undefined });
    render(<ReportsTable />);
    
    // [แก้ไข] หา Skeleton จาก data-testid
    const skeletons = screen.getAllByTestId('skeleton-row');
    expect(skeletons).toHaveLength(3);
  });

  it('should render the table with data and handle sorting', async () => {
    const mockData = [
      { date: '2025-01-02', mrr: 200, activeUsers: 20, churnRate: 2, ltv: 2000 },
      { date: '2025-01-01', mrr: 100, activeUsers: 10, churnRate: 1, ltv: 1000 },
    ];
    mockedUseMetrics.mockReturnValue({ isLoading: false, data: mockData });
    
    render(<ReportsTable />);

    // 1. [แก้ไข] ตรวจสอบแถวแรกก่อน Sort
    let rows = screen.getAllByRole('row');
    // แถวที่ 1 ควรจะเป็นข้อมูลของวันที่ '2025-01-02'
    expect(within(rows[1]).getByText('2025-01-02')).toBeInTheDocument();

    // 2. [แก้ไข] หา "ปุ่ม" ที่อยู่ใน Header ไม่ใช่ตัว Header เอง
    const mrrHeaderButton = screen.getByRole('button', { name: /mrr/i });
    
    // 3. คลิกเพื่อ Sort (น้อยไปมาก)
    await act(async () => {
      fireEvent.click(mrrHeaderButton);
    });

    // 4. [แก้ไข] ตรวจสอบผลลัพธ์หลัง Sort
    rows = screen.getAllByRole('row'); // หาแถวทั้งหมดอีกครั้งหลัง re-render
    // แถวที่ 1 (index 1) ควรจะกลายเป็นข้อมูลของวันที่ '2025-01-01' แล้ว
    expect(within(rows[1]).getByText('2025-01-01')).toBeInTheDocument();
    
    // 5. คลิกอีกครั้งเพื่อ Sort (มากไปน้อย)
    await act(async () => {
      fireEvent.click(mrrHeaderButton);
    });
    
    // 6. ตรวจสอบผลลัพธ์
    rows = screen.getAllByRole('row');
    // แถวที่ 1 ควรจะกลับมาเป็นข้อมูลของวันที่ '2025-01-02'
    expect(within(rows[1]).getByText('2025-01-02')).toBeInTheDocument();
  });
});