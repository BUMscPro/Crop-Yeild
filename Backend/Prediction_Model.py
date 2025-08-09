import os
import shutil
import kagglehub
import pandas as pd
import numpy as np
import requests
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error, r2_score


API_KEY = "293891525cd443a99ef145554230312"  

MODEL = None
LE_CROP = None
LE_REGION = None


#Download Dataset if not present
def download_dataset():
    project_cache_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "cache")
    os.makedirs(project_cache_dir, exist_ok=True)

    cache_path = kagglehub.dataset_download("sparshx/crop-yeild-dataset")
    dest_path = os.path.join(project_cache_dir, "crop-yeild-dataset")

    if os.path.exists(dest_path):
        shutil.rmtree(dest_path)
    shutil.copytree(cache_path, dest_path)

    return dest_path

#Load and Preprocess dataset

def load_and_preprocess():
    dataset_dir = download_dataset()
    file_path = os.path.join(dataset_dir, "crop_yeild_dataset.csv")
    df = pd.read_csv(file_path)
    df = df.sample(n=1000, random_state=42)

    le_crop = LabelEncoder()
    le_region = LabelEncoder()

    df['crop_encoded'] = le_crop.fit_transform(df['crop'])
    df['region_encoded'] = le_region.fit_transform(df['region'])

    features = ['crop_encoded', 'region_encoded', 'N', 'P', 'K','temperature', 'humidity', 'rainfall', 'ph', 'area_ha']
    target = 'production_t'

    X = df[features]
    y = df[target]

    return X, y, le_crop, le_region


#Train the model
def train_model(X, y):
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = GradientBoostingRegressor(n_estimators=100,learning_rate=0.1,max_depth=3,random_state=42)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    print(f"✅ RMSE: {np.sqrt(mean_squared_error(y_test, y_pred)):.2f}")
    print(f"✅ R² Score: {r2_score(y_test, y_pred):.4f}")

    return model

# Fetch weather Data

def fetch_weather(city):
    url = f"http://api.weatherapi.com/v1/current.json?key={API_KEY}&q={city}"
    response = requests.get(url)

    if response.status_code != 200:
        return None

    data = response.json()
    
    return {
        "temperature": data["current"]["temp_c"],
        "humidity": data["current"]["humidity"],
        "rainfall": data["current"]["precip_mm"]
    }
    # return data


#Predict Model

def predict_production(user_crop, user_region, N, P, K, ph, area, weather):
    if user_crop not in LE_CROP.classes_ or user_region not in LE_REGION.classes_:
        return {"error": "Invalid crop or region name"}

    crop_encoded = LE_CROP.transform([user_crop])[0]
    region_encoded = LE_REGION.transform([user_region])[0]

    input_features = np.array([[
        crop_encoded, region_encoded, N, P, K,
        weather['temperature'], weather['humidity'], weather['rainfall'],
        ph, area
    ]])

    predicted_production = MODEL.predict(input_features)[0]
    return {"predicted_production": round(predicted_production, 2)}

# Initialize Model

def init_model():
    global MODEL, LE_CROP, LE_REGION
    print("📂 Loading dataset and training model...")
    X, y, LE_CROP, LE_REGION = load_and_preprocess()
    MODEL = train_model(X, y)
