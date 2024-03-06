import RPi.GPIO as GPIO
import time
import subprocess  # Import the subprocess module





GPIO.setmode(GPIO.BCM)

GPIO.setup(15, GPIO.IN, pull_up_down=GPIO.PUD_UP)

while True:
    input_state = GPIO.input(15)
    if input_state == False:
        print('Button Pressed')
        subprocess.run(["python","script.py"])  # Run script.py when the sensor is touched

        time.sleep(0.2)
