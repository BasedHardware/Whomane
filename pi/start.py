import RPi.GPIO as GPIO
import time
import subprocess  # Import the subprocess module

# Set the GPIO mode to BCM (Broadcom SOC channel numbering)
GPIO.setmode(GPIO.BCM)

# Set the pin number connected to the touch sensor
TOUCH_PIN = 12

# Set the GPIO pin as an input
GPIO.setup(TOUCH_PIN, GPIO.IN)

# Variable to track the touch sensor state
prev_touch_state = GPIO.LOW  # Assuming the sensor is not touched initially

try:
    while True:
        touch_state = GPIO.input(TOUCH_PIN)

        if touch_state != prev_touch_state:
            if touch_state == GPIO.HIGH:
                # Sensor touched event
                print("Touch sensor is touched!")
                subprocess.run(["python","script.py"])  # Run script.py when the sensor is touched
                
            else:
                # Sensor released event
                print("Touch sensor is released!")

        prev_touch_state = touch_state
        time.sleep(0.1)  # A small delay to debounce the input
        
except KeyboardInterrupt:
    # Clean up the GPIO settings on program exit
    GPIO.cleanup()
