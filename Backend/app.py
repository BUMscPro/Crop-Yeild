from flask import Flask, request, jsonify
import Prediction_Model as ml
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app) 


# Cache CSV data at startup
CSV_PATH = "WestBengalCrops.csv"
districts_df = pd.read_csv(CSV_PATH)
districts_data = districts_df.to_dict(orient="records")  # Convert to list of dicts

@app.route("/districts", methods=["GET"])
def get_districts():
    return jsonify(districts_data)


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    try:
        user_crop = data["crop"].lower()
        user_region = data["region"].title()
        N = float(data["nitrogen"])
        P = float(data["phosphorous"])
        K = float(data["potassium"])
        ph = float(data["ph"])
        area = float(data["area"])
    except KeyError as e:
        return jsonify({"error": f"Missing field: {e}"}), 400

    weather = ml.fetch_weather(user_region)
    if not weather:
        return jsonify({"error": "Failed to fetch weather data"}), 500

    prediction = ml.predict_production(user_crop, user_region, N, P, K, ph, area, weather)
    return jsonify({"weather": weather,"prediction": prediction
    })

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Crop Yield Prediction API is running",
    })

if __name__ == "__main__":
    ml.init_model()
    print("🚀 Starting Flask API on http://127.0.0.1:7860")
    app.run(debug=True,port=7860)
