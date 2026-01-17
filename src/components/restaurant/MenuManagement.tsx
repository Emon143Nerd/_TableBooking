import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';
import { MenuItem } from '../../types';
import { useRestaurantStore } from '../../store/useRestaurantStore';

export function MenuManagement() {
  const { menuItems, addMenuItem, deleteMenuItem } = useRestaurantStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const restaurantId = '1'; // The Burger House
  
  // New Item Form State
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Burgers',
    description: '',
    price: '',
    image: '',
    available: true
  });

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];
  
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (itemName: string) => {
    toast.info(`Opening editor for ${itemName}...`);
  };

  const handleDelete = (id: string) => {
    deleteMenuItem(id);
    toast.success('Menu item deleted!');
  };

  const handleAddItem = () => {
    setShowAddModal(true);
  };

  const submitNewItem = () => {
    if (!newItem.name || !newItem.price) {
      toast.error('Please fill in required fields');
      return;
    }

    const item: MenuItem = {
      id: `m_${Date.now()}`,
      restaurantId,
      name: newItem.name,
      category: newItem.category,
      description: newItem.description || 'Tasty delight',
      price: parseFloat(newItem.price),
      image: newItem.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop',
      available: newItem.available
    };

    addMenuItem(item);
    setShowAddModal(false);
    setNewItem({ name: '', category: 'Burgers', description: '', price: '', image: '', available: true });
    toast.success('New menu item added!');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="mb-2 dark:text-white">Menu Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Add, edit, or remove menu items</p>
        </div>
        <button
          onClick={handleAddItem}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Menu Item
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-[#3a3a3a] bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items Table */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm dark:shadow-none dark:border dark:border-[#2a2a2a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-[#2a2a2a] border-b border-gray-200 dark:border-[#333]">
              <tr>
                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Image</th>
                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Name</th>
                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Category</th>
                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Description</th>
                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Price</th>
                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Status</th>
                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-[#2a2a2a]">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-[#2a2a2a]">
                  <td className="px-6 py-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="dark:text-white">{item.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600 dark:text-gray-400 max-w-xs truncate">{item.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-green-600 dark:text-green-400">${item.price}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full ${
                      item.available 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      {item.available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(item.name)}
                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400">No menu items found</p>
          </div>
        )}
      </div>

      {/* Add Menu Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border dark:border-[#2a2a2a]">
            <div className="sticky top-0 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#2a2a2a] px-6 py-4 flex items-center justify-between">
              <h3 className="dark:text-white">Add Menu Item</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Item Name</label>
                <input
                  type="text"
                  placeholder="e.g., Classic Cheeseburger"
                  value={newItem.name}
                  onChange={e => setNewItem({...newItem, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-[#3a3a3a] bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <select 
                  value={newItem.category}
                  onChange={e => setNewItem({...newItem, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-[#3a3a3a] bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Burgers</option>
                  <option>Sides</option>
                  <option>Drinks</option>
                  <option>Desserts</option>
                  <option>Rice</option>
                  <option>Curry</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  placeholder="Describe your menu item..."
                  rows={3}
                  value={newItem.description}
                  onChange={e => setNewItem({...newItem, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-[#3a3a3a] bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Price (TK)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newItem.price}
                  onChange={e => setNewItem({...newItem, price: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-[#3a3a3a] bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={newItem.image}
                  onChange={e => setNewItem({...newItem, image: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-[#3a3a3a] bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="available"
                  checked={newItem.available}
                  onChange={e => setNewItem({...newItem, available: e.target.checked})}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="available" className="text-gray-700 dark:text-gray-300">Mark as available</label>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white dark:bg-[#1a1a1a] border-t border-gray-200 dark:border-[#2a2a2a] px-6 py-4 flex gap-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-2 border-2 border-gray-300 dark:border-[#3a3a3a] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitNewItem}
                className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
