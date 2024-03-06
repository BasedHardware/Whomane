import time
import requests
import firebase_admin
import uuid
import datetime
from firebase_admin import credentials, firestore, storage
import random

TESTING_MODE = False
APITOKEN = 'YOUR_TOKEN_HERE' # Your API Token for Facecheck.id

cred = credentials.Certificate('./service.json')

firebase_admin.initialize_app(cred, {
'storageBucket': 'gs://STORAGEBUCKET_URL_HERE'
})

db = firestore.client()

# Use the local file path directly
image_file = '/home/captured_image.jpg' # Updated to use a local file path

def upload_image(image_path):
    bucket = storage.bucket()  # Get the storage bucket
    blob_name = f"images/{uuid.uuid4()}.jpg"

    blob = bucket.blob(blob_name)
    
    # Upload the file
    blob.upload_from_filename(image_path)

    # Optionally, get the public URL
    return blob.public_url, blob_name

def search_by_face(image_file):
    if TESTING_MODE:
        print('****** TESTING MODE search, results are inaccurate, and queue wait is long, but credits are NOT deducted ******')

    site='https://facecheck.id'
    headers = {'accept': 'application/json', 'Authorization': APITOKEN}
    files = {'images': open(image_file, 'rb'), 'id_search': None}
    response = requests.post(site+'/api/upload_pic', headers=headers, files=files).json()

    if response['error']:
        return f"{response['error']} ({response['code']})", None

    id_search = response['id_search']
    print(response['message'] + ' id_search='+id_search)
    json_data = {'id_search': id_search, 'with_progress': True, 'status_only': False, 'demo': TESTING_MODE}

    while True:
        response = requests.post(site+'/api/search', headers=headers, json=json_data).json()
        if response['error']:
            return f"{response['error']} ({response['code']})", None
        if response['output']:
            return None, response['output']['items']
        print(f'{response["message"]} progress: {response["progress"]}%')
        time.sleep(1)


# Setup Firestore
people_ref = db.collection('people').document()
# Set the document with the current date and time
people_ref.set({
    'time': datetime.datetime.now(),
})

# Search the Internet by face
error, urls_images = search_by_face(image_file)

# public_url, generated_blob_name = upload_image(image_file)

# Check if urls_images is not empty
if urls_images:
    # Create a subcollection named 'socials' under the current document
    socials_ref = people_ref.collection('socials')
    
    for im in urls_images:
        document_data = {
            'score': im['score'],
            'url': im['url'],
            'image_base64': im['base64']
        }
        print("Preparing to set document with data:", document_data)
        # Check each key in document_data to ensure it's a string and not empty
        for key in document_data.keys():
            if not isinstance(key, str) or not key:
                raise ValueError(f"Invalid key detected: '{key}'. Keys must be non-empty strings.")

        social_doc_ref = socials_ref.document()
        social_doc_ref.set(document_data)

else:
    print(error)
