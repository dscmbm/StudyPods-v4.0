Project 1:-

# Face_recognition_based_attendance_system
A python attendance system using face recognition to take attendance.

In this python project, I have made an attendance system which takes attendance by using face recognition technique. I have also intergrated it with GUI (Graphical user interface) so it can be easy to use by anyone. GUI for this project is also made on python using tkinter.

TECHNOLOGY USED:
1) tkinter for whole GUI
2) OpenCV for taking images and face recognition (cv2.face.LBPHFaceRecognizer_create())
3) CSV, Numpy, Pandas, datetime.

FEATURES:
1) Easy to use with interactive GUI support.
2) Password protection for new person registration.
3) Creates/Updates CSV file for deatils of students on registration.
4) Creates a new CSV file everyday for attendance and marks attendance with proper date and time.
5) Displays live attendance updates for the day on the main screen in tabular format with Id, name, date and time.

Project 2:-

Project Title: Face Recognition and Classification System

1. Purpose:
The purpose of this project is to develop a robust face recognition system capable of identifying and classifying faces in images and makes folders for each face recognised and also makes folder when face not detected and unknown face detected. 

2. Components:
Training Module: This module involves training a machine learning model using a dataset of images containing faces of different individuals. The trained model learns to recognize and classify faces based on their unique features.
Classification Module: This module applies the trained model to classify faces in new images. It detects faces, extracts their features, and uses the trained classifier to predict the identity of each face.
Add Face Module: This module allows for the expansion of the face recognition system by adding new faces to the training dataset. It extracts face features from new images and incorporates them into the existing model, enabling it to recognize additional individuals.

3. Workflow:
Training Module Workflow:
Gather a dataset of images containing faces.
Preprocess the images to detect and align faces.
Extract facial features (face encodings) from each image using a pre-trained deep learning model (e.g., face_recognition library).
Label the face encodings with the corresponding identities.
Train a machine learning classifier (e.g., k-Nearest Neighbors, Support Vector Machine) using the labeled face encodings.
Save the trained classifier to a file for future use.
Classification Module Workflow:
Load the pre-trained classifier from the saved file.
Input new images containing faces to be classified.
Detect faces in the new images.
Extract face encodings from the detected faces.
Use the trained classifier to predict the identities of the faces based on their features.
Output the predicted labels for each face.
Add Face Module Workflow:
Receive new images containing faces to be added to the system.
Extract face encodings and labels from the new images.
Load the pre-trained classifier.
Extract existing face encodings and labels from the classifier.
Concatenate the existing and new face encodings and labels.
Retrain the classifier with the updated data.
Save the updated classifier to the file for future use.

4. Technologies Used:
Python: The primary programming language used for development.
OpenCV: Used for face detection and image processing tasks.
face_recognition Library: Used for face recognition and feature extraction.
scikit-learn: Used for implementing machine learning algorithms and model training.
NumPy: Used for numerical computations and array manipulation.
Joblib: Used for saving and loading trained machine learning models.

5. Use Cases:
Security and surveillance systems
Access control systems
Attendance management systems
Personalized user experiences in applications
Law enforcement and forensic applications

6. Future Enhancements:
Real-time face recognition for video streams
Improved accuracy through deep learning-based approaches
Integration with cloud-based services for scalability
Multi-modal biometric recognition (e.g., combining face and voice recognition)
Continuous learning and adaptation to new faces over time
This project aims to provide a foundation for building sophisticated face recognition systems with the potential for various practical applications.