// hooks/useResponsiveSidebar.ts
'use client';

import { useSidebarStore } from '@/store/useSidebarStore';
import { useEffect } from 'react';

export const useResponsiveSidebar = () => {
  const { setIsOpen } = useSidebarStore();

  useEffect(() => {
    // ฟังก์ชันที่จะทำงานเมื่อขนาดจอเปลี่ยน
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsOpen(false); // ถ้าจอน้อยกว่า 640px ให้บังคับปิด Sidebar
      } else {
        setIsOpen(true); // ถ้าจอใหญ่กว่าหรือเท่ากับ 640px ให้บังคับเปิด
      }
    };

    // เรียกใช้ครั้งแรกตอนโหลด Component
    handleResize();

    // เพิ่ม Event Listener เพื่อคอยฟังการ resize
    window.addEventListener('resize', handleResize);

    // Cleanup function: จะทำงานเมื่อ Component ถูก unmount
    // เพื่อลบ Event Listener ออก ป้องกัน Memory Leak
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsOpen]); // Dependency array: ให้ useEffect ทำงานใหม่ถ้า setIsOpen เปลี่ยน (ซึ่งปกติไม่เปลี่ยน)
};