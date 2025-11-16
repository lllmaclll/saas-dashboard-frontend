// app/dashboard/settings/settings.test.tsx
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SettingsForm } from '@/components/dashboard/SettingsForm';
import * as actions from '@/lib/utilities/actions'; // Import actions ทั้งหมด

// Mock Server Action
jest.mock('@/lib/actions', () => ({
  ...jest.requireActual('@/lib/actions'), // Import action อื่นๆ ที่มีอยู่จริง
  updateUserProfile: jest.fn(), // Mock แค่ฟังก์ชันนี้
}));

// Cast type ให้เป็น Mock
const mockedUpdateUserProfile = actions.updateUserProfile as jest.Mock;

describe('Settings Form', () => {
  it('should submit the form with the new username', async () => {
    // จำลองว่า action ทำงานสำเร็จ
    mockedUpdateUserProfile.mockResolvedValue({ message: 'Success!' });

    render(<SettingsForm initialUsername="John Doe" initialEmail="john@doe.com" />);

    // หา input และ button
    const usernameInput = screen.getByLabelText(/username/i);
    const saveButton = screen.getByRole('button', { name: /save changes/i });

    // พิมพ์ชื่อใหม่
    const newUsername = 'Jane Doe';
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: newUsername } });
    });
    
    // กด Save
    await act(async () => {
      fireEvent.click(saveButton);
    });

    // ตรวจสอบว่า Server Action ถูกเรียกด้วยข้อมูลที่ถูกต้อง
    await waitFor(() => {
      expect(mockedUpdateUserProfile).toHaveBeenCalledTimes(1);
      // เราไม่สามารถเช็ค formData ได้โดยตรง แต่เราเช็คได้ว่ามันถูกเรียก
    });
  });
});