// store/useSidebarStore.ts
import { create } from 'zustand';

// 1. กำหนด Type สำหรับ State และ Actions
type SidebarState = {
  isOpen: boolean;
  toggle: () => void;
};

// 2. สร้าง Store
export const useSidebarStore = create<SidebarState>((set) => ({
  // State เริ่มต้น
  isOpen: true,
  // Action ที่ใช้เปลี่ยน State
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));