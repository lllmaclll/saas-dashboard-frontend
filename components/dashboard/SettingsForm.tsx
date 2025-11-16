// components/dashboard/settings-form.tsx
'use client';

import { useActionState } from 'react';
import { updateUserProfile } from '@/lib/utilities/actions';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';

// รับค่าเริ่มต้นมาเป็น prop
interface SettingsFormProps {
  initialUsername: string;
  initialEmail: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending}>
      {pending ? 'Saving...' : 'Save Changes'}
    </Button>
  );
}

export function SettingsForm({ initialUsername, initialEmail }: SettingsFormProps) {
  const [state, formAction] = useActionState(updateUserProfile, undefined);

  return (
    <Card>
      <form action={formAction}>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            {/* ใส่ค่าเริ่มต้นใน defaultValue */}
            <Input id="username" name="username" defaultValue={initialUsername} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            {/* ทำให้ช่อง email อ่านได้อย่างเดียว */}
            <Input id="email" name="email" type="email" value={initialEmail} readOnly disabled />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4 flex justify-between items-center">
          <SubmitButton />
          {state?.message && <p className="text-sm text-muted-foreground">{state.message}</p>}
        </CardFooter>
      </form>
    </Card>
  );
}