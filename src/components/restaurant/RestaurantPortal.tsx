import { useState } from 'react';
import { RestaurantDashboard } from './RestaurantDashboard';
import { MenuManagement } from './MenuManagement';
import { TableManagement } from './TableManagement';
import { ReservationRules } from './ReservationRules';
import { BookingList } from './BookingList';
import { Analytics } from './Analytics';
import { LayoutDashboard, Menu, Users, Settings, Calendar, BarChart3, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export type RestaurantView = 'dashboard' | 'menu' | 'tables' | 'rules' | 'bookings' | 'analytics';

export function RestaurantPortal() {
  const [currentView, setCurrentView] = useState<RestaurantView>('dashboard');
  const { logout, user } = useAuthStore();

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'menu', label: 'Menu', icon: Menu },
    { id: 'tables', label: 'Tables', icon: Users },
    { id: 'rules', label: 'Rules', icon: Settings },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0f0f0f]">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#1a1a1a] shadow-lg fixed inset-y-0 left-0 border-r border-transparent dark:border-[#2a2a2a] flex flex-col z-50">
        <div className="p-6 border-b border-gray-200 dark:border-[#2a2a2a] flex-shrink-0">
          <h2 className="text-blue-600 dark:text-blue-500 font-[Chivo_Mono]">Restaurant Portal</h2>
          <p className="text-gray-600 dark:text-gray-400">{user?.name || 'Manager'}</p>
        </div>
        
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentView(item.id as RestaurantView)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      currentView === item.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a2a2a]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-[#2a2a2a] flex-shrink-0">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {currentView === 'dashboard' && <RestaurantDashboard onNavigate={setCurrentView} />}
        {currentView === 'menu' && <MenuManagement />}
        {currentView === 'tables' && <TableManagement />}
        {currentView === 'rules' && <ReservationRules />}
        {currentView === 'bookings' && <BookingList />}
        {currentView === 'analytics' && <Analytics />}
      </main>
    </div>
  );
}
