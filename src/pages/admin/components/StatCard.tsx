interface StatCardProps {
  label: string;
  value: number;
  subtitle?: string;
}

export function StatCard({ label, value, subtitle }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
        {value.toLocaleString()}
      </p>
      {subtitle && (
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
}