// components/dashboard/Header.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from './Header';

// Mock Zustand store
jest.mock('@/store/useSidebarStore', () => ({
  useSidebarStore: () => ({
    isOpen: true,
    toggle: jest.fn(),
  }),
}));

describe('Header Component', () => {
  it('should render the user name and sign out button', () => {
    render(<Header />);
    
    // ตรวจสอบว่าชื่อผู้ใช้ "John Doe" แสดงผล
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    // ตรวจสอบว่ามีปุ่ม "Sign Out"
    expect(screen.getByRole('button', { name: 'Sign Out' })).toBeInTheDocument();
    
    // ตรวจสอบว่ามี Title ของ Dashboard
    expect(screen.getByText('Dashboard Overview')).toBeInTheDocument();
  });
});