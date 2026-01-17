import { useState } from 'react';
import { Search, Filter, QrCode, Check, X, Calendar, Clock, Users } from 'lucide-react';
import { toast } from 'sonner';
import { useRestaurantStore } from '../../store/useRestaurantStore';

export function BookingList() {
  const { bookings, updateBookingStatus } = useRestaurantStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.restaurantName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCheckIn = (bookingId: string) => {
    setSelectedBooking(bookingId);
    setShowQRModal(true);
  };

  const handleConfirm = (bookingId: string) => {
    updateBookingStatus(bookingId, 'completed');
    toast.success(`Booking ${bookingId} checked in successfully!`);
  };

  const handleCancel = (bookingId: string) => {
    updateBookingStatus(bookingId, 'cancelled');
    toast.error(`Booking ${bookingId} cancelled!`);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="mb-2 dark:text-white">Booking Management</h2>
        <p className="text-gray-600 dark:text-gray-400">View and manage all reservations</p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-[#3a3a3a] bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-[#3a3a3a] bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Bookings</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-4">
          <p className="text-gray-600 dark:text-gray-400 mb-1">Total Bookings</p>
          <p className="text-blue-600 dark:text-blue-400">{bookings.length}</p>
        </div>
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-4">
          <p className="text-gray-600 dark:text-gray-400 mb-1">Upcoming</p>
          <p className="text-green-600 dark:text-green-400">
            {bookings.filter(b => b.status === 'upcoming').length}
          </p>
        </div>
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-4">
          <p className="text-gray-600 dark:text-gray-400 mb-1">Completed</p>
          <p className="text-blue-600 dark:text-blue-400">
            {bookings.filter(b => b.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-4">
          <p className="text-gray-600 dark:text-gray-400 mb-1">Cancelled</p>
          <p className="text-red-600 dark:text-red-400">
            {bookings.filter(b => b.status === 'cancelled').length}
          </p>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-[#2a2a2a] border-b border-gray-200 dark:border-[#333]">
              <tr>
                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Booking ID</th>
                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Date & Time</th>
                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Table</th>
                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Guests</th>
                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Duration</th>
                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Status</th>
                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-[#2a2a2a]">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-[#2a2a2a]">
                  <td className="px-6 py-4">
                    <p className="dark:text-gray-300">{booking.id}</p>
                    {booking.specialInstructions && (
                      <p className="text-gray-600 dark:text-gray-400 max-w-xs truncate">
                        Note: {booking.specialInstructions}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      <div>
                        <p className="dark:text-gray-300">{booking.date}</p>
                        <p className="text-gray-600 dark:text-gray-400">{booking.time}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="dark:text-gray-300">{booking.tableType}-Seat</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      <span className="dark:text-gray-300">{booking.numberOfPeople}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      <span className="dark:text-gray-300">{booking.duration}h</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full ${
                      booking.status === 'upcoming' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                      booking.status === 'completed' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                      'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {booking.status === 'upcoming' && (
                        <>
                          <button
                            onClick={() => handleCheckIn(booking.id)}
                            className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                            title="Check In"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleCheckIn(booking.id)}
                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="Scan QR"
                          >
                            <QrCode className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleCancel(booking.id)}
                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Cancel"
                          >
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

        {filteredBookings.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No bookings found</p>
          </div>
        )}
      </div>

      {/* QR Check-in Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl max-w-md w-full p-6 shadow-xl border dark:border-[#2a2a2a]">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <QrCode className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 dark:text-white">Scan Customer QR Code</h3>
              <p className="text-gray-600 dark:text-gray-400">Ask the customer to show their booking QR code</p>
            </div>

            <div className="bg-gray-100 dark:bg-[#2a2a2a] rounded-xl p-8 mb-6 text-center">
              <div className="w-48 h-48 bg-white dark:bg-[#1a1a1a] border-4 border-gray-800 dark:border-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Camera view placeholder</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowQRModal(false)}
                className="flex-1 px-6 py-2 border-2 border-gray-300 dark:border-[#3a3a3a] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowQRModal(false);
                  handleConfirm(selectedBooking!);
                }}
                className="flex-1 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Manual Check-in
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}