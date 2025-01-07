#include "DHT11.h"

#define DHT11_DELAY 18 
#define DHT11_TIMEOUT 1000          

DHT11::DHT11(uint8_t pin) : _pin(pin) {
    pinMode(_pin, OUTPUT);
    digitalWrite(_pin, HIGH);
}

bool DHT11::_readSensor() {
    uint8_t bitIndex = 0;
    memset(_data, 0, sizeof(_data));

    pinMode(_pin, OUTPUT);
    digitalWrite(_pin, LOW);
    delay(DHT11_DELAY);
    digitalWrite(_pin, HIGH);
    delayMicroseconds(40);
    pinMode(_pin, INPUT);

    unsigned long startTime = micros();
    while (digitalRead(_pin) == HIGH) {
        if (micros() - startTime > DHT11_TIMEOUT) return false;
    }

    while (digitalRead(_pin) == LOW) {
        if (micros() - startTime > DHT11_TIMEOUT) return false;
    }

    while (digitalRead(_pin) == HIGH) {
        if (micros() - startTime > DHT11_TIMEOUT) return false;
    }

    for (int i = 0; i < 40; i++) {
        while (digitalRead(_pin) == LOW) {
            if (micros() - startTime > DHT11_TIMEOUT) return false;
        }

        startTime = micros();
        while (digitalRead(_pin) == HIGH) {
            if (micros() - startTime > DHT11_TIMEOUT) return false;
        }

        if (micros() - startTime > 50) {
            _data[bitIndex / 8] |= (1 << (7 - (bitIndex % 8)));
        }
        bitIndex++;
    }

    return true;
}

bool DHT11::read(float &temperature, float &humidity) {
    if (!_readSensor()) return false;

    if (_data[4] != (_data[0] + _data[1] + _data[2] + _data[3])) return false;

    humidity = _data[0] + _data[1] * 0.1;
    temperature = _data[2] + _data[3] * 0.1;

    return true;
}
