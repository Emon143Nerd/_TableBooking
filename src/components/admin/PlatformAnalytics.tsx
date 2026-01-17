import { TrendingUp, DollarSign, Users, Store } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function PlatformAnalytics() {
  const monthlyData = [
    { month: 'Jan', revenue: 45000, bookings: 3200, users: 8500 },
    { month: 'Feb', revenue: 52000, bookings: 3600, users: 9200 },
    { month: 'Mar', revenue: 48000, bookings: 3400, users: 9800 },
    { month: 'Apr', revenue: 61000, bookings: 4100, users: 10500 },
    { month: 'May', revenue: 58000, bookings: 3900, users: 11200 },
    { month: 'Jun', revenue: 70000, bookings: 4600, users: 11800 },
    { month: 'Jul', revenue: 75000, bookings: 5000, users: 12100 },
    { month: 'Aug', revenue: 72000, bookings: 4800, users: 12300 },
    { month: 'Sep', revenue: 68000, bookings: 4500, users: 12400 },
    { month: 'Oct', revenue: 78000, bookings: 5200, users: 12450 },
    { month: 'Nov', revenue: 89450, bookings: 5800, users: 12458 },
  ];

  const restaurantGrowth = [
    { month: 'Jan', restaurants: 95 },
    { month: 'Feb', restaurants: 98 },
    { month: 'Mar', restaurants: 102 },
    { month: 'Apr', restaurants: 107 },
    { month: 'May', restaurants: 110 },
    { month: 'Jun', restaurants: 114 },
    { month: 'Jul', restaurants: 117 },
    { month: 'Aug', restaurants: 120 },
    { month: 'Sep', restaurants: 122 },
    { month: 'Oct', restaurants: 124 },
    { month: 'Nov', restaurants: 127 },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="mb-2 dark:text-white">Platform Analytics</h2>
        <p className="text-gray-600 dark:text-gray-400">View platform-wide performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +18%
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-1">Total Revenue (Nov)</p>
          <h3 className="text-blue-600 dark:text-blue-400">$89,450</h3>
        </div>

        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Store className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +5
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-1">Total Restaurants</p>
          <h3 className="text-green-600 dark:text-green-400">127</h3>
        </div>

        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +234
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-1">Total Users</p>
          <h3 className="text-yellow-600 dark:text-yellow-400">12,458</h3>
        </div>

        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +25%
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-1">Total Bookings</p>
          <h3 className="text-purple-600 dark:text-purple-400">8,932</h3>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue & Bookings */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6">
          <h3 className="mb-6 dark:text-white">Revenue & Bookings Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis yAxisId="left" stroke="#888" />
              <YAxis yAxisId="right" orientation="right" stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Revenue ($)" />
              <Line yAxisId="right" type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={2} name="Bookings" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Restaurant Growth */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6">
          <h3 className="mb-6 dark:text-white">Restaurant Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={restaurantGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              <Legend />
              <Bar dataKey="restaurants" fill="#8b5cf6" name="Active Restaurants" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Platform Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6">
          <h4 className="mb-4 dark:text-white">Revenue Distribution</h4>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 dark:text-gray-300">Booking Fees</span>
                <span className="text-gray-600 dark:text-gray-400">65%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-[#3a3a3a] rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 dark:text-gray-300">Commission</span>
                <span className="text-gray-600 dark:text-gray-400">25%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-[#3a3a3a] rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 dark:text-gray-300">Penalties</span>
                <span className="text-gray-600 dark:text-gray-400">10%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-[#3a3a3a] rounded-full h-3">
                <div className="bg-yellow-600 h-3 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6">
          <h4 className="mb-4 dark:text-white">Top Performing Cities</h4>
          <div className="space-y-3">
            {[
              { city: 'New York', bookings: 2340, revenue: 28080 },
              { city: 'Los Angeles', bookings: 1890, revenue: 22680 },
              { city: 'Chicago', bookings: 1560, revenue: 18720 },
              { city: 'San Francisco', bookings: 1420, revenue: 17040 },
            ].map((city, index) => (
              <div key={city.city} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="dark:text-white">{city.city}</p>
                    <p className="text-gray-600 dark:text-gray-400">{city.bookings} bookings</p>
                  </div>
                </div>
                <p className="text-green-600 dark:text-green-400">${city.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6">
          <h4 className="mb-4 dark:text-white">Top Cuisines</h4>
          <div className="space-y-3">
            {[
              { cuisine: 'Italian', percentage: 28 },
              { cuisine: 'American', percentage: 24 },
              { cuisine: 'Asian', percentage: 20 },
              { cuisine: 'Mexican', percentage: 15 },
              { cuisine: 'Indian', percentage: 13 },
            ].map((item) => (
              <div key={item.cuisine}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300">{item.cuisine}</span>
                  <span className="text-gray-600 dark:text-gray-400">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-[#3a3a3a] rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6">
        <h3 className="mb-6 dark:text-white">Key Performance Indicators</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Avg. Booking Value</p>
            <p className="text-blue-600 dark:text-blue-400">$16.89</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Platform Fee</p>
            <p className="text-green-600 dark:text-green-400">8.5%</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Cancellation Rate</p>
            <p className="text-yellow-600 dark:text-yellow-400">6.2%</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">User Retention</p>
            <p className="text-purple-600 dark:text-purple-400">78%</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Avg. Rating</p>
            <p className="text-orange-600 dark:text-orange-400">4.6/5.0</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Monthly Growth</p>
            <p className="text-green-600 dark:text-green-400">+18%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
