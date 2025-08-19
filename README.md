# 🌾 A Machine Learning–Based Approach for Predicting Crop Yields Using Soil and Weather Parameters

## 🎓 Final Semester Project - M.Sc. in Computer Science

This project was developed as part of our final semester for the Master's program in Computer Science. Our team of five set out to build a project with GBR with weather API data  for specific districts to assist in crop yield planning and agricultural decision-making.

---

## 👥 Team Members

- MIRAJ MALLICK
- SK RAMIJ HOSSAIN
- PROLAY MONDAL
- SANTOSH DEY
- NAJIMUL HOQUE MOLLA

---

## 📌 Project Objective

This project predicts crop yields using soil parameters (N, P, K, pH, area) and weather data (temperature, rainfall, humidity) with the help of Machine Learning (Gradient Boosting Regressor). It provides a Flask backend API and a React frontend dashboard, integrated with real-time weather APIs for accurate and user-friendly predictions.

---
## 🚀 Features

Predicts crop yield in tons/hectare

Uses Gradient Boosting Regressor (GBR) for high accuracy

Achieved R² score ≈ 0.98 with low RMSE/MAE

Flask-based REST API for serving ML model

React-based web dashboard for user interaction

Integration with weather API for dynamic data

---

## 🔍 Problem Statement

Agricultural productivity is highly dependent on weather conditions. Farmers and agricultural planners often face difficulty in anticipating future weather patterns, which can negatively impact crop yields. Our system aims to solve this problem by:

- Providing accurate weather predictions.
- Assisting in crop selection and planting decisions.
- Reducing risks related to unexpected weather events.

---

## 🧠 Solution Overview

We developed a RESTful API powered by machine learning models trained on historical weather and crop yield data. The system allows users to:

- Input a district name.
- Receive predicted weather data (e.g., rainfall, temperature, humidity).
- Optionally view suggested crop types best suited for the upcoming season based on the forecast.

---

## 🛠️ Tech Stack

### 🔙 Backend
- **Language**: Python
- **Framework**: Flask (or plain Python if not using a framework)
- **ML Libraries**: Pandas, NumPy, scikit-learn
- **Data**: Weather and crop data (CSV)
- **Prediction Model**: Custom crop yield prediction based on weather features

### 🔜 Frontend
- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **Deployment**: Netlify
---

## 📈 Future Enhancements

- Add real-time satellite data for more accurate forecasts
- Integrate with government crop advisory systems
- Build a user dashboard for farmers
- Support for multiple languages

---

## 📁 Project Structure

