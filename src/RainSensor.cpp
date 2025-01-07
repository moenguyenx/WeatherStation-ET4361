#include "RainSensor.h"

RainSensor::RainSensor(uint8_t pinA0, uint8_t pinD0, uint16_t threshold, uint16_t stableDuration) 
    : _pinA0(pinA0), _pinD0(pinD0), _threshold(threshold), _stableDuration(stableDuration), _isStable(false) {}

void RainSensor::begin() {
    pinMode(_pinD0, INPUT);  
    pinMode(_pinA0, INPUT);  
}

bool RainSensor::isRaining() {
    return digitalRead(_pinD0) == LOW;
}

bool RainSensor::isRealRain() {
    uint16_t value = analogRead(_pinA0);
    if (value < _threshold) {
        if (!_isStable) {
            _startRainTime = millis(); 
            _isStable = true;
        }
        _lastRainTime = millis();
    } else {
        _isStable = false; 
    }

    if (_isStable && (millis() - _startRainTime >= _stableDuration)) {
        return true;
    }
    if (!_isStable && (millis() - _lastRainTime < _stableDuration)) {
        return false; 
    }

    return false;
}

uint16_t RainSensor::getRawValue() {
    return analogRead(_pinA0); 
}
