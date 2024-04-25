import face_recognition
import joblib
import os
import shutil

# Load the trained model
best_model = joblib.load('face_recognition_model.pkl')

# Define the threshold
THRESHOLD = 0.6  # Adjust this value based on your dataset and requirements

# Path to the directory containing images to classify
image_dir = 'My_Album'

# Output directory for categorized images
output_dir = 'output_v2'

# Create directories for "No Face Found" and "Unknown Face"
no_face_dir = os.path.join(output_dir, 'No_Face_Found')
unknown_dir = os.path.join(output_dir, 'Unknown_Face')

for dir_path in [no_face_dir, unknown_dir]:
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)

# Iterate through each image file in the directory
for filename in os.listdir(image_dir):
    if filename.endswith('.jpg') or filename.endswith('.png'):
        # Load the image for face recognition
        image_path = os.path.join(image_dir, filename)
        image = face_recognition.load_image_file(image_path)
        
        # Find all face locations in the image
        face_locations = face_recognition.face_locations(image)
        
        # If faces are found in the image
        if len(face_locations) > 0:
            # Encode faces in the image
            face_encodings = face_recognition.face_encodings(image, known_face_locations=face_locations)
            
            # Iterate through each face encoding
            for face_encoding, face_location in zip(face_encodings, face_locations):
                # Predict the label (person's name) using the trained model
                label = best_model.predict([face_encoding])[0]
                
                # Predict the probability of the label
                proba = best_model.predict_proba([face_encoding])[0]
                
                # Check if the classification confidence is above the threshold
                if max(proba) > THRESHOLD:
                    # Create directory for the predicted label if it doesn't exist
                    label_dir = os.path.join(output_dir, label)
                    if not os.path.exists(label_dir):
                        os.makedirs(label_dir)
                    
                    # Copy the image to the corresponding label directory
                    output_path = os.path.join(label_dir, filename)
                    shutil.copy(image_path, output_path)
                    print(f"Copied {filename} to {label} folder")
                else:
                    # Copy the image to the "Unknown Face" directory
                    output_path = os.path.join(unknown_dir, filename)
                    shutil.copy(image_path, output_path)
                    print(f"Unknown face in {filename}. Copied to {unknown_dir}")
        else:
            # Copy the image to the "No Face Found" directory
            output_path = os.path.join(no_face_dir, filename)
            shutil.copy(image_path, output_path)
            print(f"No faces found in {filename}. Copied to {no_face_dir}")
