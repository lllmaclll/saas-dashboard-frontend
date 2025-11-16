// store/useSidebarStore.ts
import { create } from 'zustand';

type SidebarState = {
  isOpen: boolean;
  toggle: () => void;
  setIsOpen: (isOpen: boolean) => void; // เพิ่ม Action สำหรับตั้งค่าโดยตรง
};

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: true, // กลับไปใช้ค่าเริ่มต้นที่ง่ายที่สุด
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setIsOpen: (isOpen) => set({ isOpen }), // Action ใหม่
}));