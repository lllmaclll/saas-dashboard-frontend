// hooks/use-current-session.ts
'use client';

import { useSession } from "next-auth/react"; // <-- v5 ไม่มี แต่เราจะใช้ Workaround จาก v4

export const useCurrentSession = () => {
  const { data: session, status } = useSession();
  
  return {
    user: session?.user,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
  };
};