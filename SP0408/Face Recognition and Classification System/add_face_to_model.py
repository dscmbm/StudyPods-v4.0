import os
import numpy as np
import joblib
import face_recognition
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.pipeline import Pipeline

def extract_face_encodings_and_labels(dataset_path):
    face_encodings = []
    labels = []
    for person_name in os.listdir(dataset_path):
        person_dir = os.path.join(dataset_path, person_name)
        if os.path.isdir(person_dir):
            for image_name in os.listdir(person_dir):
                image_path = os.path.join(person_dir, image_name)
                image = face_recognition.load_image_file(image_path)
                face_locations = face_recognition.face_locations(image)
                if len(face_locations) == 1:
                    face_encoding = face_recognition.face_encodings(image, known_face_locations=face_locations)[0]
                    face_encodings.append(face_encoding)
                    labels.append(person_name)
    return np.array(face_encodings), np.array(labels)

def add_faces_to_model(dataset_path):
    new_face_encodings, new_labels = extract_face_encodings_and_labels(dataset_path)
    updated_classifier = joblib.load('face_recognition_model.pkl')

    # Extract existing face encodings and labels from the classifier
    existing_face_encodings = updated_classifier.named_steps['svm'].support_vectors_
    existing_labels = updated_classifier.named_steps['svm'].predict(existing_face_encodings)

    # Concatenate existing and new face encodings and labels
    all_face_encodings = np.vstack([existing_face_encodings, new_face_encodings])
    all_labels = np.concatenate([existing_labels, new_labels])

    # Train the classifier with the updated data
    updated_classifier.named_steps['svm'].fit(all_face_encodings, all_labels)

    # Save the updated classifier
    print("Updated model saved, Face have been added to model")
    joblib.dump(updated_classifier, 'face_recognition_model.pkl')

# Add new faces to the model
add_faces_to_model('new_person_images')
