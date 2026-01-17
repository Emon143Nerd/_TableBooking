import { useState } from 'react';
import { X, CreditCard, Building2, Wallet, Check, Lock, Shield } from 'lucide-react';
import { Booking } from '../../types';
import { toast } from 'sonner@2.0.3';

interface PaymentModalProps {
  booking: Booking;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

type PaymentMethod = 'card' | 'mobile' | 'wallet';

export function PaymentModal({ booking, onClose, onPaymentSuccess }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [processing, setProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [mobileNumber, setMobileNumber] = useState('');

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProcessing(false);
    toast.success('Payment successful!');
    onPaymentSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] backdrop-blur-xl rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#d4af37]/20">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f] px-8 py-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-1">Complete Payment</h2>
              <p className="opacity-90">Secure checkout with 256-bit encryption</p>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-black/10 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="px-8 py-6 bg-[#2a2a2a] border-b border-[#3a3a3a]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#d4af37]/20 rounded-xl flex items-center justify-center border border-[#d4af37]/30">
              <Building2 className="w-6 h-6 text-[#d4af37]" />
            </div>
            <div>
              <h4 className="text-white">{booking.restaurantName}</h4>
              <p className="text-gray-400">{booking.date} at {booking.time}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-[#1a1a1a] backdrop-blur-sm rounded-xl p-3 border border-[#2a2a2a]">
              <p className="text-gray-400 mb-1">Guests</p>
              <p className="text-white">{booking.numberOfPeople}</p>
            </div>
            <div className="bg-[#1a1a1a] backdrop-blur-sm rounded-xl p-3 border border-[#2a2a2a]">
              <p className="text-gray-400 mb-1">Duration</p>
              <p className="text-white">{booking.duration}h</p>
            </div>
            <div className="bg-[#1a1a1a] backdrop-blur-sm rounded-xl p-3 border border-[#2a2a2a]">
              <p className="text-gray-400 mb-1">Table</p>
              <p className="text-white">{booking.tableType}-Seat</p>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="px-8 py-6">
          <h4 className="mb-4 text-white">Select Payment Method</h4>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'card'
                  ? 'border-[#d4af37] bg-[#d4af37]/10 shadow-lg'
                  : 'border-[#2a2a2a] hover:border-[#d4af37]/30 hover:bg-[#2a2a2a]'
              }`}
            >
              <CreditCard className={`w-6 h-6 mx-auto mb-2 ${
                paymentMethod === 'card' ? 'text-[#d4af37]' : 'text-gray-400'
              }`} />
              <p className={`${paymentMethod === 'card' ? 'text-[#d4af37]' : 'text-gray-400'}`}>
                Card
              </p>
            </button>

            <button
              onClick={() => setPaymentMethod('mobile')}
              className={`p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'mobile'
                  ? 'border-[#d4af37] bg-[#d4af37]/10 shadow-lg'
                  : 'border-[#2a2a2a] hover:border-[#d4af37]/30 hover:bg-[#2a2a2a]'
              }`}
            >
              <Wallet className={`w-6 h-6 mx-auto mb-2 ${
                paymentMethod === 'mobile' ? 'text-[#d4af37]' : 'text-gray-400'
              }`} />
              <p className={`${paymentMethod === 'mobile' ? 'text-[#d4af37]' : 'text-gray-400'}`}>
                Mobile Banking
              </p>
            </button>

            <button
              onClick={() => setPaymentMethod('wallet')}
              className={`p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'wallet'
                  ? 'border-[#d4af37] bg-[#d4af37]/10 shadow-lg'
                  : 'border-[#2a2a2a] hover:border-[#d4af37]/30 hover:bg-[#2a2a2a]'
              }`}
            >
              <Wallet className={`w-6 h-6 mx-auto mb-2 ${
                paymentMethod === 'wallet' ? 'text-[#d4af37]' : 'text-gray-400'
              }`} />
              <p className={`${paymentMethod === 'wallet' ? 'text-[#d4af37]' : 'text-gray-400'}`}>
                Wallet
              </p>
            </button>
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePayment} className="space-y-4">
            {paymentMethod === 'card' && (
              <div className="space-y-4 bg-[#2a2a2a] rounded-2xl p-6 border border-[#3a3a3a]">
                <div>
                  <label className="block text-gray-300 mb-2">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#d4af37] w-5 h-5" />
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.number}
                      onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={cardData.name}
                    onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardData.expiry}
                      onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">CVV</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#d4af37] w-5 h-5" />
                      <input
                        type="text"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'mobile' && (
              <div className="space-y-4 bg-[#2a2a2a] rounded-2xl p-6 border border-[#3a3a3a]">
                <div>
                  <label className="block text-gray-300 mb-2">Mobile Number</label>
                  <input
                    type="text"
                    placeholder="01XXXXXXXXX"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <p className="text-gray-300">Select Mobile Banking Provider</p>
                  {['bKash', 'Nagad', 'Rocket'].map((provider) => (
                    <button
                      key={provider}
                      type="button"
                      className="w-full p-4 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl hover:border-[#d4af37]/30 hover:bg-[#2a2a2a] transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <Wallet className="w-6 h-6 text-gray-400 group-hover:text-[#d4af37]" />
                        <span className="text-white group-hover:text-[#d4af37]">{provider}</span>
                      </div>
                      <Check className="w-5 h-5 text-gray-600 group-hover:text-[#d4af37]" />
                    </button>
                  ))}
                </div>
                <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-xl p-4 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300">You will receive a payment request on your mobile banking app</p>
                </div>
              </div>
            )}

            {paymentMethod === 'wallet' && (
              <div className="space-y-4 bg-[#2a2a2a] rounded-2xl p-6 border border-[#3a3a3a]">
                <div className="space-y-3">
                  {['Upay', 'SureCash', 'MyCash'].map((wallet) => (
                    <button
                      key={wallet}
                      type="button"
                      className="w-full p-4 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl hover:border-[#d4af37]/30 hover:bg-[#2a2a2a] transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <Wallet className="w-6 h-6 text-gray-400 group-hover:text-[#d4af37]" />
                        <span className="text-white group-hover:text-[#d4af37]">{wallet}</span>
                      </div>
                      <Check className="w-5 h-5 text-gray-600 group-hover:text-[#d4af37]" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Summary */}
            <div className="bg-[#2a2a2a] rounded-2xl p-6 space-y-3 border border-[#3a3a3a]">
              <div className="flex items-center justify-between text-gray-400">
                <span>Booking Fee</span>
                <span className="text-white">TK {booking.price}</span>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <span>Service Fee</span>
                <span className="text-white">TK 20</span>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <span>Taxes</span>
                <span className="text-white">TK {(booking.price * 0.1).toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-[#3a3a3a] flex items-center justify-between">
                <span className="text-white">Total Amount</span>
                <span className="text-[#d4af37]">TK {(booking.price + 20 + booking.price * 0.1).toFixed(2)}</span>
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <Shield className="w-4 h-4 text-[#d4af37]" />
              <span>Secured by 256-bit SSL encryption</span>
            </div>

            {/* Submit Button */}
            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f] rounded-xl hover:shadow-2xl hover:shadow-[#d4af37]/30 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-[#0f0f0f] border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                `Pay TK ${(booking.price + 20 + booking.price * 0.1).toFixed(2)}`
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}