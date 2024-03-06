# This Raspberry Pi code was developed by newbiely.com
# This Raspberry Pi code is made available for public use without any restriction
# For comprehensive instructions and wiring diagrams, please visit:
# https://newbiely.com/tutorials/raspberry-pi/raspberry-pi-touch-sensor


import RPi.GPIO as GPIO

# Set the GPIO mode to BCM (Broadcom SOC channel numbering)
GPIO.setmode(GPIO.BCM)

# Set the pin number connected to the touch sensor
TOUCH_PIN = 12

# Set the GPIO pin as an input
GPIO.setup(TOUCH_PIN, GPIO.IN)

try:
    while True:
        # Read the state from the touch sensor
        touch_state = GPIO.input(TOUCH_PIN)
        
        # The touch sensor outputs LOW (0) when not touched, and HIGH (1) when touched
        if touch_state == GPIO.LOW:
            print("Touch sensor is not touched.")
        else:
            print("Touch sensor is touched!")
        
except KeyboardInterrupt:
    # Clean up the GPIO settings on program exit
    GPIO.cleanup()
