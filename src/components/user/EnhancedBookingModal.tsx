import { useMemo, useState } from 'react';
import { X, Calendar, Users, Clock, CheckCircle2, XCircle, Filter, Grid3x3, AppWindow, Coffee, Sun, Moon, Utensils } from 'lucide-react';
import { Restaurant, Booking } from '../../types';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar as HeroCalendar } from "@heroui/react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";

interface EnhancedBookingModalProps {
  restaurant: Restaurant;
  onClose: () => void;
  onComplete: (booking: Booking) => void;
}

interface TimeSlot {
  time: string;
  available: {
    twoSeat: number;
    threeSeat: number;
    fourSeat: number;
  };
  windowSide: {
    twoSeat: boolean;
    threeSeat: boolean;
    fourSeat: boolean;
  };
}

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'brunch' | 'snacks';

export function EnhancedBookingModal({ restaurant, onClose, onComplete }: EnhancedBookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTableType, setSelectedTableType] = useState<2 | 3 | 4 | null>(null);
  const [isWindowSide, setIsWindowSide] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [viewMode, setViewMode] = useState<'time' | 'table'>('time');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealType>('lunch');

  const todayDate = useMemo(() => today(getLocalTimeZone()), []);
  const selectedDateIso = selectedDate ? selectedDate.toString() : '';
  const selectedDateLabel = selectedDate
    ? new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: '2-digit' }).format(selectedDate.toDate(getLocalTimeZone()))
    : 'Pick a date';

  const mealTypes: { type: MealType; label: string; icon: any; timeRange: string; color: string }[] = [
    { type: 'breakfast', label: 'Breakfast', icon: Coffee, timeRange: '6AM - 11AM', color: 'from-orange-400 to-amber-500' },
    { type: 'brunch', label: 'Brunch', icon: Sun, timeRange: '10AM - 2PM', color: 'from-yellow-400 to-orange-400' },
    { type: 'lunch', label: 'Lunch', icon: Utensils, timeRange: '12PM - 4PM', color: 'from-green-400 to-emerald-500' },
    { type: 'snacks', label: 'Snacks', icon: Coffee, timeRange: '3PM - 6PM', color: 'from-blue-400 to-cyan-500' },
    { type: 'dinner', label: 'Dinner', icon: Moon, timeRange: '6PM - 11PM', color: 'from-purple-500 to-indigo-600' },
  ];

  // Generate time slots from 10 AM to 10 PM
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    for (let hour = 10; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        // Mock availability data
        const isBookedSlot = Math.random() > 0.7;
        slots.push({
          time,
          available: {
            twoSeat: isBookedSlot ? Math.floor(Math.random() * 3) : Math.floor(Math.random() * 5) + 2,
            threeSeat: isBookedSlot ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 4) + 1,
            fourSeat: isBookedSlot ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 3) + 1,
          },
          windowSide: {
            twoSeat: Math.random() > 0.5,
            threeSeat: Math.random() > 0.6,
            fourSeat: Math.random() > 0.4,
          },
        });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const getTableSuggestion = (people: number): 2 | 3 | 4 => {
    if (people <= 2) return 2;
    if (people <= 3) return 3;
    return 4;
  };

  const suggestedTable = getTableSuggestion(numberOfPeople);

  const handleSlotSelect = (time: string, tableType: 2 | 3 | 4, windowSide: boolean) => {
    setSelectedTime(time);
    setSelectedTableType(tableType);
    setIsWindowSide(windowSide);
  };

  const handleConfirm = () => {
    if (!selectedDateIso || !selectedTime || !selectedTableType) return;

    const booking: Booking = {
      id: `b${Date.now()}`,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      userId: 'u1',
      date: selectedDateIso,
      time: selectedTime,
      duration: 1.5,
      tableType: selectedTableType,
      numberOfPeople,
      status: 'upcoming',
      price: 10,
      qrCode: `QR-${Date.now()}`,
      specialInstructions: '',
    };
    onComplete(booking);
    onClose();
  };

  const getSlotStatus = (slot: TimeSlot, tableType: keyof TimeSlot['available']) => {
    const available = slot.available[tableType];
    if (available === 0) return 'booked';
    if (available <= 2) return 'limited';
    return 'available';
  };

  const filteredSlots = showOnlyAvailable 
    ? timeSlots.filter(slot => 
        slot.available.twoSeat > 0 || slot.available.threeSeat > 0 || slot.available.fourSeat > 0
      )
    : timeSlots;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] backdrop-blur-xl rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-[#d4af37]/20">
        {/* Header */}
        <div className="relative bg-[#d4af37] text-[#0f0f0f] px-8 py-6">
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="mb-1 text-xl font-bold">Book Your Perfect Table</h2>
              <p className="opacity-90">{restaurant.name}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-black/10 rounded-full transition-all text-[#0f0f0f]"
              aria-label="Close booking modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Date and People Selection */}
          <div className="px-8 py-6 bg-[#2a2a2a] border-b border-[#3a3a3a]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-gray-300 mb-2">
                  <Calendar className="w-5 h-5 text-[#d4af37]" />
                  Select Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="w-full flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl text-white hover:border-[#d4af37]/40 transition-colors text-left"
                    >
                      <Calendar className="w-5 h-5 text-[#d4af37]" />
                      <span className={selectedDate ? 'text-white' : 'text-gray-400'}>
                        {selectedDateLabel}
                      </span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="w-auto p-0 bg-[#1a1a1a] border border-[#3a3a3a] rounded-2xl overflow-hidden"
                  >
                    <HeroCalendar
                      value={selectedDate}
                      onChange={setSelectedDate}
                      minValue={todayDate}
                      className="bg-[#1a1a1a] text-white p-2"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-300 mb-2">
                  <Users className="w-5 h-5 text-[#d4af37]" />
                  Number of People
                </label>
                <select
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent transition-all"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                  ))}
                </select>
                <p className="text-[#d4af37] mt-2">
                  💡 Suggested: {suggestedTable}-Seat Table
                </p>
              </div>
            </div>
          </div>

          {/* Meal Type Selection */}
          <div className="px-8 py-6 bg-[#1a1a1a] border-b border-[#2a2a2a]">
            <label className="flex items-center gap-2 text-gray-300 mb-4">
              <Utensils className="w-5 h-5 text-[#d4af37]" />
              Select Meal Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {mealTypes.map((meal) => {
                const Icon = meal.icon;
                const isSelected = selectedMeal === meal.type;
                return (
                  <button
                    key={meal.type}
                    onClick={() => setSelectedMeal(meal.type)}
                    className={`relative p-4 rounded-xl border-2 transition-all overflow-hidden ${
                      isSelected
                        ? 'border-[#d4af37] bg-[#d4af37]/10'
                        : 'border-[#3a3a3a] bg-[#2a2a2a] hover:border-[#d4af37]/50'
                    }`}
                  >
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-[#d4af37]' : 'text-gray-400'}`} />
                      <div className="text-center">
                        <p className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                          {meal.label}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{meal.timeRange}</p>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle2 className="w-5 h-5 text-[#d4af37]" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="px-8 py-4 bg-[#1a1a1a]/80 backdrop-blur-sm border-b border-[#2a2a2a] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-[#2a2a2a] rounded-xl p-1">
                <button
                  onClick={() => setViewMode('time')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    viewMode === 'time'
                      ? 'bg-[#d4af37] text-[#0f0f0f]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  Time View
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    viewMode === 'table'
                      ? 'bg-[#d4af37] text-[#0f0f0f]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                  Table View
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowOnlyAvailable(!showOnlyAvailable)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                showOnlyAvailable
                  ? 'bg-[#d4af37] text-[#0f0f0f]'
                  : 'bg-[#2a2a2a] text-gray-400 hover:text-white border border-[#3a3a3a]'
              }`}
            >
              <Filter className="w-4 h-4" />
              Available Only
            </button>
          </div>

          {/* Legend */}
          <div className="px-8 py-4 bg-[#2a2a2a] border-b border-[#3a3a3a]">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#d4af37] rounded"></div>
                <span className="text-gray-300">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-gray-300">Limited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#3a3a3a] rounded"></div>
                <span className="text-gray-300">Booked</span>
              </div>
            </div>
          </div>

          {/* Time Slots */}
          {!selectedDate && (
            <div className="px-8 py-16 text-center">
              <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Please select a date to view available time slots</p>
            </div>
          )}

          {selectedDate && viewMode === 'time' && (
            <div className="px-8 py-6">
              <div className="space-y-4">
                {filteredSlots.map((slot) => {
                  const twoSeatStatus = getSlotStatus(slot, 'twoSeat');
                  const threeSeatStatus = getSlotStatus(slot, 'threeSeat');
                  const fourSeatStatus = getSlotStatus(slot, 'fourSeat');

                  return (
                    <div key={slot.time} className="flex items-center gap-4">
                      <div className="w-24">
                        <p className="text-white">{slot.time}</p>
                      </div>
                      <div className="flex-1 grid grid-cols-3 gap-4">
                        {/* 2-Seat */}
                        <button
                          onClick={() => slot.available.twoSeat > 0 && handleSlotSelect(slot.time, 2, slot.windowSide.twoSeat)}
                          disabled={slot.available.twoSeat === 0}
                          className={`px-4 py-3 rounded-xl transition-all border relative ${
                            selectedTime === slot.time && selectedTableType === 2
                              ? 'bg-[#d4af37] text-[#0f0f0f] border-[#d4af37]'
                              : twoSeatStatus === 'available'
                              ? 'bg-[#2a2a2a] text-white border-[#3a3a3a] hover:border-[#d4af37]/30'
                              : twoSeatStatus === 'limited'
                              ? 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                              : 'bg-[#1a1a1a] text-gray-600 border-[#2a2a2a] cursor-not-allowed'
                          }`}
                        >
                          {slot.windowSide.twoSeat && slot.available.twoSeat > 0 && (
                            <div className="absolute top-2 right-2">
                              <AppWindow className="w-4 h-4 text-[#d4af37]" />
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <div className="text-left">
                              <span className="block">2-Seat</span>
                              {slot.windowSide.twoSeat && slot.available.twoSeat > 0 && (
                                <span className="text-xs text-[#d4af37] block mt-0.5">Window Side</span>
                              )}
                            </div>
                            {slot.available.twoSeat > 0 ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                          </div>
                          <p className="text-sm mt-1 opacity-80">{slot.available.twoSeat} available</p>
                        </button>

                        {/* 3-Seat */}
                        <button
                          onClick={() => slot.available.threeSeat > 0 && handleSlotSelect(slot.time, 3, slot.windowSide.threeSeat)}
                          disabled={slot.available.threeSeat === 0}
                          className={`px-4 py-3 rounded-xl transition-all border relative ${
                            selectedTime === slot.time && selectedTableType === 3
                              ? 'bg-[#d4af37] text-[#0f0f0f] border-[#d4af37]'
                              : threeSeatStatus === 'available'
                              ? 'bg-[#2a2a2a] text-white border-[#3a3a3a] hover:border-[#d4af37]/30'
                              : threeSeatStatus === 'limited'
                              ? 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                              : 'bg-[#1a1a1a] text-gray-600 border-[#2a2a2a] cursor-not-allowed'
                          }`}
                        >
                          {slot.windowSide.threeSeat && slot.available.threeSeat > 0 && (
                            <div className="absolute top-2 right-2">
                              <AppWindow className="w-4 h-4 text-[#d4af37]" />
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <div className="text-left">
                              <span className="block">3-Seat</span>
                              {slot.windowSide.threeSeat && slot.available.threeSeat > 0 && (
                                <span className="text-xs text-[#d4af37] block mt-0.5">Window Side</span>
                              )}
                            </div>
                            {slot.available.threeSeat > 0 ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                          </div>
                          <p className="text-sm mt-1 opacity-80">{slot.available.threeSeat} available</p>
                        </button>

                        {/* 4-Seat */}
                        <button
                          onClick={() => slot.available.fourSeat > 0 && handleSlotSelect(slot.time, 4, slot.windowSide.fourSeat)}
                          disabled={slot.available.fourSeat === 0}
                          className={`px-4 py-3 rounded-xl transition-all border relative ${
                            selectedTime === slot.time && selectedTableType === 4
                              ? 'bg-[#d4af37] text-[#0f0f0f] border-[#d4af37]'
                              : fourSeatStatus === 'available'
                              ? 'bg-[#2a2a2a] text-white border-[#3a3a3a] hover:border-[#d4af37]/30'
                              : fourSeatStatus === 'limited'
                              ? 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                              : 'bg-[#1a1a1a] text-gray-600 border-[#2a2a2a] cursor-not-allowed'
                          }`}
                        >
                          {slot.windowSide.fourSeat && slot.available.fourSeat > 0 && (
                            <div className="absolute top-2 right-2">
                              <AppWindow className="w-4 h-4 text-[#d4af37]" />
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <div className="text-left">
                              <span className="block">4-Seat</span>
                              {slot.windowSide.fourSeat && slot.available.fourSeat > 0 && (
                                <span className="text-xs text-[#d4af37] block mt-0.5">Window Side</span>
                              )}
                            </div>
                            {slot.available.fourSeat > 0 ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                          </div>
                          <p className="text-sm mt-1 opacity-80">{slot.available.fourSeat} available</p>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {selectedDate && viewMode === 'table' && (
            <div className="px-8 py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[2, 3, 4].map((tableSize) => (
                  <div key={tableSize} className="bg-[#2a2a2a] rounded-2xl p-6 border border-[#3a3a3a]">
                    <h4 className="text-white mb-4">{tableSize}-Seat Tables</h4>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {filteredSlots.map((slot) => {
                        const available = slot.available[`${tableSize === 2 ? 'two' : tableSize === 3 ? 'three' : 'four'}Seat` as keyof TimeSlot['available']];
                        const status = getSlotStatus(slot, `${tableSize === 2 ? 'two' : tableSize === 3 ? 'three' : 'four'}Seat` as keyof TimeSlot['available']);
                        
                        return (
                          <button
                            key={slot.time}
                            onClick={() => available > 0 && handleSlotSelect(slot.time, tableSize as 2 | 3 | 4, slot.windowSide[`${tableSize === 2 ? 'two' : tableSize === 3 ? 'three' : 'four'}Seat` as keyof TimeSlot['windowSide']])}
                            disabled={available === 0}
                            className={`w-full px-4 py-3 rounded-xl transition-all border text-left ${
                              selectedTime === slot.time && selectedTableType === tableSize
                                ? 'bg-[#d4af37] text-[#0f0f0f] border-[#d4af37]'
                                : status === 'available'
                                ? 'bg-[#1a1a1a] text-white border-[#3a3a3a] hover:border-[#d4af37]/30'
                                : status === 'limited'
                                ? 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                                : 'bg-[#1a1a1a] text-gray-600 border-[#2a2a2a] cursor-not-allowed'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{slot.time}</span>
                              <span className="text-sm opacity-80">{available} left</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-[#2a2a2a] border-t border-[#3a3a3a] flex items-center justify-between">
          <div>
            {selectedTime && selectedTableType && (
              <div className="text-white">
                <p className="text-gray-400">Selected:</p>
                <p className="font-medium">{selectedDateIso} at {selectedTime} • {selectedTableType}-Seat Table</p>
                {isWindowSide && <p className="text-sm text-gray-300">Window Side</p>}
              </div>
            )}
          </div>
          <button
            onClick={handleConfirm}
            disabled={!selectedDateIso || !selectedTime || !selectedTableType}
            className="px-8 py-3 bg-[#d4af37] text-[#0f0f0f] rounded-xl font-bold hover:bg-[#b8860b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}