import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, DollarSign, Users, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export function Analytics() {
  const statsRef = useRef(null);
  const chartsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const chartsInView = useInView(chartsRef, { once: true, amount: 0.2 });
  
  // Sample data for charts
  const revenueData = [
    { day: 'Mon', revenue: 420 },
    { day: 'Tue', revenue: 380 },
    { day: 'Wed', revenue: 460 },
    { day: 'Thu', revenue: 520 },
    { day: 'Fri', revenue: 680 },
    { day: 'Sat', revenue: 750 },
    { day: 'Sun', revenue: 690 },
  ];

  const occupancyData = [
    { hour: '11AM', occupancy: 30 },
    { hour: '12PM', occupancy: 50 },
    { hour: '1PM', occupancy: 65 },
    { hour: '2PM', occupancy: 45 },
    { hour: '6PM', occupancy: 75 },
    { hour: '7PM', occupancy: 90 },
    { hour: '8PM', occupancy: 95 },
    { hour: '9PM', occupancy: 80 },
    { hour: '10PM', occupancy: 60 },
  ];

  const menuPopularity = [
    { name: 'Burgers', value: 35 },
    { name: 'Pizza', value: 25 },
    { name: 'Sides', value: 20 },
    { name: 'Drinks', value: 15 },
    { name: 'Desserts', value: 5 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div>
      <div className="mb-8">
        <h2 className="mb-2 dark:text-white">Analytics & Reporting</h2>
        <p className="text-gray-600 dark:text-gray-400">Track your restaurant's performance and insights</p>
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
              +15%
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-1">Weekly Revenue</p>
          <h3 className="text-blue-600 dark:text-blue-400">$4,200</h3>
        </div>

        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +12%
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-1">Total Bookings</p>
          <h3 className="text-green-600 dark:text-green-400">248</h3>
        </div>

        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +8%
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-1">Avg. Occupancy</p>
          <h3 className="text-yellow-600 dark:text-yellow-400">78%</h3>
        </div>

        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +10%
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-1">Avg. Revenue/Booking</p>
          <h3 className="text-purple-600 dark:text-purple-400">$16.93</h3>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6">
          <h3 className="mb-6 dark:text-white">Daily Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="day" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" name="Revenue ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Occupancy Chart */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6">
          <h3 className="mb-6 dark:text-white">Peak Hour Occupancy</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="hour" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              <Legend />
              <Line type="monotone" dataKey="occupancy" stroke="#10b981" strokeWidth={2} name="Occupancy (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Menu Popularity & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Menu Popularity */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6">
          <h3 className="mb-6 dark:text-white">Popular Menu Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={menuPopularity}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {menuPopularity.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-6 space-y-2">
            {menuPopularity.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                </div>
                <span className="text-gray-600 dark:text-gray-400">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Items */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6">
          <h3 className="mb-6 dark:text-white">Top Performing Items</h3>
          <div className="space-y-4">
            {[
              { name: 'Classic Cheeseburger', orders: 145, revenue: 1883.55 },
              { name: 'Bacon Deluxe', orders: 128, revenue: 2046.72 },
              { name: 'Margherita Pizza', orders: 98, revenue: 1469.02 },
              { name: 'Pepperoni Pizza', orders: 87, revenue: 1478.13 },
              { name: 'French Fries', orders: 203, revenue: 1012.97 },
            ].map((item, index) => (
              <div key={item.name} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400">#{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="mb-1 dark:text-white">{item.name}</p>
                  <p className="text-gray-600 dark:text-gray-400">{item.orders} orders</p>
                </div>
                <p className="text-green-600 dark:text-green-400">${item.revenue.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6 mt-8">
        <h3 className="mb-6 dark:text-white">Monthly Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Total Customers</p>
            <p className="text-blue-600 dark:text-blue-400">892</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Repeat Customers</p>
            <p className="text-green-600 dark:text-green-400">47%</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Avg. Table Duration</p>
            <p className="text-yellow-600 dark:text-yellow-400">1.4 hrs</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Customer Satisfaction</p>
            <p className="text-purple-600 dark:text-purple-400">4.7/5.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}