// components/auth/login-form.tsx
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useActionState } from 'react'; 
// 2. 'useFormStatus' ยังคง import จาก 'react-dom' เหมือนเดิม
import { useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/utilities/actions'; // เราจะสร้างไฟล์นี้ต่อไป

export function LoginForm() {
  // useFormState ใช้สำหรับจัดการ state ของ Form ที่ทำงานกับ Server Action
  const [errorMessage, dispatch, isPending] = useActionState(authenticate, undefined);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatch} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="test@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="123456" required />
          </div>
          
          {/* แสดง Error Message ถ้ามี */}
          {errorMessage && (
            <div className="flex items-center justify-center">
              <p className="text-sm text-red-500">{errorMessage}</p>
            </div>
          )}
          
          <LoginButton />
        </form>
      </CardContent>
    </Card>
  );
}

// Component แยกสำหรับปุ่ม เพื่อใช้ useFormStatus
function LoginButton() {
  // 4. [สำคัญ] useFormStatus จะยังทำงานได้เหมือนเดิม
  // ถึงแม้ useActionState จะคืนค่า isPending มาให้ แต่ useFormStatus
  // ถูกออกแบบมาให้ทำงานกับ Form โดยตรงและยืดหยุ่นกว่า
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" aria-disabled={pending}>
      {pending ? 'Logging in...' : 'Log in'}
    </Button>
  );
}