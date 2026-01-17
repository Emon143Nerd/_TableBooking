import { useState } from 'react';
import { UserHome } from './UserHome';
import { FoodSearchResults } from './FoodSearchResults';
import { RestaurantProfile } from './RestaurantProfile';
import { UserBookings } from './UserBookings';
import { UserProfile } from './UserProfile';
import { BookingConfirmation } from './BookingConfirmation';
import { AuthModal } from './AuthModal';
import { PaymentModal } from './PaymentModal';
import { EnhancedBookingModal } from './EnhancedBookingModal';
import { Restaurant, Booking } from '../../types';
import { Toaster } from '../ui/sonner';
import { useAuthStore } from '../../store/useAuthStore';

export type UserView = 'home' | 'search' | 'restaurant' | 'bookings' | 'profile' | 'confirmation';

export function UserPortal() {
  const { user, isAuthenticated } = useAuthStore();
  const [currentView, setCurrentView] = useState<UserView>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentView('search');
  };

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentView('restaurant');
  };

  const handleBookingClick = (restaurant: Restaurant) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      setSelectedRestaurant(restaurant);
      return;
    }
    setSelectedRestaurant(restaurant);
    setShowBookingModal(true);
  };

  const handleBookingComplete = (booking: Booking) => {
    setCurrentBooking(booking);
    setShowBookingModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setCurrentView('confirmation');
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-center" richColors />
      
      {currentView === 'home' && (
        <UserHome 
          onSearch={handleSearch}
          onSelectRestaurant={handleSelectRestaurant}
          onNavigate={setCurrentView}
          onAuthClick={() => setShowAuthModal(true)}
          isAuthenticated={isAuthenticated}
        />
      )}
      
      {currentView === 'search' && (
        <FoodSearchResults 
          searchQuery={searchQuery}
          onSelectRestaurant={handleSelectRestaurant}
          onBack={() => setCurrentView('home')}
        />
      )}
      
      {currentView === 'restaurant' && selectedRestaurant && (
        <RestaurantProfile 
          restaurant={selectedRestaurant}
          onBack={() => setCurrentView('search')}
          onBookingComplete={handleBookingComplete}
          onBookingClick={() => handleBookingClick(selectedRestaurant)}
        />
      )}
      
      {currentView === 'bookings' && (
        <UserBookings 
          onBack={() => setCurrentView('home')}
        />
      )}
      
      {currentView === 'profile' && user && (
        <UserProfile 
          onBack={() => setCurrentView('home')}
          user={user}
        />
      )}
      
      {currentView === 'confirmation' && currentBooking && (
        <BookingConfirmation 
          booking={currentBooking}
          onBack={() => setCurrentView('home')}
        />
      )}

      {/* Modals */}
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
        />
      )}
      
      {showBookingModal && selectedRestaurant && (
        <EnhancedBookingModal 
          restaurant={selectedRestaurant}
          onClose={() => setShowBookingModal(false)}
          onComplete={handleBookingComplete}
        />
      )}

      {showPaymentModal && currentBooking && (
        <PaymentModal 
          booking={currentBooking}
          onClose={() => setShowPaymentModal(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}
