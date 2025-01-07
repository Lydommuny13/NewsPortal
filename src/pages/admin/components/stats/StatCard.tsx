interface StatCardProps {
  label: string;
  value: number;
  subtitle?: string;
}

export function StatCard({ label, value, subtitle }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-3xl font-bold mt-2">{value.toLocaleString()}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}