import { useState, useEffect } from "react";
import axios from "axios";

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState(null); // next cursor
  const [prevCursor, setPrevCursor] = useState(null); // previous cursor
  const limit = 10;

  // Modified fetchItems accepts a direction: 'next', 'prev', or undefined for initial load
  const fetchItems = async (direction) => {
    try {
      setLoading(true);
      const params = { limits: limit };
      if (direction === "next" && cursor) {
        params.cursor = cursor;
      } else if (direction === "prev" && prevCursor) {
        params.prevCursor = prevCursor;
      }
      const response = await axios.get(`http://localhost:3000/pagination`, {
        params,
      });

      // Replace items on each navigation
      setItems(response.data.items);
      setCursor(response.data.nextCursor);
      setPrevCursor(response.data.prevCursor);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load without any cursor params
    fetchItems();
  }, []);

  const nextPage = () => {
    if (!loading && cursor) {
      fetchItems("next");
    }
  };

  const prevPage = () => {
    if (!loading && prevCursor) {
      fetchItems("prev");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Items List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {item.name}
            </h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Navigation buttons */}
      {!loading && (
        <div className="flex justify-between mt-6">
          <button
            onClick={prevPage}
            disabled={!prevCursor}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-300"
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={!cursor}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Items;
