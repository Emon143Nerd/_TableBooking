import { useState } from 'react';
import { ArrowLeft, Star, MapPin, Clock, Users, Calendar, Award, Phone, Globe } from 'lucide-react';
import { Restaurant, Booking } from '../../types';
import { mockMenuItems } from '../../data/mockData';
import { Footer } from './Footer';

interface RestaurantProfileProps {
  restaurant: Restaurant;
  onBack: () => void;
  onBookingComplete: (booking: Booking) => void;
  onBookingClick: () => void;
}

export function RestaurantProfile({ restaurant, onBack, onBookingClick }: RestaurantProfileProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const menuItems = mockMenuItems.filter(item => item.restaurantId === restaurant.id);
  const categories = ['All', ...new Set(menuItems.map(item => item.category))];
  
  const filteredMenu = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const totalSeats = restaurant.capacity.twoSeat * 2 + 
                     restaurant.capacity.threeSeat * 3 + 
                     restaurant.capacity.fourSeat * 4;

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Header */}
      <header className="bg-[#1a1a1a]/90 backdrop-blur-xl shadow-lg sticky top-0 z-40 border-b border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack} 
                className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-all border border-transparent hover:border-[#d4af37]/20"
              >
                <ArrowLeft className="w-5 h-5 text-[#d4af37]" />
              </button>
              <h2 className="text-white">{restaurant.name}</h2>
            </div>
            <button
              onClick={onBookingClick}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f] rounded-lg hover:shadow-lg hover:shadow-[#d4af37]/30 transition-all font-medium"
            >
              <Calendar className="w-4 h-4" />
              Reserve Table
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl overflow-hidden">
            <div className="md:col-span-2 aspect-video md:aspect-auto md:h-96 overflow-hidden relative group">
              <img 
                src={restaurant.photos[0]} 
                alt={restaurant.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent opacity-60"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              {restaurant.photos.slice(1, 3).map((photo, index) => (
                <div key={index} className="aspect-video md:aspect-auto md:h-[11.5rem] overflow-hidden relative group rounded-xl">
                  <img 
                    src={photo} 
                    alt={`${restaurant.name} ${index + 2}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent opacity-60"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#2a2a2a] p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-white mb-2">{restaurant.name}</h3>
                  <div className="flex items-center gap-4 text-gray-400">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-[#d4af37] text-[#d4af37]" />
                      <span className="text-[#d4af37]">{restaurant.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{restaurant.cuisine}</span>
                    <span>•</span>
                    <span className="text-[#d4af37]">{restaurant.priceRange}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">{restaurant.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 bg-[#2a2a2a] rounded-xl border border-[#3a3a3a]">
                  <MapPin className="w-5 h-5 text-[#d4af37]" />
                  <div>
                    <p className="text-gray-400">Location</p>
                    <p className="text-white">{restaurant.distance} km away</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-[#2a2a2a] rounded-xl border border-[#3a3a3a]">
                  <Clock className="w-5 h-5 text-[#d4af37]" />
                  <div>
                    <p className="text-gray-400">Hours</p>
                    <p className="text-white">{restaurant.openingHours}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-[#2a2a2a] rounded-xl border border-[#3a3a3a]">
                  <Users className="w-5 h-5 text-[#d4af37]" />
                  <div>
                    <p className="text-gray-400">Capacity</p>
                    <p className="text-white">{totalSeats} seats</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-[#2a2a2a] rounded-xl border border-[#3a3a3a]">
                  <Award className="w-5 h-5 text-[#d4af37]" />
                  <div>
                    <p className="text-gray-400">Price Range</p>
                    <p className="text-white">{restaurant.priceRange}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#2a2a2a]">
                <h4 className="text-white mb-4">Amenities</h4>
                <div className="flex flex-wrap gap-3">
                  {['Free WiFi', 'Outdoor Seating', 'Live Music', 'Parking Available', 'Pet Friendly'].map((amenity) => (
                    <span 
                      key={amenity}
                      className="px-4 py-2 bg-[#d4af37]/10 text-[#d4af37] rounded-lg border border-[#d4af37]/20"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#2a2a2a] p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Starting from</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                    <span className="text-white">{restaurant.rating}</span>
                  </div>
                </div>
                <div className="text-[#d4af37] mb-4">$25 per person</div>
                <button
                  onClick={onBookingClick}
                  className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f] rounded-xl hover:shadow-2xl hover:shadow-[#d4af37]/30 transition-all font-medium"
                >
                  Book a Table
                </button>
              </div>

              <div className="space-y-3 pt-6 border-t border-[#2a2a2a]">
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-4 h-4 text-[#d4af37]" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Globe className="w-4 h-4 text-[#d4af37]" />
                  <span>website.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-4 h-4 text-[#d4af37]" />
                  <span>123 Main St, City</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-xl">
                <p className="text-[#d4af37] text-sm">
                  ⭐ Free cancellation up to 24 hours before your reservation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#2a2a2a] p-8">
          <h3 className="text-white mb-6">Menu</h3>

          {/* Category Filter */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-xl transition-all whitespace-nowrap font-medium ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f] shadow-lg'
                    : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a] border border-[#3a3a3a]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenu.map((item) => (
              <div 
                key={item.id}
                className="bg-[#2a2a2a] rounded-xl overflow-hidden border border-[#3a3a3a] hover:border-[#d4af37]/30 transition-all group"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1.5 bg-[#d4af37] text-[#0f0f0f] rounded-full font-medium">
                    TK {item.price}
                  </div>
                </div>
                <div className="p-4">
                  <h5 className="text-white mb-2">{item.name}</h5>
                  <p className="text-gray-400">{item.description || 'Delicious dish prepared with care'}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="px-3 py-1 bg-[#d4af37]/10 text-[#d4af37] rounded-lg border border-[#d4af37]/20">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}