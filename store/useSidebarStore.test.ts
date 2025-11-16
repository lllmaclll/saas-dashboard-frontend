// store/useSidebarStore.test.ts
import { act } from '@testing-library/react';
import { useSidebarStore } from './useSidebarStore';

describe('useSidebarStore', () => {
  // Reset store to initial state before each test
  beforeEach(() => {
    act(() => {
      useSidebarStore.setState({ isOpen: true });
    });
  });

  it('should have initial state isOpen as true', () => {
    const { isOpen } = useSidebarStore.getState();
    expect(isOpen).toBe(true);
  });

  it('should toggle isOpen state from true to false', () => {
    act(() => {
      useSidebarStore.getState().toggle();
    });
    const { isOpen } = useSidebarStore.getState();
    expect(isOpen).toBe(false);
  });

  it('should set isOpen state to a specific value', () => {
    act(() => {
      useSidebarStore.getState().setIsOpen(false);
    });
    const { isOpen } = useSidebarStore.getState();
    expect(isOpen).toBe(false);
  });
});