// auth.ts
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials" // 1. Import Credentials

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/login',
  },
  // 2. เพิ่ม Provider
  providers: [
    Credentials({
      // ฟังก์ชัน authorize จะถูกเรียกเมื่อมีการ signIn
      async authorize(credentials) {
        // นี่คือส่วนที่เราจะเช็ค username/password กับฐานข้อมูล
        // แต่สำหรับตอนนี้ เราจะจำลองการ login ง่ายๆ
        if (credentials) {
          const { email, password } = credentials;
          
          // ตรวจสอบง่ายๆ ว่ามี email และ password คือ "123456"
          if (email && password === '123456') {
            // ถ้าถูกต้อง, return ข้อมูลผู้ใช้
            // ข้อมูลนี้จะถูกเก็บไว้ใน session
            return { id: '1', name: 'Test User', email: email as string, image: 'https://i.pravatar.cc/150?u=test@example.com' };
          }
        }
        // ถ้าข้อมูลไม่ถูกต้อง, return null
        return null;
      },
    }),
  ],
})