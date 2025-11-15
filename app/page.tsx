// app/page.tsx

import { redirect } from 'next/navigation';

// หน้าหลักนี้จะทำ Redirect ไปที่ Dashboard ทันที
export default function Home() {
  redirect('/dashboard');
}

// ลบ import Image และโค้ด UI เก่าทิ้ง