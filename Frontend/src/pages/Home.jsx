import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    try {
      navigate("/crop-recommendation");
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback to home if navigation fails
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* Hero Section */}
      <header
  className="relative h-[50vh] min-h-[300px] flex items-center justify-center"
  aria-label="Farm field with young plants background"
>
  {/* Background image */}
  <img
    src="/assets/home-hero.jpg"
    alt="Farm field with young plants"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Overlay */}
  <div
    className="absolute inset-0 bg-black bg-opacity-40"
    aria-hidden="true"
  />

  {/* Text */}
  <h1 className="relative text-white text-4xl md:text-5xl font-bold text-center px-6">
    Crop Yield Prediction
  </h1>
</header>

      <main>
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
              src="/assets/feature-img.jpg"
              alt="Agricultural drone analyzing crops"
              className="w-full max-h-64 object-contain rounded-lg shadow-md mb-6"
              loading="lazy"
            />
            <h3 className="text-2xl font-semibold mb-4 text-green-700">Why Crop Yield Prediction?</h3>
            <p className="text-gray-600 mb-6 text-lg">
              Accurate yield predictions can help in better resource allocation, reduce losses, and
              improve profitability for farmers. Our system uses advanced algorithms to make predictions
              based on real-time and historical data, providing insights you can trust.
            </p>
            <button 
              className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
              onClick={handleNavigate}
              aria-label="Get crop recommendations"
            >
              Get Started
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 bg-green-700 text-white text-sm mt-auto">
        © {new Date().getFullYear()} Crop Yield Prediction | Precision Agriculture
        <br /> <span className="text-yellow-200">GO GREEN </span>
      </footer>
    </div>
  );
};

export default Home;