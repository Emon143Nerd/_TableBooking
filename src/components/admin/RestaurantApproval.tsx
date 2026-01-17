import { useState } from 'react';
import { Search, Check, X, Eye, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useAdminStore, RestaurantApplication } from '../../store/useAdminStore';

export function RestaurantApproval() {
  const { applications, deletionRequests, updateApplicationStatus, addApplication, updateDeletionStatus } = useAdminStore();
  
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedApp, setSelectedApp] = useState<RestaurantApplication | null>(null);
  const [selectedDeletion, setSelectedDeletion] = useState<any | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'applications' | 'deletions'>('applications');

  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    cuisine: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    openingHours: '',
    priceRange: '$$',
  });

  const handleApprove = (id: string) => {
    updateApplicationStatus(id, 'approved');
    toast.success('Restaurant application approved!');
    setSelectedApp(null);
  };

  const handleReject = (id: string) => {
    updateApplicationStatus(id, 'rejected');
    toast.error('Restaurant application rejected!');
    setSelectedApp(null);
  };

  const handleApproveDeletion = (id: string) => {
    updateDeletionStatus(id, 'approved');
    toast.success('Restaurant deletion approved!');
    setSelectedDeletion(null);
  };

  const handleRejectDeletion = (id: string) => {
    updateDeletionStatus(id, 'rejected');
    toast.error('Restaurant deletion rejected!');
    setSelectedDeletion(null);
  };

  const handleAddRestaurant = () => {
    const newApp: RestaurantApplication = {
      id: `R${(applications.length + 10).toString().padStart(3, '0')}`,
      ...newRestaurant,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'approved', // Admin added restaurants are auto-approved
      documents: ['Admin Added'],
    };
    addApplication(newApp);
    setShowAddModal(false);
    setNewRestaurant({
      name: '',
      cuisine: '',
      address: '',
      phone: '',
      email: '',
      description: '',
      openingHours: '',
      priceRange: '$$',
    });
    toast.success('Restaurant added successfully!');
  };

  const filteredApps = applications.filter(app => 
    filterStatus === 'all' || app.status === filterStatus
  );

  const filteredDeletions = deletionRequests.filter(req => 
    filterStatus === 'all' || req.status === filterStatus
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="mb-2 dark:text-white">Restaurant Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage restaurant applications and deletion requests</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Restaurant
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-6 py-3 rounded-lg transition-all ${
            activeTab === 'applications'
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] border border-gray-200 dark:border-[#2a2a2a]'
          }`}
        >
          Applications ({applications.filter(a => a.status === 'pending').length} pending)
        </button>
        <button
          onClick={() => setActiveTab('deletions')}
          className={`px-6 py-3 rounded-lg transition-all ${
            activeTab === 'deletions'
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] border border-gray-200 dark:border-[#2a2a2a]'
          }`}
        >
          Deletion Requests ({deletionRequests.filter(d => d.status === 'pending').length} pending)
        </button>
      </div>

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-4">
              <p className="text-gray-600 dark:text-gray-400 mb-1">Total Applications</p>
              <p className="text-blue-600 dark:text-blue-400">{applications.length}</p>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-4">
              <p className="text-gray-600 dark:text-gray-400 mb-1">Pending</p>
              <p className="text-yellow-600 dark:text-yellow-400">
                {applications.filter(a => a.status === 'pending').length}
              </p>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-4">
              <p className="text-gray-600 dark:text-gray-400 mb-1">Approved</p>
              <p className="text-green-600 dark:text-green-400">
                {applications.filter(a => a.status === 'approved').length}
              </p>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-4">
              <p className="text-gray-600 dark:text-gray-400 mb-1">Rejected</p>
              <p className="text-red-600 dark:text-red-400">
                {applications.filter(a => a.status === 'rejected').length}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6 mb-6">
            <div className="flex gap-4">
              {['all', 'pending', 'approved', 'rejected'].map((status) => (
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

          {/* Applications Table */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-[#2a2a2a] border-b border-gray-200 dark:border-[#333]">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">ID</th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Restaurant</th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Contact</th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Applied Date</th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Documents</th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Status</th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-[#2a2a2a]">
                  {filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-[#2a2a2a]">
                      <td className="px-6 py-4">
                        <p className="dark:text-gray-300">{app.id}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="mb-1 dark:text-white">{app.name}</p>
                        <p className="text-gray-600 dark:text-gray-400">{app.cuisine}</p>
                        <p className="text-gray-500 dark:text-gray-500">{app.address}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="mb-1 dark:text-gray-300">{app.phone}</p>
                        <p className="text-gray-600 dark:text-gray-400">{app.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="dark:text-gray-300">{app.appliedDate}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-700 dark:text-gray-300">{app.documents.length} files</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full ${
                          app.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                          app.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                          'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        }`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setSelectedApp(app)}
                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {app.status === 'pending' && (
                            <>
                              <button className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors" onClick={() => handleApprove(app.id)}>
                                <Check className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" onClick={() => handleReject(app.id)}>
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Deletions Tab */}
      {activeTab === 'deletions' && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-4">
              <p className="text-gray-600 dark:text-gray-400 mb-1">Total Requests</p>
              <p className="text-blue-600 dark:text-blue-400">{deletionRequests.length}</p>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-4">
              <p className="text-gray-600 dark:text-gray-400 mb-1">Pending</p>
              <p className="text-yellow-600 dark:text-yellow-400">
                {deletionRequests.filter(d => d.status === 'pending').length}
              </p>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-4">
              <p className="text-gray-600 dark:text-gray-400 mb-1">Approved</p>
              <p className="text-green-600 dark:text-green-400">
                {deletionRequests.filter(d => d.status === 'approved').length}
              </p>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-4">
              <p className="text-gray-600 dark:text-gray-400 mb-1">Rejected</p>
              <p className="text-red-600 dark:text-red-400">
                {deletionRequests.filter(d => d.status === 'rejected').length}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6 mb-6">
            <div className="flex gap-4">
              {['all', 'pending', 'approved', 'rejected'].map((status) => (
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

          {/* Deletion Requests Table */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-[#2a2a2a] border-b border-gray-200 dark:border-[#333]">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Request ID</th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Restaurant</th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Owner</th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Request Date</th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Reason</th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Status</th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-[#2a2a2a]">
                  {filteredDeletions.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50 dark:hover:bg-[#2a2a2a]">
                      <td className="px-6 py-4">
                        <p className="dark:text-gray-300">{req.id}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="mb-1 dark:text-white">{req.restaurantName}</p>
                        <p className="text-gray-500 dark:text-gray-500 text-sm">ID: {req.restaurantId}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="dark:text-gray-300">{req.ownerName}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="dark:text-gray-300">{req.requestDate}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-700 dark:text-gray-300 max-w-xs truncate">{req.reason}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full ${
                          req.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                          req.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                          'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        }`}>
                          {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setSelectedDeletion(req)}
                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {req.status === 'pending' && (
                            <>
                              <button className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors" onClick={() => handleApproveDeletion(req.id)}>
                                <Check className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" onClick={() => handleRejectDeletion(req.id)}>
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Add Restaurant Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border dark:border-[#2a2a2a]">
            <div className="border-b border-gray-200 dark:border-[#2a2a2a] px-6 py-4 flex items-center justify-between">
              <h3 className="dark:text-white">Add New Restaurant</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Restaurant Name</label>
                  <input
                    type="text"
                    value={newRestaurant.name}
                    onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
                    placeholder="e.g., Handi Restaurant"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-[#3a3a3a] bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Cuisine Type</label>
                  <input
                    type="text"
                    value={newRestaurant.cuisine}
                    onChange={(e) => setNewRestaurant({ ...newRestaurant, cuisine: e.target.value })}
                    placeholder="e.g., Bangladeshi"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-[#3a3a3a] bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Address</label>
                <input
                  type="text"
                  value={newRestaurant.address}
                  onChange={(e) => setNewRestaurant({ ...newRestaurant, address: e.target.value })}
                  placeholder="e.g., 123 Gulshan Avenue, Dhaka"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-[#3a3a3a] bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                  <input
                    type="text"
                    value={newRestaurant.phone}
                    onChange={(e) => setNewRestaurant({ ...newRestaurant, phone: e.target.value })}
                    placeholder="+880 1712-345678"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-[#3a3a3a] bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={newRestaurant.email}
                    onChange={(e) => setNewRestaurant({ ...newRestaurant, email: e.target.value })}
                    placeholder="contact@restaurant.com"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-[#3a3a3a] bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={newRestaurant.description}
                  onChange={(e) => setNewRestaurant({ ...newRestaurant, description: e.target.value })}
                  placeholder="Brief description of the restaurant"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-[#3a3a3a] bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Opening Hours</label>
                  <input
                    type="text"
                    value={newRestaurant.openingHours}
                    onChange={(e) => setNewRestaurant({ ...newRestaurant, openingHours: e.target.value })}
                    placeholder="11:00 AM - 11:00 PM"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-[#3a3a3a] bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Price Range</label>
                  <select
                    value={newRestaurant.priceRange}
                    onChange={(e) => setNewRestaurant({ ...newRestaurant, priceRange: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-[#3a3a3a] bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="$">$ - Budget Friendly</option>
                    <option value="$$">$$ - Moderate</option>
                    <option value="$$$">$$$ - Premium</option>
                    <option value="$$$$">$$$$ - Fine Dining</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-[#2a2a2a] px-6 py-4 flex gap-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-2 border-2 border-gray-300 dark:border-[#3a3a3a] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRestaurant}
                disabled={!newRestaurant.name || !newRestaurant.cuisine || !newRestaurant.address || !newRestaurant.phone || !newRestaurant.email}
                className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
              >
                Add Restaurant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border dark:border-[#2a2a2a]">
            <div className="border-b border-gray-200 dark:border-[#2a2a2a] px-6 py-4 flex items-center justify-between">
              <h3 className="dark:text-white">Application Details</h3>
              <button onClick={() => setSelectedApp(null)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="mb-4 dark:text-white">Restaurant Information</h4>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg p-4">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Name</p>
                    <p className="dark:text-gray-200">{selectedApp.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Cuisine Type</p>
                    <p className="dark:text-gray-200">{selectedApp.cuisine}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Address</p>
                    <p className="dark:text-gray-200">{selectedApp.address}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Phone</p>
                    <p className="dark:text-gray-200">{selectedApp.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Email</p>
                    <p className="dark:text-gray-200">{selectedApp.email}</p>
                  </div>
                  {selectedApp.description && (
                    <div className="col-span-2">
                      <p className="text-gray-600 dark:text-gray-400 mb-1">Description</p>
                      <p className="dark:text-gray-200">{selectedApp.description}</p>
                    </div>
                  )}
                  {selectedApp.openingHours && (
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">Opening Hours</p>
                      <p className="dark:text-gray-200">{selectedApp.openingHours}</p>
                    </div>
                  )}
                  {selectedApp.priceRange && (
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">Price Range</p>
                      <p className="dark:text-gray-200">{selectedApp.priceRange}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="mb-4 dark:text-white">Submitted Documents</h4>
                <div className="space-y-2">
                  {selectedApp.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg">
                      <span className="dark:text-gray-200">{doc}</span>
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700">View</button>
                    </div>
                  ))}
                </div>
              </div>

              {selectedApp.status === 'pending' && (
                <div className="flex gap-4">
                  <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" onClick={() => handleApprove(selectedApp.id)}>
                    Approve Application
                  </button>
                  <button className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" onClick={() => handleReject(selectedApp.id)}>
                    Reject Application
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Deletion Detail Modal */}
      {selectedDeletion && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border dark:border-[#2a2a2a]">
            <div className="border-b border-gray-200 dark:border-[#2a2a2a] px-6 py-4 flex items-center justify-between">
              <h3 className="dark:text-white">Deletion Request Details</h3>
              <button onClick={() => setSelectedDeletion(null)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="mb-4 dark:text-white">Request Information</h4>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg p-4">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Request ID</p>
                    <p className="dark:text-gray-200">{selectedDeletion.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Request Date</p>
                    <p className="dark:text-gray-200">{selectedDeletion.requestDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Restaurant ID</p>
                    <p className="dark:text-gray-200">{selectedDeletion.restaurantId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Restaurant Name</p>
                    <p className="dark:text-gray-200">{selectedDeletion.restaurantName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Owner Name</p>
                    <p className="dark:text-gray-200">{selectedDeletion.ownerName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Status</p>
                    <span className={`px-3 py-1 rounded-full ${
                      selectedDeletion.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                      selectedDeletion.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                      'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      {selectedDeletion.status.charAt(0).toUpperCase() + selectedDeletion.status.slice(1)}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Reason for Deletion</p>
                    <p className="dark:text-gray-200">{selectedDeletion.reason}</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-700 dark:text-red-400">
                  ⚠️ Warning: Approving this request will permanently remove the restaurant from the platform. 
                  All associated bookings, reviews, and data will be archived.
                </p>
              </div>

              {selectedDeletion.status === 'pending' && (
                <div className="flex gap-4">
                  <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" onClick={() => handleApproveDeletion(selectedDeletion.id)}>
                    Approve Deletion
                  </button>
                  <button className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" onClick={() => handleRejectDeletion(selectedDeletion.id)}>
                    Reject Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}