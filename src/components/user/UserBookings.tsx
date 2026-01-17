import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Users, MapPin, Star, XCircle, CheckCircle, QrCode, Download } from 'lucide-react';
import { Booking } from '../../types';
import { toast } from 'sonner@2.0.3';
import { Footer } from './Footer';

interface UserBookingsProps {
  onBack: () => void;
}

const mockBookings: (Booking & { restaurantImage: string; cuisine: string })[] = [
  {
    id: 'b1',
    restaurantId: 'r1',
    restaurantName: 'The Golden Spoon',
    restaurantImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
    cuisine: 'French Fine Dining',
    userId: 'u1',
    date: '2024-11-28',
    time: '19:00',
    numberOfPeople: 4,
    tableType: 4,
    duration: 2,
    status: 'confirmed',
    price: 50,
  },
  {
    id: 'b2',
    restaurantId: 'r2',
    restaurantName: 'Sushi Master',
    restaurantImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
    cuisine: 'Japanese Cuisine',
    userId: 'u1',
    date: '2024-11-26',
    time: '20:00',
    numberOfPeople: 2,
    tableType: 2,
    duration: 1.5,
    status: 'completed',
    price: 40,
  },
  {
    id: 'b3',
    restaurantId: 'r3',
    restaurantName: 'Italian Trattoria',
    restaurantImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400',
    cuisine: 'Italian',
    userId: 'u1',
    date: '2024-11-20',
    time: '18:30',
    numberOfPeople: 3,
    tableType: 3,
    duration: 2,
    status: 'cancelled',
    price: 45,
  },
  {
    id: 'b4',
    restaurantId: 'r4',
    restaurantName: 'Steak House Prime',
    restaurantImage: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400',
    cuisine: 'American Steakhouse',
    userId: 'u1',
    date: '2024-12-05',
    time: '19:30',
    numberOfPeople: 2,
    tableType: 2,
    duration: 2,
    status: 'pending',
    price: 60,
  },
];

