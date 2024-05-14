import streamlit as st
from PIL import Image
import tensorflow as tf
import numpy as np

# Set constants
IMAGE_SIZE = 256
BATCH_SIZE = 32
CHANNELS = 3

# Load the trained model
st.cache(allow_output_mutation=True)
def load_model():
    return tf.keras.models.load_model("Potatodisease.h5")

model = load_model()

# Define class names
class_names = ["Potato___Early_blight", "Potato___Late_blight", "Potato___healthy"]

# Function to preprocess the uploaded image
def preprocess_image(image):
    img = image.resize((IMAGE_SIZE, IMAGE_SIZE))
    img_array = np.array(img) / 255.0  # Normalize
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    return img_array

# Function to make prediction
def make_prediction(model, image, class_names):
    img_array = preprocess_image(image)
    prediction = model.predict(img_array)
    predicted_class_index = np.argmax(prediction)
    predicted_class = class_names[predicted_class_index]
    confidence = prediction[0][predicted_class_index] * 100
    return predicted_class, confidence

# Streamlit app
st.title("Potato Disease Detection")

# File uploader
uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])

# Make prediction when the user uploads an image
if uploaded_file is not None:
    # Display the uploaded image
    image = Image.open(uploaded_file)
    st.image(image, caption='Uploaded Image', use_column_width=True)
    
    # Make prediction when the user clicks the button
    if st.button("Predict"):
        # Get prediction
        predicted_class, confidence = make_prediction(model, image, class_names)
        
        # Display the predicted disease name and confidence
        st.subheader("Prediction")
        st.write(f"Predicted Disease: {predicted_class}")
        st.write(f"Confidence: {confidence:.2f}%")
