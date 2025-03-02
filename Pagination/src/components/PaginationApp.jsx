import { useState, useEffect } from "react";
import axios from "axios";

const PaginationApp = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState(null); // next cursor
  const [prevCursor, setPrevCursor] = useState(null); // previous cursor
  const limit = 10;

  // Fetch next page using "nextCursor" parameter and direction "next"
  const fetchNextPage = async () => {
    try {
      setLoading(true);
      const params = { limit: limit }; // changed from limits to limit
      if (nextCursor) {
        params.cursor = nextCursor;
        params.direction = "next";
      }
      const { data } = await axios.get(
        "http://localhost:3000/pagination/posts",
        { params }
      );
      // Update state using "data" field from backend response
      setItems(data.results);
      console.log(data.results);
      setNextCursor(data.nextCursor);
      setPrevCursor(data.prevCursor);
    } catch (error) {
      console.error("Error fetching next page:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch previous page using "prevCursor" parameter and direction "prev"
  const fetchPrevPage = async () => {
    try {
      setLoading(true);
      const params = { limit: limit }; // changed from limits to limit
      if (prevCursor) {
        params.cursor = prevCursor;
        params.direction = "prev";
      }
      const { data } = await axios.get(
        "http://localhost:3000/pagination/posts",
        { params }
      );
      // Update state using "data" field from backend response
      setItems(data.results);
      setNextCursor(data.nextCursor);
      setPrevCursor(data.prevCursor);
    } catch (error) {
      console.error("Error fetching previous page:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load using fetchNextPage
    fetchNextPage();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Items List</h2>
      {/* List of items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {item.name}
            </h3>
            <p className="text-gray-600">{item.email}</p>
          </div>
        ))}
      </div>

      {/* Loading spinner */}
      {loading && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Navigation buttons */}
      {!loading && (
        <div className="flex justify-between mt-6">
          <button
            onClick={fetchPrevPage}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-300"
          >
            Previous
          </button>
          <button
            onClick={fetchNextPage}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginationApp;
