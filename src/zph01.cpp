#include "zph01.h"

// Constructor to initialize RX, TX pins and baud rate
void ZPH01_init(int TX_PIN, int RX_PIN, long BAUD_RATE) 
{
    Serial1.begin(BAUD_RATE, SERIAL_8N1, RX_PIN, TX_PIN); // Using UART1 on ESP32
}

// Read PM2.5 concentration
float ZPH01_ReadPM25() 
{
    if (Serial1.available()) 
    {
        Serial1.readBytes(data, BUFFER_LENGTH);
        // Read 9 bytes from the sensor
        if (data[0] == 0xFF && data[1] == 0x18) 
        {
            float dutyCycle = parseDutyCycle();
            return calculatePM25(dutyCycle); // Return calculated PM2.5 concentration
        }
    }
    return -1.0; // Return -1 if invalid data
}

float parseDutyCycle() 
{
    // Duty cycle is in data[3] and data[4] according to ZPH01 datasheet
    float dutyCycle = data[3] + ( data[4] / 100.0 );  // Combine high and low bytes
    return dutyCycle / 100 ;          
}

float calculatePM25(float dutyCycle) 
{
    float k = 1000;  // Empirical coefficient (adjust as needed)
    return dutyCycle * k; // PM2.5 concentration formula
}
