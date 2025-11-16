// components/dashboard/user-button.tsx
import { auth, signOut } from '@/auth'; // 1. Import auth และ signOut
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export async function UserButton() {
  // 2. ดึงข้อมูล session บน Server
  const session = await auth();

  // 3. ถ้าไม่มี session (ไม่ควรจะเกิดขึ้นเพราะมี Middleware) ให้ return null
  if (!session?.user) return null;

  // 4. เตรียมข้อมูลสำหรับ Fallback Avatar
  const initials = session.user.name?.charAt(0).toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            {/* 5. ใช้รูปภาพจาก session */}
            <AvatarImage 
              src={session.user.image ?? ''} 
              alt={session.user.name ?? 'User Avatar'} 
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            {/* 6. แสดงชื่อและ email จาก session */}
            <p className="text-sm font-medium leading-none">{session.user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* 7. สร้างฟอร์มสำหรับปุ่ม Sign Out */}
        <form
          action={async () => {
            'use server'; // นี่คือ Server Action
            await signOut();
          }}
        >
          <button type="submit" className="w-full text-left">
            <DropdownMenuItem>
              Sign out
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}