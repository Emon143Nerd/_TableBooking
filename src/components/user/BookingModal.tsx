import { useState } from 'react';
import { X, Calendar as LucideCalendar, Clock, Users, Timer, DollarSign, AlertCircle, AppWindow } from 'lucide-react';
import { Restaurant, Booking } from '../../types';
import { Calendar } from "@heroui/react";
import { parseDate, getLocalTimeZone, today } from "@internationalized/date";

interface BookingModalProps {
  restaurant: Restaurant;
  onClose: () => void;
  onComplete: (booking: Booking) => void;
}

export function BookingModal({ restaurant, onClose, onComplete }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    tableType: 2 as 2 | 3 | 4,
    numberOfPeople: 2,
    duration: 1.5,
    specialInstructions: '',
  });

  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  const bookingFee = 10;
  const totalPrice = bookingFee;

  const handleNext = () => {
    if (step === 5) {
      // Check availability
      const availableSeats = restaurant.capacity[`${bookingData.tableType}Seat` as keyof typeof restaurant.capacity];
      setIsAvailable(availableSeats > 0);
      setAvailabilityChecked(true);
    }
    if (step < 7) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleConfirm = () => {
    const booking: Booking = {
      id: `b${Date.now()}`,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      userId: 'u1',
      date: bookingData.date,
      time: bookingData.time,
      duration: bookingData.duration,
      tableType: bookingData.tableType,
      numberOfPeople: bookingData.numberOfPeople,
      status: 'upcoming',
      price: totalPrice,
      qrCode: `QR-${Date.now()}`,
      specialInstructions: bookingData.specialInstructions,
    };
    onComplete(booking);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3>Book a Table</h3>
            <p className="text-gray-600">{restaurant.name}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4, 5, 6, 7].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  s <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {s}
                </div>
                {s < 7 && <div className={`w-8 h-1 ${s < step ? 'bg-blue-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
          <p className="text-gray-600">
            Step {step} of 7: {
              step === 1 ? 'Choose Date' :
              step === 2 ? 'Choose Time' :
              step === 3 ? 'Select Table Type' :
              step === 4 ? 'Number of People' :
              step === 5 ? 'Select Duration' :
              step === 6 ? 'Review & Pricing' :
              'Confirm Reservation'
            }
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-8">
          {/* Step 1: Date */}
          {step === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <LucideCalendar className="w-6 h-6 text-blue-600" />
                <h3>Choose Date</h3>
              </div>
              <div className="flex justify-center bg-gray-50 rounded-xl p-4 border border-gray-200">
                <Calendar 
                  aria-label="Select Date"
                  value={bookingData.date ? parseDate(bookingData.date) : undefined}
                  onChange={(date) => setBookingData({ ...bookingData, date: date.toString() })}
                  minValue={today(getLocalTimeZone())}
                  className="max-w-full"
                />
              </div>
              {!bookingData.date && (
                <p className="text-sm text-red-500 mt-2 text-center">Please select a date to continue</p>
              )}
            </div>
          )}

          {/* Step 2: Time */}
          {step === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-blue-600" />
                <h3>Choose Time</h3>
              </div>
              <input
                type="time"
                value={bookingData.time}
                onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-gray-600 mt-4">Opening Hours: {restaurant.openingHours}</p>
            </div>
          )}

          {/* Step 3: Table Type */}
          {step === 3 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-blue-600" />
                <h3>Select Table Type</h3>
              </div>
              <div className="space-y-4">
                {[
                  { 
                    seats: 2, 
                    description: 'Window Seat - Perfect for intimate dining with city views',
                    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
                    isWindow: true
                  },
                  { 
                    seats: 3, 
                    description: 'Corner Table - Cozy seating in quiet corners',
                    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
                    isWindow: false
                  },
                  { 
                    seats: 4, 
                    description: 'Main Hall - Standard dining tables in the main area',
                    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&h=300&fit=crop',
                    isWindow: false
                  },
                ].map(({ seats, description, image, isWindow }) => {
                  const available = restaurant.capacity[`${seats}Seat` as keyof typeof restaurant.capacity];
                  return (
                    <button
                      key={seats}
                      onClick={() => setBookingData({ ...bookingData, tableType: seats as 2 | 3 | 4 })}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${\
                        bookingData.tableType === seats
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className="relative">
                          <img 
                            src={image} 
                            alt={description}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          {isWindow && (
                            <div className="absolute top-1 right-1 bg-blue-600 text-white p-1 rounded-full shadow-lg">
                              <AppWindow className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-blue-600 flex items-center gap-2">
                              {seats}-Seat Table
                              {isWindow && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex items-center gap-1"><AppWindow className="w-3 h-3"/> Window</span>}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              available > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {available > 0 ? `${available} available` : 'Not available'}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm">{description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Number of People */}
          {step === 4 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-blue-600" />
                <h3>Number of People</h3>
              </div>
              <input
                type="number"
                min={1}
                max={bookingData.tableType}
                value={bookingData.numberOfPeople}
                onChange={(e) => setBookingData({ ...bookingData, numberOfPeople: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-gray-600 mt-4">
                Maximum {bookingData.tableType} people for selected table type
              </p>
            </div>
          )}

          {/* Step 5: Duration */}
          {step === 5 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Timer className="w-6 h-6 text-blue-600" />
                <h3>Select Duration</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 1.5, 2].map((hours) => (
                  <button
                    key={hours}
                    onClick={() => setBookingData({ ...bookingData, duration: hours })}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      bookingData.duration === hours
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-blue-600">{hours} {hours === 1 ? 'Hour' : 'Hours'}</div>
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-gray-600 mt-4">
                Maximum duration: {restaurant.reservationRules.maxDuration} hours
              </p>
            </div>
          )}

          {/* Step 6: Availability Check & Pricing */}
          {step === 6 && (
            <div>
              {availabilityChecked && isAvailable ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-green-800 mb-1">Table Available!</h4>
                    <p className="text-green-700">Your selected table is available for booking</p>
                  </div>
                </div>
              ) : availabilityChecked && !isAvailable ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-red-800 mb-1">Not Available</h4>
                    <p className="text-red-700">Please select a different table type or time</p>
                  </div>
                </div>
              ) : null}

              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="w-6 h-6 text-blue-600" />
                <h3>Pricing</h3>
              </div>
              
              <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Booking Fee</span>
                  <span>${bookingFee}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                  <span>Total</span>
                  <span className="text-blue-600">${totalPrice}</span>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-gray-700 mb-2">Special Instructions (Optional)</label>
                <textarea
                  value={bookingData.specialInstructions}
                  onChange={(e) => setBookingData({ ...bookingData, specialInstructions: e.target.value })}
                  placeholder="e.g., Window seat preferred, celebration, dietary requirements..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Step 7: Confirmation */}
          {step === 7 && (
            <div>
              <h3 className="mb-6">Confirm Your Reservation</h3>
              
              <div className="space-y-4 bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Restaurant</span>
                  <span>{restaurant.name}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Date & Time</span>
                  <span>{bookingData.date} at {bookingData.time}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Table Type</span>
                  <span>{bookingData.tableType}-Seat Table</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Guests</span>
                  <span>{bookingData.numberOfPeople} people</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Duration</span>
                  <span>{bookingData.duration} hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Price</span>
                  <span className="text-blue-600">${totalPrice}</span>
                </div>
              </div>

              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="mb-2">Important Reminders</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Grace period: {restaurant.reservationRules.gracePeriod} minutes</li>
                  <li>• Late arrival penalty: ${restaurant.reservationRules.penaltyFee}</li>
                  <li>• {restaurant.reservationRules.cancellationPolicy}</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          {step < 7 ? (
            <button
              onClick={handleNext}
              disabled={
                (step === 1 && !bookingData.date) ||
                (step === 2 && !bookingData.time) ||
                (step === 4 && bookingData.numberOfPeople > bookingData.tableType)
              }
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Confirm Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
}