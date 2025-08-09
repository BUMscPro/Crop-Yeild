import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CropRecommendation from './pages/CropRecommendation';
import DistrictCrops from './pages/WBDistrictCrops';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Router>
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-green-700 tracking-wide">
            AgriSmart
          </div>
          <div className="flex gap-6 text-gray-700 font-medium">
            <Link
              to="/"
              className="hover:text-green-700 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/crop-recommendation"
              className="hover:text-green-700 transition-colors"
            >
              Crop Recommendation
            </Link>
                <Link
              to="/crops"
              className="hover:text-green-700 transition-colors"
            >
              District Crops
            </Link>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crop-recommendation" element={<CropRecommendation />} />
        <Route path="/crops" element={<DistrictCrops />} />
      </Routes>
           <Toaster position="top-right" reverseOrder={false} />
    </Router>

  );
};

export default App;
