// app/dashboard/dashboard.test.tsx

import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardLayout from './layout'; // 1. Import Layout ที่เราจะทดสอบ
import DashboardPage from './page';     // 2. Import Page ที่จะอยู่ข้างใน
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock Component และ Hook ที่ไม่เกี่ยวข้อง
jest.mock('@/hooks/useResponsiveSidebar', () => ({
  useResponsiveSidebar: jest.fn(), // Mock hook นี้เพื่อไม่ให้ useEffect ทำงาน
}));

// 3. Mock Component และ Hook ที่ไม่เกี่ยวข้อง
jest.mock('@/components/dashboard/SalesChart', () => ({
  __esModule: true,
  SalesChart: () => <div>Mocked Sales Chart</div>,
}));

jest.mock('@/hooks/useMetrics', () => ({
  useMetrics: () => ({
    data: [{ date: '2025-01-01', mrr: 100, activeUsers: 10, churnRate: 1, ltv: 1000 }],
    isLoading: false,
    isError: false,
  }),
}));

const queryClient = new QueryClient();
const renderDashboard = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <DashboardLayout>
        <DashboardPage />
      </DashboardLayout>
    </QueryClientProvider>
  );
};

describe('Dashboard Integration Tests', () => {

  // 5. เทสแรก: การทำงานบน Desktop
  it('should toggle sidebar visibility on desktop', async () => { // <--- เปลี่ยนเป็น async function
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });

    // ห่อการ render และ event ทั้งหมดใน act() เพื่อจัดการ state updates
    await act(async () => {
      renderDashboard();
    });

    // หาส่วนประกอบต่างๆ บนหน้าจอ
    const sidebar = screen.getByRole('complementary'); 
    
    // [แก้ไข] หาปุ่มสำหรับ Desktop โดยใช้ aria-label ใหม่
    const toggleButton = screen.getByRole('button', { name: /toggle sidebar collapse/i });

    // ตรวจสอบสถานะเริ่มต้น
    // บน Desktop, Sidebar ควรจะมองเห็นได้
    expect(sidebar).toHaveClass('sm:w-64');

    // จำลองการคลิกของผู้ใช้
    await act(async () => {
      fireEvent.click(toggleButton);
    });

    // ตรวจสอบผลลัพธ์หลังการคลิก
    expect(sidebar).toHaveClass('sm:w-0');
    
    // คลิกอีกครั้งเพื่อทดสอบการเปิดกลับ
    await act(async () => {
      fireEvent.click(toggleButton);
    });
    expect(sidebar).toHaveClass('sm:w-64');
  });

  // เทสที่สอง: การทำงานบน Mobile
  it('should show sidebar as an overlay on mobile', async () => {
    // 1. ตั้งค่าขนาดหน้าจอจำลอง (Mobile)
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 });

    // 2. Render component ภายใต้ act
    await act(async () => {
      renderDashboard();
    });

    const sidebar = screen.getByRole('complementary');
    // 3. หาปุ่มสำหรับ Mobile โดยใช้ aria-label ใหม่
    const toggleButton = screen.getByRole('button', { name: /open sidebar menu/i });

    // 4. ตรวจสอบสถานะเริ่มต้นบน Mobile
    // Sidebar ควรจะซ่อนอยู่ (เลื่อนไปทางซ้ายสุด)
    // หมายเหตุ: เรา mock useResponsiveSidebar ไปแล้ว ดังนั้น state เริ่มต้นจะมาจาก Zustand คือ isOpen: true
    // ดังนั้นเราต้องคลิก 1 ครั้งก่อนเพื่อให้มันปิดตาม Logic ของ hook ที่เรา mock ไป
    await act(async () => {
      // คลิกเพื่อซ่อน (จำลองพฤติกรรมของ useResponsiveSidebar ที่จะซ่อนตอนจอเล็ก)
      fireEvent.click(toggleButton); 
    });
    
    // **ตอนนี้ Sidebar ควรจะซ่อนแล้ว**
    expect(sidebar).toHaveClass('-translate-x-full');
    
    // 5. จำลองการคลิกเพื่อเปิด
    await act(async () => {
      fireEvent.click(toggleButton);
    });
    
    // 6. ตรวจสอบผลลัพธ์
    // Sidebar ควรจะเลื่อนกลับมาที่ตำแหน่งปกติ
    expect(sidebar).toHaveClass('translate-x-0');

    // 7. หา Overlay background
    // Overlay จะถูกสร้างขึ้นมาใน DOM เราจะหามัน
    const overlay = screen.getByTestId('sidebar-overlay'); // <-- เราจะใช้วิธีหาแบบใหม่
    expect(overlay).toBeInTheDocument();

    // 8. คลิกที่ Overlay เพื่อปิด
    await act(async () => {
      fireEvent.click(overlay);
    });
    expect(sidebar).toHaveClass('-translate-x-full');
  });

});