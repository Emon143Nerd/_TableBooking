import { useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { ArrowLeft, Star, MapPin, Clock, Filter, Search } from 'lucide-react';
import { Restaurant } from '../../types';
import { mockRestaurants, mockMenuItems } from '../../data/mockData';
import { Footer } from './Footer';

interface FoodSearchResultsProps {
  searchQuery: string;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onBack: () => void;
}

export function FoodSearchResults({ searchQuery, onSelectRestaurant, onBack }: FoodSearchResultsProps) {
  const [priceFilter, setPriceFilter] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'rating' | 'distance' | 'price'>('rating');

  // Find menu items matching search query
  const matchingMenuItems = mockMenuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get unique restaurant IDs from matching menu items
  const restaurantIdsWithMatchingFood = [...new Set(matchingMenuItems.map(item => item.restaurantId))];

  // Filter restaurants
  let filteredRestaurants = mockRestaurants.filter(restaurant => {
    const matchesSearch = 
      restaurantIdsWithMatchingFood.includes(restaurant.id) ||
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPrice = priceFilter.length === 0 || priceFilter.includes(restaurant.priceRange);
    const matchesRating = restaurant.rating >= ratingFilter;

    return matchesSearch && matchesPrice && matchesRating;
  });

  // Sort restaurants
  filteredRestaurants.sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'distance') return a.distance - b.distance;
    if (sortBy === 'price') {
      const priceOrder = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 };
      return priceOrder[a.priceRange as keyof typeof priceOrder] - priceOrder[b.priceRange as keyof typeof priceOrder];
    }
    return 0;
  });

  const togglePriceFilter = (price: string) => {
    setPriceFilter(prev => 
      prev.includes(price) 
        ? prev.filter(p => p !== price)
        : [...prev, price]
    );
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Header */}
      <header className="bg-[#1a1a1a]/90 backdrop-blur-xl shadow-lg sticky top-0 z-40 border-b border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack} 
              className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-all border border-transparent hover:border-[#d4af37]/20"
            >
              <ArrowLeft className="w-5 h-5 text-[#d4af37]" />
            </button>
            <div className="flex-1">
              <h2 className="text-white">Search Results</h2>
              <p className="text-gray-400">Found {filteredRestaurants.length} restaurants for "{searchQuery}"</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#2a2a2a] p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-[#d4af37]" />
                <h4 className="text-white">Filters</h4>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h5 className="text-white mb-3">Price Range</h5>
                <div className="space-y-2">
                  {['$', '$$', '$$$', '$$$$'].map((price) => (
                    <label key={price} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={priceFilter.includes(price)}
                        onChange={() => togglePriceFilter(price)}
                        className="w-5 h-5 rounded border-[#3a3a3a] bg-[#2a2a2a] text-[#d4af37] focus:ring-[#d4af37] focus:ring-offset-0"
                      />
                      <span className="text-gray-300 group-hover:text-[#d4af37] transition-colors">{price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h5 className="text-white mb-3">Minimum Rating</h5>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setRatingFilter(rating)}
                      className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                        ratingFilter === rating
                          ? 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f]'
                          : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a] border border-[#3a3a3a]'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${ratingFilter === rating ? 'fill-[#0f0f0f]' : 'fill-[#d4af37] text-[#d4af37]'}`} />
                      <span>{rating}+ Stars</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h5 className="text-white mb-3">Sort By</h5>
                <div className="space-y-2">
                  {[
                    { value: 'rating', label: 'Rating' },
                    { value: 'distance', label: 'Distance' },
                    { value: 'price', label: 'Price' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value as any)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
                        sortBy === option.value
                          ? 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f]'
                          : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a] border border-[#3a3a3a]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(priceFilter.length > 0 || ratingFilter > 0) && (
                <button
                  onClick={() => {
                    setPriceFilter([]);
                    setRatingFilter(0);
                  }}
                  className="w-full mt-6 px-4 py-2.5 bg-[#2a2a2a] text-gray-300 rounded-lg hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all border border-[#3a3a3a]"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {filteredRestaurants.length === 0 ? (
              <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#2a2a2a] p-16 text-center">
                <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-white mb-2">No restaurants found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your filters or search query</p>
                <button
                  onClick={() => {
                    setPriceFilter([]);
                    setRatingFilter(0);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f] rounded-lg hover:shadow-lg hover:shadow-[#d4af37]/30 transition-all font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredRestaurants.map((restaurant, index) => {
                  const matchingItems = matchingMenuItems.filter(item => item.restaurantId === restaurant.id);
                  
                  return (
                    <motion.div
                      key={restaurant.id}
                      onClick={() => onSelectRestaurant(restaurant)}
                      className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all overflow-hidden cursor-pointer group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -5, scale: 1.01 }}
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Image */}
                        <div className="md:w-80 h-64 md:h-auto relative overflow-hidden">
                          <img 
                            src={restaurant.image} 
                            alt={restaurant.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a1a1a]/50"></div>
                          <div className="absolute top-4 right-4 px-4 py-2 bg-[#1a1a1a]/90 backdrop-blur-sm rounded-full shadow-lg border border-[#d4af37]/30">
                            <div className="flex items-center gap-1.5">
                              <Star className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                              <span className="text-white font-medium">{restaurant.rating}</span>
                            </div>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="text-white mb-2">{restaurant.name}</h4>
                              <div className="flex items-center gap-3 text-gray-400">
                                <span>{restaurant.cuisine}</span>
                                <span>•</span>
                                <span className="text-[#d4af37]">{restaurant.priceRange}</span>
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-300 mb-4 line-clamp-2">{restaurant.description}</p>

                          {matchingItems.length > 0 && (
                            <div className="mb-4 p-3 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-xl">
                              <p className="text-[#d4af37] mb-2">Matching items:</p>
                              <div className="flex flex-wrap gap-2">
                                {matchingItems.slice(0, 3).map((item) => (
                                  <span key={item.id} className="px-3 py-1 bg-[#2a2a2a] text-gray-300 rounded-lg border border-[#3a3a3a]">
                                    {item.name}
                                  </span>
                                ))}
                                {matchingItems.length > 3 && (
                                  <span className="px-3 py-1 text-[#d4af37]">
                                    +{matchingItems.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-4 text-gray-400">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-[#d4af37]" />
                              <span>{restaurant.distance} km</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-[#d4af37]" />
                              <span>{restaurant.openingHours}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}