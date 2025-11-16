// app/dashboard/settings/page.tsx
import { auth } from '@/auth';
import { SettingsForm } from '@/components/dashboard/SettingsForm';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default async function SettingsPage() {
  // ดึงข้อมูล session บน Server
  const session = await auth();

  // เตรียมค่าเริ่มต้น
  const initialUsername = session?.user?.name ?? '';
  const initialEmail = session?.user?.email ?? '';

  return (
    <div className="grid gap-6">
      <div>
        <CardHeader className="p-0">
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
      </div>
      {/* Render Client Component แล้วส่งค่าเริ่มต้นเข้าไป */}
      <SettingsForm 
        initialUsername={initialUsername}
        initialEmail={initialEmail} 
      />
    </div>
  );
}