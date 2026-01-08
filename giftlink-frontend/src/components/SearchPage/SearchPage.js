import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchPage.css';
import { urlConfig } from '../../config';

function SearchPage() {
  // Task 1: Define state variables
  const [searchQuery, setSearchQuery] = useState('');
  const [ageRange, setAgeRange] = useState(6); // Minimum value
  const [searchResults, setSearchResults] = useState([]);

  const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
  const conditions = ['New', 'Like New', 'Older'];

  const navigate = useNavigate();

  // Fetch all products once (initial load)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${urlConfig.backendUrl}/api/gifts`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Fetch error: ' + error.message);
      }
    };
    fetchProducts();
  }, []);

  // 🧩 Task 2: Fetch search results based on user inputs
  const handleSearch = async () => {
    const baseUrl = `${urlConfig.backendUrl}/api/search?`;
    const queryParams = new URLSearchParams({
      name: searchQuery,
      age_years: ageRange,
      category: document.getElementById('categorySelect').value,
      condition: document.getElementById('conditionSelect').value,
    }).toString();

    try {
      const response = await fetch(`${baseUrl}${queryParams}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Failed to fetch search results:', error);
    }
  };

  // 🧩 Task 6: Navigate to Details page
  const goToDetailsPage = (productId) => {
    navigate(`/app/product/${productId}`);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="filter-section mb-3 p-4 border rounded">
            <h4 className="mb-3">Search Filters</h4>

            {/* Task 7: Text input for search query */}
            <label htmlFor="searchQuery">Search</label>
            <input
              id="searchQuery"
              type="text"
              className="form-control mb-3"
              placeholder="Enter a keyword (e.g., chair, sofa)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Task 3: Dropdowns */}
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="categorySelect">Category</label>
                <select id="categorySelect" className="form-control my-1">
                  <option value="">All</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="conditionSelect">Condition</label>
                <select id="conditionSelect" className="form-control my-1">
                  <option value="">All</option>
                  {conditions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Task 4: Age range slider */}
            <label htmlFor="ageRange" className="mt-3">
              Less than {ageRange} years
            </label>
            <input
              type="range"
              className="form-control-range"
              id="ageRange"
              min="1"
              max="10"
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
            />

            {/* Task 8: Search button */}
            <button onClick={handleSearch} className="btn btn-primary w-100 mt-3">
              Search
            </button>
          </div>

          {/* Task 5: Display search results */}
          <div className="search-results mt-4">
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <div key={product.id} className="card mb-3">
                  {product.image && (
                    <img src={product.image} alt={product.name} className="card-img-top" />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">
                      {product.description ? product.description.slice(0, 100) : 'No description'}
                      ...
                    </p>
                  </div>
                  <div className="card-footer">
                    <button
                      onClick={() => goToDetailsPage(product.id)}
                      className="btn btn-primary"
                    >
                      View More
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="alert alert-info" role="alert">
                No products found. Please revise your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
