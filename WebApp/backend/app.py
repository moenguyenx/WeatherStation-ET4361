from flask import Flask, jsonify
from pymongo import MongoClient
import paho.mqtt.client as mqtt 
import json
import threading
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
import random
import os

load_dotenv(dotenv_path='.env')
app = Flask(__name__)
client = MongoClient(f"{os.getenv('MONGO_URI')}")
app.config["SECRET_KEY"] = os.getenv('SECRET_KEY')

# Create DB
db = client["WeatherData"]
# choose collection
collection = db["records"]
HBTcollection = db["hbt"]
LBcollection = db["lb"]
HDcollection = db['hd']

# MQTT settings
MQTT_BROKER = os.getenv('MQTT_BROKER_URL')  
MQTT_PORT = 1883
MQTT_TOPIC = os.getenv('MQTT_TOPIC')  

# MQTT client callback functions
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT Broker!")
        client.subscribe(MQTT_TOPIC)
    else:
        print("Failed to connect, return code %d\n", rc)

def on_message(client, userdata, msg):
    '''
    Hai Ba Trung station
    {"stationCode": 1, "temp": 21, "hum": 100, "pm25": 20, "raining": 1}
    # 1 for True and 0 for False
    Ha Dong Station
    {"stationCode": 2, "temp": 21, "hum": 100, "pm25": 20, "raining": 1}
    Long Bien Station
    {"stationCode": 0, "temp": 21, "hum": 100, "pm25": 20, "raining": 1}
    '''
    topic = msg.topic
    message = json.loads(msg.payload.decode("utf-8"))

    stationCode = int(message["stationCode"])
    data = {
        "timestamp": datetime.now(timezone.utc),
        "temp": int(message["temp"]),
        "hum": int(message["hum"]),
        "pm25": int(message["pm25"]),
        "raining": int(message["raining"])
    }
    if stationCode == 0:
        print("Long Bien Station")
        LBcollection.insert_one(data)
    elif stationCode == 1:
        print("Hai Ba Trung station")
        HBTcollection.insert_one(data)
    elif stationCode == 2:
        print("Ha Dong Station")
        HDcollection.insert_one(data)
    else:
        print("Invalid Station")
    
    print(message)

# Flask route
@app.route('/')
def home():
    return "MQTT Subscriber is running..."

# Tạo route API
@app.route("/latest", methods=["GET"])
def get_latest_weather():
    """Lấy dữ liệu thời tiết gần nhất"""
    latest = collection.find_one(sort=[("timestamp", -1)])  # Sắp xếp theo thời gian giảm dần
    LBlatest = LBcollection.find_one(sort=[("timestamp", -1)])
    LBlatest["location"] = "Long Bien"
    HBTlatest = HBTcollection.find_one(sort=[("timestamp", -1)])
    HBTlatest["location"] = "Hai Ba Trung"
    HDlatest = HDcollection.find_one(sort=[("timestamp", -1)])
    HDlatest["location"] = "Ha Dong"
    
    if LBlatest and HBTlatest and HDlatest:
        latest["_id"] = str(latest["_id"])
        LBlatest["_id"] = str(LBlatest["_id"])  # Chuyển ObjectId sang string để JSON hóa
        HBTlatest["_id"] = str(HBTlatest["_id"])
        HDlatest["_id"] = str(HDlatest["_id"])
        currentData = [LBlatest, HBTlatest, HDlatest]
        return jsonify(currentData), 200
    return jsonify({"error": "No data found"}), 404

@app.route("/latest10", methods=["GET"])
def get_latest_10_weather():
    """Lấy 10 dữ liệu thời tiết gần nhất"""
    latest_10 = list(collection.find(sort=[("timestamp", -1)]).limit(10))
    LBlatest_10 = list(LBcollection.find(sort=[("timestamp", -1)]).limit(10))
    HBTlatest_10 = list(HBTcollection.find(sort=[("timestamp", -1)]).limit(10))
    HDlatest_10 = list(HDcollection.find(sort=[("timestamp", -1)]).limit(10))
    for record in latest_10:
        record["_id"] = str(record["_id"])  # Chuyển ObjectId sang string
    if latest_10:
        return jsonify(latest_10), 200
    return jsonify({"error": "No data found"}), 404

@app.route("/add_fake_data", methods=["POST"])
def add_fake_data():
    """Thêm dữ liệu giả lập vào MongoDB"""
    locations = ["Hanoi", "Ho Chi Minh City", "Da Nang"]
    for _ in range(10):  # Tạo 10 bản ghi
        data = {
            "timestamp": datetime.utcnow() - timedelta(minutes=random.randint(0, 500)),
            "temperature": round(random.uniform(20, 35), 1),
            "humidity": round(random.uniform(40, 90), 1),
            "wind_speed": round(random.uniform(0, 20), 1),
            "location": random.choice(locations)
        }
        collection.insert_one(data)
    return jsonify({"message": "Fake data added"}), 201

# Function to run the MQTT client in a separate thread
def run_mqtt_client():
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message

    client.connect(MQTT_BROKER, MQTT_PORT, 60)

    # Blocking call to process network traffic, dispatch callbacks
    client.loop_forever()

if __name__ == "__main__":
    mqtt_thread = threading.Thread(target=run_mqtt_client)
    mqtt_thread.daemon = True
    mqtt_thread.start()

    # Start Flask app
    app.run(host='0.0.0.0', port=5000, debug=True)