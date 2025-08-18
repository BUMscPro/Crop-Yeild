import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const districts = [
  "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur",
  "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram",
  "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia",
  "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman",
  "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"
];

const CropRecommendation = () => {
  const navigate = useNavigate();
   const [district, setDistrict] = useState("");
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorous: "",
    potassium: "",
    ph: "",
    area: "",
    crop: "",
    region: "West Bengal",

  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
    const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:7860/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
      toast.success("Prediction successful!");
    } catch (error) {
      console.error("Prediction error:", error);
      toast.error(`Error: ${error.message || "Failed to get prediction"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <header
        className="relative h-72 flex items-center justify-center shadow-lg"
        aria-label="Wheat field background"
      >
        <img
          src="/assets/wheat-bg.jpg"
          alt="Wheat field"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" aria-hidden="true" />
        <div className="relative z-10 text-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold p-4 rounded-lg">
            Crop Yield Prediction
          </h1>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-green-200 hover:text-white underline"
          >
            ← Back to Home
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid md:grid-cols-2 gap-8">
          
          {/* Form */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">
              Enter Your Farm Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Crop Name */}
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Crop Name</label>
                <input
                  type="text"
                  name="crop"
                  value={formData.crop}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              {/* District Dropdown */}
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Region (District)</label>
                <select
                  
                  value={district}
                  onChange={handleDistrictChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value="">Select District</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Inputs */}
              {[
                { name: "nitrogen", label: "Nitrogen (N)", type: "number", step: "0.01" },
                { name: "phosphorous", label: "Phosphorous (P)", type: "number", step: "0.01" },
                { name: "potassium", label: "Potassium (K)", type: "number", step: "0.01" },
                { name: "ph", label: "Soil pH", type: "number", step: "0.1", min: "0", max: "14" },
                { name: "area", label: "Area (ha)", type: "number", step: "0.01" }
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-gray-700 mb-1 font-medium">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 transition"
              >
                {loading ? "Predicting..." : "Predict Yield"}
              </button>
            </form>
          </div>

          {/* Result */}
          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4 text-green-700 text-center">
              Prediction Result
            </h2>

            {!result && !loading && (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 py-12">
                <p className="text-lg">Prediction results will appear here</p>
                <p className="mt-2 text-sm">Fill the form and click "Predict Yield"</p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <p className="mt-4 text-green-600 font-semibold text-lg">
                  Analyzing farm data...
                </p>
              </div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="text-2xl font-bold text-green-700">Predicted Yield</h3>
                  <p className="text-4xl font-bold mt-2 text-gray-800">
                    {result.prediction?.predicted_production || "N/A"} 
                    <span className="text-lg font-normal"> tonnes</span>
                  </p>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="text-xl font-semibold mb-3 text-gray-700">
                    Weather Conditions
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                      <p className="text-gray-600">Temperature</p>
                      <p className="text-xl font-semibold mt-1">
                        {result.weather?.temperature || "N/A"}°C
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                      <p className="text-gray-600">Humidity</p>
                      <p className="text-xl font-semibold mt-1">
                        {result.weather?.humidity || "N/A"}%
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                      <p className="text-gray-600">Rainfall</p>
                      <p className="text-xl font-semibold mt-1">
                        {result.weather?.rainfall || "N/A"} mm
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <button
                    onClick={() => setResult(null)}
                    className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Make Another Prediction
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 bg-green-700 text-white text-sm mt-auto">
        © {new Date().getFullYear()} Crop Yield Prediction | Precision Agriculture
        <br /> <span className="text-yellow-200">GO GREEN</span>
      </footer>
    </div>
  );
};

export default CropRecommendation;
