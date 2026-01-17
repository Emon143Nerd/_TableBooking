import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useAdminStore, Dispute } from '../../store/useAdminStore';
import { toast } from 'sonner@2.0.3';

export function DisputeResolution() {
  const { disputes, updateDisputeStatus } = useAdminStore();
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [resolutionAction, setResolutionAction] = useState<'resolved' | 'rejected' | null>(null);

  const handleResolve = (id: string, action: 'resolved' | 'rejected') => {
    updateDisputeStatus(id, action);
    toast.success(`Dispute marked as ${action}!`);
    setSelectedDispute(null);
    setResolutionAction(null);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="mb-2 dark:text-white">Dispute Resolution</h2>
        <p className="text-gray-600 dark:text-gray-400">Handle and resolve customer-restaurant disputes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-4">
          <p className="text-gray-600 dark:text-gray-400 mb-1">Total Disputes</p>
          <p className="text-blue-600 dark:text-blue-400">{disputes.length}</p>
        </div>
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-4">
          <p className="text-gray-600 dark:text-gray-400 mb-1">Open</p>
          <p className="text-yellow-600 dark:text-yellow-400">
            {disputes.filter(d => d.status === 'open').length}
          </p>
        </div>
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-4">
          <p className="text-gray-600 dark:text-gray-400 mb-1">Resolved</p>
          <p className="text-green-600 dark:text-green-400">
            {disputes.filter(d => d.status === 'resolved').length}
          </p>
        </div>
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-4">
          <p className="text-gray-600 dark:text-gray-400 mb-1">Rejected</p>
          <p className="text-red-600 dark:text-red-400">
            {disputes.filter(d => d.status === 'rejected').length}
          </p>
        </div>
      </div>

      {/* Disputes List */}
      <div className="space-y-4">
        {disputes.map((dispute) => (
          <div key={dispute.id} className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  dispute.status === 'open' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                  dispute.status === 'resolved' ? 'bg-green-100 dark:bg-green-900/30' :
                  'bg-red-100 dark:bg-red-900/30'
                }`}>
                  {dispute.status === 'open' ? <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" /> :
                   dispute.status === 'resolved' ? <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" /> :
                   <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="dark:text-white">{dispute.type}</h3>
                    <span className={`px-3 py-1 rounded-full ${
                      dispute.status === 'open' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                      dispute.status === 'resolved' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                      'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      {dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    #{dispute.id} • {dispute.date}
                  </p>
                  <div className="flex items-center gap-4 mb-3">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Restaurant</p>
                      <p className="dark:text-white">{dispute.restaurant}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Customer</p>
                      <p className="dark:text-white">{dispute.customer}</p>
                    </div>
                    {dispute.amount && (
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Disputed Amount</p>
                        <p className="text-red-600 dark:text-red-400">${dispute.amount}</p>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg p-3">
                    {dispute.description}
                  </p>
                </div>
              </div>
            </div>

            {dispute.status === 'open' && (
              <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-[#2a2a2a]">
                <button
                  onClick={() => setSelectedDispute(dispute)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Review & Resolve
                </button>
                <button className="px-6 py-2 border-2 border-gray-300 dark:border-[#3a3a3a] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors" onClick={() => toast.info('Contact details sent to email')}>
                  Contact Parties
                </button>
                <button 
                  className="px-6 py-2 border-2 border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  onClick={() => handleResolve(dispute.id, 'rejected')}
                >
                  Reject Dispute
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Resolution Modal */}
      {selectedDispute && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border dark:border-[#2a2a2a]">
            <div className="border-b border-gray-200 dark:border-[#2a2a2a] px-6 py-4 flex items-center justify-between">
              <h3 className="dark:text-white">Resolve Dispute</h3>
              <button onClick={() => setSelectedDispute(null)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="mb-4 dark:text-white">Dispute Details</h4>
                <div className="bg-gray-50 dark:bg-[#2a2a2a] rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Dispute ID</span>
                    <span className="dark:text-white">{selectedDispute.id}</span>
                  </div>
                  {/* ... (rest of details) */}
                  <div className="pt-3 border-t border-gray-200 dark:border-[#333]">
                    <p className="text-gray-600 dark:text-gray-400 mb-2">Description</p>
                    <p className="text-gray-800 dark:text-gray-200">{selectedDispute.description}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-4 dark:text-white">Resolution Action</h4>
                <div className="space-y-3">
                  {/* Action Selection */}
                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 dark:border-[#3a3a3a] rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2a2a2a]">
                    <input 
                      type="radio" 
                      name="resolution" 
                      className="w-4 h-4" 
                      onChange={() => setResolutionAction('resolved')}
                    />
                    <div>
                      <p className="dark:text-white">Resolve (Refund/Credit)</p>
                      <p className="text-gray-600 dark:text-gray-400">Issue refund or credit to customer</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 dark:border-[#3a3a3a] rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2a2a2a]">
                    <input 
                      type="radio" 
                      name="resolution" 
                      className="w-4 h-4" 
                      onChange={() => setResolutionAction('rejected')}
                    />
                    <div>
                      <p className="dark:text-white">Reject Dispute</p>
                      <p className="text-gray-600 dark:text-gray-400">Decision in favor of restaurant</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedDispute(null)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-[#3a3a3a] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (resolutionAction) {
                      handleResolve(selectedDispute.id, resolutionAction);
                    } else {
                      toast.error('Please select a resolution action');
                    }
                  }}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Confirm Resolution
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}