// middleware.ts
import { auth } from "@/auth"
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

  // ถ้าพยายามเข้าหน้า Dashboard
  if (isOnDashboard) {
    if (isLoggedIn) {
      // ถ้า Login แล้ว, ให้เข้าไปได้เลย
      return NextResponse.next();
    }
    // ถ้ายังไม่ Login, ให้ Redirect ไปหน้า Login
    return NextResponse.redirect(new URL('/login', nextUrl));
  } 
  // ถ้า Login อยู่แล้ว แต่พยายามเข้าหน้า Login
  else if (isLoggedIn) {
    // ให้ Redirect ไปที่ Dashboard
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  // สำหรับกรณีอื่นๆ (เช่น หน้า Landing Page ในอนาคต) ให้เข้าได้ปกติ
  return NextResponse.next();
});

// ระบุว่า Middleware จะทำงานกับ Route ไหนบ้าง (ยกเว้นไฟล์ static และ API)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};