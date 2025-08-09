import React, { useState } from "react";
import { motion } from "framer-motion";
import  toast  from "react-hot-toast";

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorous: "",
    potassium: "",
    ph: "",
    area: "",
    crop: "",
    region: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:7860/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      setResult(data);
      toast.success("Prediction successful!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error in Prediction!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-[url('https://img.freepik.com/free-photo/wheat-field-close-up_1150-7828.jpg')] bg-cover bg-center h-72 flex items-center justify-center shadow-lg">
        <h1 className="text-white text-3xl md:text-4xl font-bold text-center bg-black bg-opacity-50 p-4 rounded-lg shadow-lg">
          Crop Yield Prediction 
        </h1>
      </header>

      {/* Form + Result Section */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8">
        
        {/* Form */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            Enter Your Farm Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: "crop", label: "Crop Name" },
              { name: "region", label: "Region" },
              { name: "nitrogen", label: "Nitrogen (N)" },
              { name: "phosphorous", label: "Phosphorous (P)" },
              { name: "potassium", label: "Potassium (K)" },
              { name: "ph", label: "Soil pH" },
              { name: "area", label: "Area (ha)" },
            ].map((field) => (
              <input
                key={field.name}
                type="text"
                name={field.name}
                placeholder={field.label}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            ))}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              {loading ? "Predicting..." : "Predict Yield"}
            </button>
          </form>
        </div>

        {/* Result */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-center items-center text-center">
          {!result && !loading && (
            <p className="text-gray-500">Prediction result will appear here 📊</p>
          )}

          {loading && (
            <p className="text-green-600 font-semibold text-lg">
              Calculating yield prediction...
            </p>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-green-700">
                Predicted Yield: {result.prediction?.predicted_production} tonnes
              </h3>
              <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                <p className="text-lg">🌡 Temp: {result.weather.temperature}°C</p>
                <p className="text-lg">💧 Humidity: {result.weather.humidity}%</p>
                <p className="text-lg">🌧 Rainfall: {result.weather.rainfall} mm</p>
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

export default CropRecommendation;
