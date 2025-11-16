// app/dashboard/layout.tsx (Server Component)
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { UserButton } from "@/components/dashboard/UserButton";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell userButton={<UserButton />}>
      {children}
    </DashboardShell>
  );
}