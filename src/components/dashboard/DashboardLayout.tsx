import { Outlet } from 'react-router-dom';
import { DashboardSidebar } from './DashboardSidebar';

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Fixed width sidebar */}
      <div className="w-64 flex-shrink-0">
        <DashboardSidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1">
        <main className="p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}