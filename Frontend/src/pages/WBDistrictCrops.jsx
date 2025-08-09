import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const WBDistrictCrops = () => {
  const [districtsData, setDistrictsData] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    fetch("http://localhost:7860/districts") // Your backend API endpoint
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch district data");
        }
        return res.json();
      })
      .then((data) => {
        setDistrictsData(data);
        toast.success("Districts loaded successfully!");
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        toast.error("Error loading districts!");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[url('https://upload.wikimedia.org/wikipedia/commons/b/b8/Rice_field_in_West_Bengal.jpg')] bg-cover bg-center h-64 flex items-center justify-center shadow-lg">
        <h1 className="text-white text-3xl md:text-4xl font-bold bg-black bg-opacity-50 p-4 rounded-lg shadow-lg">
          West Bengal District Crop Details
        </h1>
      </header>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8">
        
        {/* District list */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">Districts</h2>
          {loading ? (
            <p className="text-gray-500">Loading districts...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <ul className="space-y-2">
              {districtsData.map((district, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedDistrict(district)}
                  className="p-3 bg-green-100 rounded-lg cursor-pointer hover:bg-green-200 transition"
                >
                  {district.Name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* District details */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-center">
          {!selectedDistrict ? (
            <p className="text-gray-500">Select a district to view details 🌾</p>
          ) : (
            <motion.div
              key={selectedDistrict.Name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-green-700">{selectedDistrict.Name}</h2>
              <p className="mt-2 text-gray-700">{selectedDistrict.Description}</p>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-green-600">Major Field Crops</h3>
                <ul className="list-disc list-inside">
                  {selectedDistrict.MajorCrops.split(";").map((crop, i) => (
                    <li key={i}>{crop.trim()}</li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold text-green-600 mt-3">Fruits</h3>
                <ul className="list-disc list-inside">
                  {selectedDistrict.Fruits.split(";").map((fruit, i) => (
                    <li key={i}>{fruit.trim()}</li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold text-green-600 mt-3">Vegetables</h3>
                <ul className="list-disc list-inside">
                  {selectedDistrict.Vegetables.split(";").map((veg, i) => (
                    <li key={i}>{veg.trim()}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </div>

        {/* Footer */}
   <footer className="text-center py-6 bg-green-700 text-white text-sm mt-12">
        © {new Date().getFullYear()} Crop Yield Prediction | Precision Agriculture
        <br /> <span className="text-yellow-200">GO GREEN </span>
      </footer>
    </div>
  );
};

export default WBDistrictCrops;
