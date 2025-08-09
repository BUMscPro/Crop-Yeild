import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <header className="relative bg-[url('https://img.freepik.com/free-photo/farm-soil-with-young-plant_1150-17327.jpg')] bg-cover bg-center h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1 className="relative text-white text-4xl md:text-5xl font-bold text-center px-6">
          Crop Yield Prediction
        </h1>
      </header>

      {/* About Section */}
      <section className="p-8 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4 text-green-700">About the Project</h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          Our Crop Yield Prediction tool leverages{" "}
          <span className="font-medium text-green-700">Machine Learning</span> and{" "}
          <span className="font-medium text-green-700">IoT-based data</span> to help farmers and
          agricultural planners estimate the expected yield for their crops.
          By analyzing soil nutrients, pH, weather patterns, and other critical parameters, we aim to
          empower decision-making, increase productivity, and ensure sustainable farming practices.
        </p>
      </section>

      {/* Feature Section */}
      <section className="bg-white py-12 shadow-inner">
        <div className="max-w-3xl mx-auto text-center">
          <img
            src="https://img.freepik.com/free-photo/farm-soil-with-young-plant_1150-17327.jpg"
            alt="Crop Yield Prediction"
            className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
          />
          <h3 className="text-2xl font-semibold mb-4 text-green-700">Why Crop Yield Prediction?</h3>
          <p className="text-gray-600 mb-6 text-lg">
            Accurate yield predictions can help in better resource allocation, reduce losses, and
            improve profitability for farmers. Our system uses advanced algorithms to make predictions
            based on real-time and historical data, providing insights you can trust.
          </p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors" onClick={() => navigate("/crop-recommendation")}>
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-green-700 text-white text-sm mt-12">
        © {new Date().getFullYear()} Crop Yield Prediction | Precision Agriculture
        <br /> <span className="text-yellow-200">GO GREEN </span>
      </footer>
    </div>
  );
};

export default Home;
