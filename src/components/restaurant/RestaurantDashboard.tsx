import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, XCircle, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { RestaurantView } from './RestaurantPortal';
import { toast } from 'sonner';
import { useRestaurantStore } from '../../store/useRestaurantStore';

interface RestaurantDashboardProps {
  onNavigate: (view: RestaurantView) => void;
}

export function RestaurantDashboard({ onNavigate }: RestaurantDashboardProps) {
  // Use store state
  const { bookings, updateBookingStatus } = useRestaurantStore();

  const todayBookings = bookings.filter(b => b.status === 'upcoming');
  const totalBookings = bookings.length;
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;
  const totalRevenue = bookings.reduce((sum, b) => sum + b.price, 0);

  const todaySchedule = todayBookings.slice(0, 5);

  const handleCheckIn = (bookingId: string) => {
    updateBookingStatus(bookingId, 'completed');
    toast.success(`Customer checked in for booking ${bookingId}!`);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="mb-2 dark:text-white">Dashboard Overview</h2>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div 
          className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6"
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-green-600 dark:text-green-400">+12%</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-1">Total Bookings</p>
          <h3 className="text-blue-600 dark:text-blue-400">{totalBookings}</h3>
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
            <span className="text-green-600 dark:text-green-400">+8%</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-1">Today's Reservations</p>
          <h3 className="text-green-600 dark:text-green-400">{todayBookings.length}</h3>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6"
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <span className="text-red-600 dark:text-red-400">-3%</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-1">Cancellations</p>
          <h3 className="text-red-600 dark:text-red-400">{cancelledBookings}</h3>
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
            <span className="text-green-600 dark:text-green-400">+15%</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-1">Revenue (This Month)</p>
          <h3 className="text-yellow-600 dark:text-yellow-400">${totalRevenue}</h3>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="dark:text-white">Today's Schedule</h3>
            <button 
              onClick={() => onNavigate('bookings')}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              View All
            </button>
          </div>

          {todaySchedule.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No bookings scheduled for today</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todaySchedule.map((booking) => (
                <motion.div 
                  key={booking.id} 
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg hover:bg-gray-100 dark:hover:bg-[#333] transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-1 dark:text-white">Booking #{booking.id}</p>
                    <p className="text-gray-600 dark:text-gray-400">{booking.time} • {booking.numberOfPeople} guests</p>
                  </div>
                  <motion.button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCheckIn(booking.id)}
                  >
                    Check In
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Real-time Table Occupancy */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6">
          <h3 className="mb-6 dark:text-white">Real-time Table Occupancy</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 dark:text-gray-300">2-Seat Tables</span>
                <span className="text-gray-600 dark:text-gray-400">5/8 occupied</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-[#3a3a3a] rounded-full h-3">
                <div className="bg-blue-600 dark:bg-blue-500 h-3 rounded-full" style={{ width: '62.5%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 dark:text-gray-300">3-Seat Tables</span>
                <span className="text-gray-600 dark:text-gray-400">3/6 occupied</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-[#3a3a3a] rounded-full h-3">
                <div className="bg-green-600 dark:bg-green-500 h-3 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 dark:text-gray-300">4-Seat Tables</span>
                <span className="text-gray-600 dark:text-gray-400">7/10 occupied</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-[#3a3a3a] rounded-full h-3">
                <div className="bg-yellow-600 dark:bg-yellow-500 h-3 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => onNavigate('tables')}
            className="w-full mt-6 px-6 py-2 border-2 border-gray-300 dark:border-[#3a3a3a] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
          >
            Manage Tables
          </button>
        </div>
      </div>

      {/* Peak Hours */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6 mt-8">
        <h3 className="mb-6 dark:text-white">Peak Hours Today</h3>
        <div className="grid grid-cols-7 gap-2">
          {['12PM', '1PM', '2PM', '6PM', '7PM', '8PM', '9PM'].map((hour, index) => {
            const heights = [40, 60, 45, 70, 85, 90, 75];
            return (
              <div key={hour} className="text-center">
                <div className="h-32 flex items-end mb-2">
                  <div 
                    className="w-full bg-blue-600 dark:bg-blue-500 rounded-t"
                    style={{ height: `${heights[index]}%` }}
                  ></div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{hour}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
