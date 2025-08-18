import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const WBDistrictCrops = () => {
  const navigate = useNavigate();
  const [districtsData, setDistrictsData] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const res = await fetch("http://localhost:7860/districts");
        
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        setDistrictsData(data);
        toast.success("Districts loaded successfully!");
      } catch (err) {
        setError(err.message);
        toast.error(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchDistricts();
  }, []);

  // Handle potential missing data in district objects
  const safeSplit = (str) => {
    if (!str) return [];
    return str.split(";").map(item => item.trim()).filter(item => item);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header 
        className="relative bg-[url('/assets/west-bengal-fields.jpg')] bg-cover bg-center h-64 flex items-center justify-center shadow-lg"
        aria-label="Rice fields in West Bengal"
      >
        <div 
          className="absolute inset-0 bg-black bg-opacity-50"
          aria-hidden="true"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold p-4">
            West Bengal District Crop Details
          </h1>
          <button 
            onClick={() => navigate("/")}
            className="mt-2 text-green-200 hover:text-white underline text-sm"
            aria-label="Return to home page"
          >
            ← Back to Home
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* District list */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Districts of West Bengal</h2>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <svg className="animate-spin h-12 w-12 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-4 text-gray-600">Loading districts...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="text-red-700 font-semibold">Error loading data</h3>
                <p className="text-red-600 mt-2">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <ul className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {districtsData.map((district, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedDistrict(district)}
                    className={`p-4 rounded-lg cursor-pointer transition ${
                      selectedDistrict?.Name === district.Name
                        ? "bg-green-600 text-white shadow-md"
                        : "bg-green-50 hover:bg-green-100"
                    }`}
                    aria-label={`View details for ${district.Name}`}
                  >
                    <div className="flex items-center">
                      <span className="text-lg font-medium">{district.Name}</span>
                      {selectedDistrict?.Name === district.Name && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* District details */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">
              {selectedDistrict ? `${selectedDistrict.Name} Details` : "District Information"}
            </h2>
            
            {!selectedDistrict ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg">Select a district to view its agricultural details</p>
                <p className="mt-2">Explore crops, fruits, and vegetables grown in West Bengal districts</p>
              </div>
            ) : (
              <motion.div
                key={selectedDistrict.Name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-green-700">Overview</h3>
                  <p className="mt-2 text-gray-700">
                    {selectedDistrict.Description || "Agricultural information about this district."}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-green-600 mb-3">Agricultural Profile</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                        Major Field Crops
                      </h4>
                      {safeSplit(selectedDistrict.MajorCrops).length > 0 ? (
                        <ul className="mt-2 grid grid-cols-2 gap-2">
                          {safeSplit(selectedDistrict.MajorCrops).map((crop, i) => (
                            <li key={i} className="bg-white p-2 rounded border flex items-center">
                              <span className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">{i+1}</span>
                              {crop}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 mt-2">No major field crops information available</p>
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                        </svg>
                        Fruits
                      </h4>
                      {safeSplit(selectedDistrict.Fruits).length > 0 ? (
                        <ul className="mt-2 grid grid-cols-2 gap-2">
                          {safeSplit(selectedDistrict.Fruits).map((fruit, i) => (
                            <li key={i} className="bg-white p-2 rounded border flex items-center">
                              <span className="bg-yellow-100 w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">{i+1}</span>
                              {fruit}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 mt-2">No fruits information available</p>
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                        </svg>
                        Vegetables
                      </h4>
                      {safeSplit(selectedDistrict.Vegetables).length > 0 ? (
                        <ul className="mt-2 grid grid-cols-2 gap-2">
                          {safeSplit(selectedDistrict.Vegetables).map((veg, i) => (
                            <li key={i} className="bg-white p-2 rounded border flex items-center">
                              <span className="bg-orange-100 w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">{i+1}</span>
                              {veg}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 mt-2">No vegetables information available</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 bg-green-700 text-white text-sm mt-auto">
        © {new Date().getFullYear()} Crop Yield Prediction | Precision Agriculture
        <br /> <span className="text-yellow-200">GO GREEN </span>
      </footer>
    </div>
  );
};

export default WBDistrictCrops;