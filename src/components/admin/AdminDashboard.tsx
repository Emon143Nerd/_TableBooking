import { motion } from 'framer-motion';
import { Store, Users, DollarSign, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { AdminView } from './AdminPortal';
import { useAdminStore } from '../../store/useAdminStore';

interface AdminDashboardProps {
  onNavigate: (view: AdminView) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const { applications, disputes, updateApplicationStatus } = useAdminStore();

  const pendingApprovals = applications.filter(app => app.status === 'pending');
  const activeDisputes = disputes.filter(d => d.status === 'open');

  const handleApprove = (id: string, name: string) => {
    updateApplicationStatus(id, 'approved');
    toast.success(`${name} has been approved!`);
  };

  const handleReject = (id: string, name: string) => {
    updateApplicationStatus(id, 'rejected');
    toast.error(`${name} has been rejected!`);
  };

  const handleReview = (id: string) => {
    toast.info(`Opening dispute ${id}...`);
    onNavigate('disputes');
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="mb-2 dark:text-white">Platform Overview</h2>
        <p className="text-gray-600 dark:text-gray-400">Monitor the entire platform's performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div 
          className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6"
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Store className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-green-600 dark:text-green-400">+5</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-1">Total Restaurants</p>
          <h3 className="text-blue-600 dark:text-blue-400">127</h3>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6"
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-green-600 dark:text-green-400">+234</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-1">Total Users</p>
          <h3 className="text-green-600 dark:text-green-400">12,458</h3>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6"
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <span className="text-green-600 dark:text-green-400">+18%</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-1">Monthly Revenue</p>
          <h3 className="text-yellow-600 dark:text-yellow-400">$89,450</h3>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6"
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-green-600 dark:text-green-400">+25%</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-1">Total Bookings</p>
          <h3 className="text-purple-600 dark:text-purple-400">8,932</h3>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Pending Approvals */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="dark:text-white">Pending Restaurant Approvals</h3>
            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full">{pendingApprovals.length} Pending</span>
          </div>
          
          <div className="space-y-4">
            {pendingApprovals.slice(0, 3).map((restaurant, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg">
                <div>
                  <p className="mb-1 dark:text-white">{restaurant.name}</p>
                  <p className="text-gray-600 dark:text-gray-400">{restaurant.cuisine} • Applied {restaurant.appliedDate}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" onClick={() => handleApprove(restaurant.id, restaurant.name)}>
                    Approve
                  </button>
                  <button className="px-4 py-2 border-2 border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" onClick={() => handleReject(restaurant.id, restaurant.name)}>
                    Reject
                  </button>
                </div>
              </div>
            ))}
            {pendingApprovals.length === 0 && (
              <p className="text-center text-gray-500 py-4">No pending approvals</p>
            )}
          </div>
        </div>

        {/* Active Disputes */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="dark:text-white">Active Disputes</h3>
            <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full">{activeDisputes.length} Active</span>
          </div>
          
          <div className="space-y-4">
            {activeDisputes.slice(0, 3).map((dispute) => (
              <div key={dispute.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg">
                <div>
                  <p className="mb-1 dark:text-white">{dispute.type}</p>
                  <p className="text-gray-600 dark:text-gray-400">{dispute.restaurant} vs {dispute.customer}</p>
                  <p className="text-gray-500 dark:text-gray-500">#{dispute.id}</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={() => handleReview(dispute.id)}>
                  Review
                </button>
              </div>
            ))}
            {activeDisputes.length === 0 && (
              <p className="text-center text-gray-500 py-4">No active disputes</p>
            )}
          </div>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6">
        <h3 className="mb-6 dark:text-white">Platform Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 dark:text-gray-300">Active Restaurants</span>
              <span className="text-green-600 dark:text-green-400">124/127</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-[#3a3a3a] rounded-full h-3">
              <div className="bg-green-600 h-3 rounded-full" style={{ width: '97.6%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 dark:text-gray-300">User Satisfaction</span>
              <span className="text-blue-600 dark:text-blue-400">4.6/5.0</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-[#3a3a3a] rounded-full h-3">
              <div className="bg-blue-600 h-3 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 dark:text-gray-300">System Uptime</span>
              <span className="text-purple-600 dark:text-purple-400">99.9%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-[#3a3a3a] rounded-full h-3">
              <div className="bg-purple-600 h-3 rounded-full" style={{ width: '99.9%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <button onClick={() => onNavigate('restaurants')} className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6 hover:shadow-lg dark:hover:border-blue-500/30 transition-all text-left group">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Store className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="dark:text-white">Approve Restaurants</h4>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Review and approve pending restaurant applications</p>
        </button>

        <button onClick={() => onNavigate('disputes')} className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6 hover:shadow-lg dark:hover:border-red-500/30 transition-all text-left group">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h4 className="dark:text-white">Resolve Disputes</h4>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Handle customer and restaurant disputes</p>
        </button>

        <button onClick={() => onNavigate('analytics')} className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6 hover:shadow-lg dark:hover:border-green-500/30 transition-all text-left group">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="dark:text-white">View Analytics</h4>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Access platform-wide analytics and reports</p>
        </button>
      </div>
    </div>
  );
}