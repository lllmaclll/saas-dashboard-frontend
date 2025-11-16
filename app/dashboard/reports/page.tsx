// app/dashboard/reports/page.tsx
import { ReportsTable } from '@/components/dashboard/ReportsTable';

export default function ReportsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Full Data Reports</h1>
      <ReportsTable />
    </div>
  );
}