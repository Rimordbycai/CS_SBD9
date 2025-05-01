import { useState, useEffect } from 'react';
import { getAllItems } from '../config/api';

export default function ProductsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await getAllItems();
        setItems(data.payload);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        setLoading(false);
        console.error('Error fetching items:', err);
      }
    };

    fetchItems();
  }, []);

  // Get unique store IDs for filtering
const storeNames = items.length > 0 
  ? ['all', ...new Set(items.map(item => item.store_name))]
  : ['all'];
  
  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.store_name === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Product Catalog</h1>
      
      {/* Category Filter */}
      <div className="mb-6">
        <label htmlFor="category" className="block text-sm font-medium mb-2">Filter by Store:</label>
        <select 
          id="category"
          className="w-full md:w-64 p-2 border border-gray-300 rounded-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {storeNames.map((storeName) => (
            <option key={storeName} value={storeName}>
              {storeName === 'all' ? 'All Stores' : storeName}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 p-4 rounded-md text-red-700">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <img 
                  src={`/api/placeholder/200/200`} 
                  alt={item.item_namename} 
                  className="max-h-full object-contain"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{item.item_name}</h2>
                <p className="text-gray-600 mb-2">{item.store_name}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">${item.price.toFixed(2)}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.stock > 10 ? 'bg-green-100 text-green-800' : item.stock > 5 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.stock} in stock
                  </span>
                </div>
                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && filteredItems.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No products found.</p>
        </div>
      )}
    </div>
  );
}