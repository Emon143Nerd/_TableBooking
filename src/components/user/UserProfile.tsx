import { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Edit2, Save, X, Camera, User, Crown, Award, Calendar, LogOut } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Footer } from './Footer';
import { useAuthStore } from '../../store/useAuthStore';

interface UserProfileProps {
  user: { id: string; name: string; email: string };
  onBack: () => void;
}

export function UserProfile({ user, onBack }: UserProfileProps) {
  const { logout } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    dateOfBirth: '1990-01-15',
    memberSince: 'January 2024',
  });

  const stats = {
    totalBookings: 24,
    upcomingBookings: 3,
    favoriteRestaurants: 8,
    rewardPoints: 1250,
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
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
              <h2 className="text-white">My Profile</h2>
              <p className="text-gray-400">Manage your account settings</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#2a2a2a] overflow-hidden">
              {/* Profile Header with gradient */}
              <div className="relative h-32 bg-gradient-to-br from-[#d4af37] to-[#b8860b]">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wLTE4YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0xOCAwYzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
              </div>

              {/* Avatar */}
              <div className="px-6 pb-6">
                <div className="relative -mt-16 mb-4">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#d4af37] to-[#b8860b] rounded-full flex items-center justify-center shadow-2xl border-4 border-[#1a1a1a]">
                    <User className="w-16 h-16 text-[#0f0f0f]" />
                  </div>
                  <button className="absolute bottom-0 right-1/2 translate-x-16 translate-y-2 p-2 bg-[#d4af37] rounded-full hover:bg-[#b8860b] transition-all shadow-lg">
                    <Camera className="w-4 h-4 text-[#0f0f0f]" />
                  </button>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-white mb-1">{profileData.name}</h3>
                  <p className="text-gray-400 mb-3">{profileData.email}</p>
                  <div className="flex items-center justify-center gap-2 px-4 py-2 bg-[#d4af37]/10 rounded-full border border-[#d4af37]/20 w-fit mx-auto">
                    <Crown className="w-4 h-4 text-[#d4af37]" />
                    <span className="text-[#d4af37]">Premium Member</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#2a2a2a] rounded-xl p-4 text-center border border-[#3a3a3a]">
                    <div className="text-[#d4af37] mb-1">{stats.totalBookings}</div>
                    <p className="text-gray-400">Total Bookings</p>
                  </div>
                  <div className="bg-[#2a2a2a] rounded-xl p-4 text-center border border-[#3a3a3a]">
                    <div className="text-[#d4af37] mb-1">{stats.rewardPoints}</div>
                    <p className="text-gray-400">Points</p>
                  </div>
                  <div className="bg-[#2a2a2a] rounded-xl p-4 text-center border border-[#3a3a3a]">
                    <div className="text-[#d4af37] mb-1">{stats.upcomingBookings}</div>
                    <p className="text-gray-400">Upcoming</p>
                  </div>
                  <div className="bg-[#2a2a2a] rounded-xl p-4 text-center border border-[#3a3a3a]">
                    <div className="text-[#d4af37] mb-1">{stats.favoriteRestaurants}</div>
                    <p className="text-gray-400">Favorites</p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={() => {
                    logout();
                    toast.success('Logged out successfully');
                    onBack();
                  }}
                  className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all font-medium group"
                >
                  <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Rewards Card */}
            <div className="mt-6 bg-gradient-to-br from-[#d4af37] to-[#b8860b] rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-[#0f0f0f]" />
                <h4 className="text-[#0f0f0f]">Rewards Program</h4>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#0f0f0f]/80">Progress to Gold</span>
                  <span className="text-[#0f0f0f]">{stats.rewardPoints}/2000</span>
                </div>
                <div className="h-2 bg-[#0f0f0f]/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#0f0f0f]/40 rounded-full transition-all"
                    style={{ width: `${(stats.rewardPoints / 2000) * 100}%` }}
                  />
                </div>
              </div>
              <p className="text-[#0f0f0f]/80">Earn 750 more points to unlock exclusive perks!</p>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#2a2a2a] p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-white">Personal Information</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f] rounded-lg hover:shadow-lg hover:shadow-[#d4af37]/30 transition-all font-medium"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2.5 bg-[#2a2a2a] text-gray-300 rounded-lg hover:bg-[#3a3a3a] transition-all font-medium border border-[#3a3a3a]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f] rounded-lg hover:shadow-lg hover:shadow-[#d4af37]/30 transition-all font-medium"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="flex items-center gap-2 text-gray-400 mb-2">
                    <User className="w-4 h-4 text-[#d4af37]" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent transition-all"
                    />
                  ) : (
                    <p className="text-white bg-[#2a2a2a] px-4 py-3 rounded-xl">{profileData.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-gray-400 mb-2">
                    <Mail className="w-4 h-4 text-[#d4af37]" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent transition-all"
                    />
                  ) : (
                    <p className="text-white bg-[#2a2a2a] px-4 py-3 rounded-xl">{profileData.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 text-gray-400 mb-2">
                    <Phone className="w-4 h-4 text-[#d4af37]" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent transition-all"
                    />
                  ) : (
                    <p className="text-white bg-[#2a2a2a] px-4 py-3 rounded-xl">{profileData.phone}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="flex items-center gap-2 text-gray-400 mb-2">
                    <Calendar className="w-4 h-4 text-[#d4af37]" />
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                      className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent transition-all"
                    />
                  ) : (
                    <p className="text-white bg-[#2a2a2a] px-4 py-3 rounded-xl">
                      {new Date(profileData.dateOfBirth).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-gray-400 mb-2">
                    <MapPin className="w-4 h-4 text-[#d4af37]" />
                    Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent transition-all"
                    />
                  ) : (
                    <p className="text-white bg-[#2a2a2a] px-4 py-3 rounded-xl">{profileData.address}</p>
                  )}
                </div>
              </div>

              {/* Preferences Section */}
              <div className="mt-10 pt-8 border-t border-[#2a2a2a]">
                <h4 className="text-white mb-6">Preferences</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#2a2a2a] rounded-xl border border-[#3a3a3a]">
                    <div>
                      <p className="text-white mb-1">Email Notifications</p>
                      <p className="text-gray-400">Receive booking confirmations via email</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-full h-full bg-[#3a3a3a] peer-checked:bg-[#d4af37] rounded-full transition-all cursor-pointer"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#2a2a2a] rounded-xl border border-[#3a3a3a]">
                    <div>
                      <p className="text-white mb-1">SMS Reminders</p>
                      <p className="text-gray-400">Get booking reminders via SMS</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-full h-full bg-[#3a3a3a] peer-checked:bg-[#d4af37] rounded-full transition-all cursor-pointer"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#2a2a2a] rounded-xl border border-[#3a3a3a]">
                    <div>
                      <p className="text-white mb-1">Promotional Offers</p>
                      <p className="text-gray-400">Receive exclusive deals and offers</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-full h-full bg-[#3a3a3a] peer-checked:bg-[#d4af37] rounded-full transition-all cursor-pointer"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}