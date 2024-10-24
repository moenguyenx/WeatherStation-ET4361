#include "zph01.h"

// Constructor to initialize RX, TX pins and baud rate
ZPH01Sensor::ZPH01Sensor(int rxPin, int txPin, long baudRate) 
{
    _rxPin = rxPin;
    _txPin = txPin;
    _baudRate = baudRate;
    serialPort = &Serial1; // Using UART1 on ESP32
}

// Initialize UART communication
void ZPH01Sensor::begin() 
{
    serialPort->begin(_baudRate, SERIAL_8N1, _rxPin, _txPin);
}

// Read PM2.5 concentration
float ZPH01Sensor::readPM25() 
{
    if (serialPort->available() >= 9) 
    {
      // Read 9 bytes from the sensor
      for (int i = 0; i < 9; i++) 
      {
            data[i] = serialPort->read();
      } 
      // Validate data frame
      if (data[0] == 0xFF && data[1] == 0x18) 
      {
            float dutyCycle = parseDutyCycle();
            return calculatePM25(dutyCycle);
      }
    }
    return -1.0; // Return -1 if invalid data
}

// Parse duty cycle from sensor data
float ZPH01Sensor::parseDutyCycle() 
{
    int integerPart = data[3];   // Byte 3: Integer part of low pulse rate
    int decimalPart = data[4];   // Byte 4: Decimal part of low pulse rate
    return integerPart + (decimalPart / 100.0); // Combine to get duty cycle
}

// Calculate PM2.5 concentration based on duty cycle
float ZPH01Sensor::calculatePM25(float dutyCycle)
{
    float k = 1.0;  // Empirical coefficient (adjust as needed)
    return dutyCycle * k; // PM2.5 concentration formula
}
