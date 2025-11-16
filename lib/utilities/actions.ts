// lib/actions.ts
'use server'; // บอก Next.js ว่านี่คือ Server Action

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

//prevState: state ก่อนหน้า, formData: ข้อมูลจาก form
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // เรียกใช้ฟังก์ชัน signIn ของ NextAuth
    await signIn('credentials', formData);
    return 'Success'; // ต้อง return อะไรบางอย่าง
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials. Please try again.';
        default:
          return 'Something went wrong. Please try again later.';
      }
    }
    throw error; // ส่ง error อื่นๆ ต่อไป
  }
}

export async function updateUserProfile(
  prevState: { message: string } | undefined,
  formData: FormData,
) {
  try {
    const username = formData.get('username') as string;
    
    // --- Logic การอัปเดตฐานข้อมูลจะอยู่ที่นี่ ---
    // await db.user.update({ where: { id: userId }, data: { name: username } });
    console.log('Updating username to:', username);
    
    // ใน Next.js App Router เราต้อง revalidate path เพื่อให้ข้อมูลใหม่
    // revalidatePath('/dashboard');
    
    return { message: 'Profile updated successfully!' };
  } catch (error) {
    return { message: 'Failed to update profile.' };
  }
}