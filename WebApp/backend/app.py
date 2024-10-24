from flask import Flask
import paho.mqtt.client as mqtt 
import json
import threading

app = Flask(__name__)
app.config["SECRET_KEY"] = "hahabitch"

# MQTT settings
MQTT_BROKER = "broker.hivemq.com"  
MQTT_PORT = 1883
MQTT_TOPIC = "ET/weather"

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
    {'stationCode': 1, 'temp': 21, 'hum': 100}
    Ha Dong Station
    {'stationCode': 2, 'temp': 21, 'hum': 100}
    Long Bien Station
    {'stationCode': 0, 'temp': 21, 'hum': 100}
    '''
    topic = msg.topic
    message = json.loads(msg.payload.decode("utf-8"))

    stationCode = message["stationCode"]

    if stationCode == 0:
        print("Long Bien Station")
    elif stationCode == 1:
        print("Hai Ba Trung station")
    elif stationCode == 2:
        print("Ha Dong Station")
    else:
        print("Invalid Station")
    
    print(message)

# Flask route
@app.route('/')
def home():
    return "MQTT Subscriber is running..."

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