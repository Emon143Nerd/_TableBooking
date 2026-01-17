import { useState } from 'react';
import { Search, Eye, Ban, CheckCircle } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import { toast } from 'sonner@2.0.3';

export function CustomerManagement() {
  const { customers, updateCustomerStatus } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    updateCustomerStatus(id, newStatus);
    toast.success(`Customer ${newStatus === 'active' ? 'activated' : 'suspended'}!`);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="mb-2 dark:text-white">Customer Management</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage user accounts and activity</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-4">
          <p className="text-gray-600 dark:text-gray-400 mb-1">Total Customers</p>
          <p className="text-blue-600 dark:text-blue-400">{customers.length}</p>
        </div>
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-4">
          <p className="text-gray-600 dark:text-gray-400 mb-1">Active</p>
          <p className="text-green-600 dark:text-green-400">
            {customers.filter(c => c.status === 'active').length}
          </p>
        </div>
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-4">
          <p className="text-gray-600 dark:text-gray-400 mb-1">Suspended</p>
          <p className="text-red-600 dark:text-red-400">
            {customers.filter(c => c.status === 'suspended').length}
          </p>
        </div>
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-4">
          <p className="text-gray-600 dark:text-gray-400 mb-1">Avg. Bookings/User</p>
          <p className="text-purple-600 dark:text-purple-400">
            {Math.round(customers.reduce((sum, c) => sum + c.totalBookings, 0) / customers.length)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-[#3a3a3a] bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'suspended'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333]'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-[#2a2a2a] border-b border-gray-200 dark:border-[#333]">
              <tr>
                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">ID</th>
                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Customer</th>
                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Contact</th>
                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Total Bookings</th>
                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Cancelled</th>
                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Joined</th>
                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Status</th>
                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-[#2a2a2a]">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-[#2a2a2a]">
                  <td className="px-6 py-4">
                    <p className="dark:text-gray-300">{customer.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="mb-1 dark:text-white">{customer.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="mb-1 dark:text-gray-300">{customer.email}</p>
                    <p className="text-gray-600 dark:text-gray-400">{customer.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-blue-600 dark:text-blue-400">{customer.totalBookings}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className={customer.cancelledBookings > 5 ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}>
                      {customer.cancelledBookings}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="dark:text-gray-300">{customer.joinedDate}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full ${
                      customer.status === 'active' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleToggleStatus(customer.id, customer.status)}
                        className={`p-2 rounded-lg transition-colors ${
                          customer.status === 'active' 
                            ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20' 
                            : 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
                        }`}
                        title={customer.status === 'active' ? 'Suspend User' : 'Activate User'}
                      >
                        {customer.status === 'active' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
