import { CheckCircle, Calendar, Clock, Users, MapPin, Download, QrCode as QrIcon, Share2 } from 'lucide-react';
import QRCode from 'react-qr-code';
import { Booking } from '../../types';
import { toast } from 'sonner@2.0.3';
import { Footer } from './Footer';

interface BookingConfirmationProps {
  booking: Booking;
  onBack: () => void;
}

export function BookingConfirmation({ booking, onBack }: BookingConfirmationProps) {
  const handleDownload = () => {
    toast.success('Booking confirmation downloaded!');
  };

  const handleShare = () => {
    toast.success('Booking details copied to clipboard!');
  };

  const qrData = JSON.stringify({
    id: booking.id,
    restaurant: booking.restaurantName,
    date: booking.date,
    time: booking.time,
    guests: booking.numberOfPeople,
    table: booking.tableType
  });

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <div className="flex items-center justify-center p-4 py-16">
        <div className="max-w-2xl w-full">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-[#d4af37] to-[#b8860b] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#d4af37]/30 animate-bounce">
              <CheckCircle className="w-12 h-12 text-[#0f0f0f]" />
            </div>
            <h2 className="text-white mb-2">Booking Confirmed!</h2>
            <p className="text-gray-400">Your reservation has been successfully confirmed</p>
          </div>

          {/* Booking Details Card */}
          <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-[#d4af37]/20 overflow-hidden mb-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] p-6">
              <h3 className="text-[#0f0f0f] mb-1">{booking.restaurantName}</h3>
              <p className="text-[#0f0f0f]/80">Reservation ID: #{booking.id.slice(0, 8).toUpperCase()}</p>
            </div>

            {/* Details Grid */}
            <div className="p-8">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#d4af37]/10 rounded-xl flex items-center justify-center border border-[#d4af37]/20">
                    <Calendar className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Date</p>
                    <p className="text-white">{new Date(booking.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#d4af37]/10 rounded-xl flex items-center justify-center border border-[#d4af37]/20">
                    <Clock className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Time</p>
                    <p className="text-white">{booking.time}</p>
                    <p className="text-gray-500">Duration: {booking.duration}h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#d4af37]/10 rounded-xl flex items-center justify-center border border-[#d4af37]/20">
                    <Users className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Guests</p>
                    <p className="text-white">{booking.numberOfPeople} people</p>
                    <p className="text-gray-500">Table: {booking.tableType}-seat</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#d4af37]/10 rounded-xl flex items-center justify-center border border-[#d4af37]/20">
                    <MapPin className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Location</p>
                    <p className="text-white">{booking.restaurantName}</p>
                    <p className="text-gray-500">View on map →</p>
                  </div>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="bg-white rounded-2xl p-8 mb-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-gray-900 mb-1">Check-in QR Code</h4>
                    <p className="text-gray-500">Show this at the restaurant</p>
                  </div>
                </div>
                
                <div className="bg-white p-2 rounded-xl inline-block border-2 border-gray-100">
                  <div className="w-40 h-40 flex items-center justify-center">
                    <QRCode value={qrData} size={160} bgColor="#ffffff" fgColor="#000000" />
                  </div>
                </div>
              </div>

              {/* Important Info */}
              <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-xl p-4">
                <h5 className="text-[#d4af37] mb-3">Important Information</h5>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#d4af37] mt-1">•</span>
                    <span>Please arrive within 20 minutes of your reservation time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#d4af37] mt-1">•</span>
                    <span>Free cancellation up to 24 hours before reservation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#d4af37] mt-1">•</span>
                    <span>A confirmation email has been sent to your email address</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#1a1a1a]/80 backdrop-blur-sm text-gray-300 rounded-xl hover:bg-[#2a2a2a] hover:border-[#d4af37]/20 transition-all border border-[#2a2a2a] font-medium"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
            
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#1a1a1a]/80 backdrop-blur-sm text-gray-300 rounded-xl hover:bg-[#2a2a2a] hover:border-[#d4af37]/20 transition-all border border-[#2a2a2a] font-medium"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>

          <button
            onClick={onBack}
            className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f] rounded-xl hover:shadow-2xl hover:shadow-[#d4af37]/30 transition-all font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}