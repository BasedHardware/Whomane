#!/usr/bin/env python3
import time
import requests
import subprocess

def capture_image(image_path):
    # Define the command to capture an image
    command = ["libcamera-still", "-o", image_path]


    # Run the command
    try:
        subprocess.run(command, check=True)

        print(f"Image captured successfully: {image_path}")
        subprocess.run(['python', 'search.py'])
    except subprocess.CalledProcessError as e:
        print(f"Failed to capture image: {e}")

if __name__ == "__main__":
    # Define the path for the image
    image_path = "/home/captured_image.jpg"

    # Capture the image
    capture_image(image_path)
