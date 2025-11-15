// สำหรับข้อมูลผู้ใช้
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
};