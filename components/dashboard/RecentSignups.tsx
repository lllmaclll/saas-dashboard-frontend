// components/dashboard/RecentSignups.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ข้อมูลจำลอง
const recentUsers = [
  { name: 'Olivia Martin', email: 'olivia.martin@email.com', avatar: 'https://i.pravatar.cc/150?img=1' },
  { name: 'Jackson Lee', email: 'jackson.lee@email.com', avatar: 'https://i.pravatar.cc/150?img=2' },
  { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', avatar: 'https://i.pravatar.cc/150?img=3' },
  { name: 'William Kim', email: 'will@email.com', avatar: 'https://i.pravatar.cc/150?img=4' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', avatar: 'https://i.pravatar.cc/150?img=5' },
];

export function RecentSignups() {
  return (
    <Card className="flex flex-col flex-1">
      <CardHeader>
        <CardTitle>Recent Sign-ups</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        {recentUsers.map((user) => (
          <div key={user.email} className="flex items-center gap-4">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.avatar} alt="Avatar" />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}