export function UserBookings({ onBack }: UserBookingsProps) {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');
  const [showQR, setShowQR] = useState<string | null>(null);

  const filteredBookings = mockBookings.filter((booking) => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return booking.status === 'confirmed' || booking.status === 'pending';
    if (filter === 'completed') return booking.status === 'completed';
    if (filter === 'cancelled') return booking.status === 'cancelled';
    return true;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { 
          bg: 'bg-[#d4af37]/10', 
          text: 'text-[#d4af37]', 
          border: 'border-[#d4af37]/30',
          icon: CheckCircle 
        };
      case 'pending':
        return { 
          bg: 'bg-blue-500/10', 
          text: 'text-blue-400', 
          border: 'border-blue-500/30',
          icon: Clock 
        };
      case 'completed':
        return { 
          bg: 'bg-green-500/10', 
          text: 'text-green-400', 
          border: 'border-green-500/30',
          icon: CheckCircle 
        };
      case 'cancelled':
        return { 
          bg: 'bg-red-500/10', 
          text: 'text-red-400', 
          border: 'border-red-500/30',
          icon: XCircle 
        };
      default:
        return { 
          bg: 'bg-gray-500/10', 
          text: 'text-gray-400', 
          border: 'border-gray-500/30',
          icon: Clock 
        };
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    toast.success('Booking cancelled successfully');
  };

  const handleDownloadReceipt = (bookingId: string) => {
    toast.success('Receipt downloaded');
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Header */}
      <header className="bg-[#1a1a1a]/90 backdrop-blur-xl shadow-lg border-b border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-all border border-transparent hover:border-[#d4af37]/20"
            >
              <ArrowLeft className="w-5 h-5 text-[#d4af37]" />
            </button>
            <div>
              <h2 className="text-white">My Bookings</h2>
              <p className="text-gray-400">View and manage your reservations</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {[
            { key: 'all', label: 'All Bookings', count: mockBookings.length },
            { key: 'upcoming', label: 'Upcoming', count: mockBookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length },
            { key: 'completed', label: 'Completed', count: mockBookings.filter(b => b.status === 'completed').length },
            { key: 'cancelled', label: 'Cancelled', count: mockBookings.filter(b => b.status === 'cancelled').length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`px-6 py-3 rounded-xl transition-all whitespace-nowrap font-medium ${
                filter === tab.key
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f] shadow-lg shadow-[#d4af37]/20'
                  : 'bg-[#1a1a1a]/80 text-gray-300 hover:bg-[#2a2a2a] border border-[#2a2a2a] hover:border-[#d4af37]/20'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-sm ${
                filter === tab.key 
                  ? 'bg-[#0f0f0f]/20' 
                  : 'bg-[#2a2a2a]'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#2a2a2a] p-16 text-center">
            <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-white mb-2">No bookings found</h3>
            <p className="text-gray-400">You don't have any {filter !== 'all' ? filter : ''} bookings yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => {
              const statusConfig = getStatusConfig(booking.status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <div
                  key={booking.id}
                  className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all overflow-hidden group"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Restaurant Image */}
                    <div className="md:w-64 h-48 md:h-auto relative overflow-hidden">
                      <img 
                        src={booking.restaurantImage} 
                        alt={booking.restaurantName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a1a1a]/80"></div>
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-white mb-1">{booking.restaurantName}</h4>
                          <p className="text-gray-400">{booking.cuisine}</p>
                        </div>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
                          <StatusIcon className="w-4 h-4" />
                          <span className="capitalize">{booking.status}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#d4af37]/10 rounded-lg flex items-center justify-center border border-[#d4af37]/20">
                            <Calendar className="w-5 h-5 text-[#d4af37]" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Date</p>
                            <p className="text-white">{new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#d4af37]/10 rounded-lg flex items-center justify-center border border-[#d4af37]/20">
                            <Clock className="w-5 h-5 text-[#d4af37]" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Time</p>
                            <p className="text-white">{booking.time}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#d4af37]/10 rounded-lg flex items-center justify-center border border-[#d4af37]/20">
                            <Users className="w-5 h-5 text-[#d4af37]" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Guests</p>
                            <p className="text-white">{booking.numberOfPeople}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#d4af37]/10 rounded-lg flex items-center justify-center border border-[#d4af37]/20">
                            <span className="text-[#d4af37]">TK</span>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Total</p>
                            <p className="text-white">TK {booking.price}</p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        {booking.status === 'confirmed' && (
                          <>
                            <button
                              onClick={() => setShowQR(booking.id)}
                              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f] rounded-lg hover:shadow-lg hover:shadow-[#d4af37]/30 transition-all font-medium"
                            >
                              <QrCode className="w-4 h-4" />
                              Show QR Code
                            </button>
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="px-6 py-2.5 bg-[#2a2a2a] text-gray-300 rounded-lg hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all border border-[#3a3a3a] font-medium"
                            >
                              Cancel Booking
                            </button>
                          </>
                        )}
                        
                        {booking.status === 'completed' && (
                          <>
                            <button
                              onClick={() => handleDownloadReceipt(booking.id)}
                              className="flex items-center gap-2 px-6 py-2.5 bg-[#2a2a2a] text-gray-300 rounded-lg hover:bg-[#3a3a3a] hover:border-[#d4af37]/20 transition-all border border-[#3a3a3a] font-medium"
                            >
                              <Download className="w-4 h-4" />
                              Download Receipt
                            </button>
                            <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f] rounded-lg hover:shadow-lg hover:shadow-[#d4af37]/30 transition-all font-medium">
                              <Star className="w-4 h-4" />
                              Leave Review
                            </button>
                          </>
                        )}
                        
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="px-6 py-2.5 bg-[#2a2a2a] text-gray-300 rounded-lg hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all border border-[#3a3a3a] font-medium"
                          >
                            Cancel Request
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] backdrop-blur-xl rounded-2xl max-w-md w-full shadow-2xl border border-[#d4af37]/20 p-8">
            <div className="text-center mb-6">
              <h3 className="text-white mb-2">Check-in QR Code</h3>
              <p className="text-gray-400">Show this code at the restaurant</p>
            </div>

            {/* QR Code Placeholder */}
            <div className="bg-white p-8 rounded-2xl mb-6">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                <QrCode className="w-32 h-32 text-gray-400" />
              </div>
            </div>

            <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-xl p-4 mb-6">
              <p className="text-center text-[#d4af37]">Booking ID: {showQR}</p>
            </div>

            <button
              onClick={() => setShowQR(null)}
              className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f] rounded-xl hover:shadow-lg hover:shadow-[#d4af37]/30 transition-all font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}