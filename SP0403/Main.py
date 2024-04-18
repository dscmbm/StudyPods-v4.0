import face_recognition
import cv2
import numpy as np


import os
class FaceRecognition:
    def __init__(self):
        self.known_face_encodings = [

        ]
        self.known_face_names = [

        ]
        self.images = []
        self.Known_distance = 76.2

        # width of face in the real world or Object Plane 
        # centimeter 
        self.Known_width = 14.3        
        
        
        self.face_detector=cv2.CascadeClassifier("haarcascade_frontalface_default.xml")
        self.GREEN = (0, 255, 0) 
        self.RED = (0, 0, 255) 
        self.WHITE = (255, 255, 255) 
        self.BLACK = (0, 0, 0)         
        self.getData()


    def getData(self):
        for x in os.listdir("Assest/"):
            if x[x.rindex("."):].lower() not in [".png",".jpg",".tiff",".jpeg"]:
                print(x)
                continue
            imgfile="Assest/"+x
            
            imgname=x[:x.rindex(".")].upper()

            image = face_recognition.load_image_file(imgfile)
            self.known_face_encodings.append(face_recognition.face_encodings(image)[0])
            self.known_face_names.append(imgname)
            self.images.append(imgfile)

 

    # focal length finder function 
    def Focal_Length_Finder(self,measured_distance, real_width, width_in_rf_image): 

        # finding the focal length 
        focal_length = (width_in_rf_image * measured_distance) / real_width 
        return focal_length 

    # distance estimation function 
    def Distance_finder(self,Focal_Length, real_face_width, face_width_in_frame): 

        distance = (real_face_width * Focal_Length)/face_width_in_frame 

        # return the distance 
        return distance 


    def face_data(self,image): 

        face_width = 0 # making face width to zero 

        # converting color image to gray scale image 
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) 

        # detecting face in the image 
        faces = self.face_detector.detectMultiScale(gray_image, 1.3, 5) 

        # looping through the faces detect in the image 
        # getting coordinates x, y , width and height 
        for (x, y, h, w) in faces: 

            # draw the rectangle on the face 
            '''cv2.rectangle(image, (x, y), (x+w, y+h), self.GREEN, 2) '''

            # getting face width in the pixels 
            face_width = w 

        # return the face width in pixel 
        return face_width 


   
    def vidRecognize(self):
        Known_distance = 76.2
        distance=[]


        print(self.known_face_encodings,self.known_face_names)
        video_capture = cv2.VideoCapture(0)
         

        # reading reference_image from directory 
        ref_image = cv2.imread(self.images[0]) 

        # find the face width(pixels) in the reference_image 
        ref_image_face_width = self.face_data(ref_image) 


        Focal_length_found =self.Focal_Length_Finder( 
            Known_distance, self.Known_width, ref_image_face_width)        
        # Initialize some variables
        face_locations = []
        face_encodings = []
        face_names = []
        process_this_frame = True
        while True:
            # Grab a single frame of video
            ret, frame = video_capture.read()

            # Only process every other frame of video to save time
            if process_this_frame:
                # Resize frame of video to 1/4 size for faster face recognition processing
                small_frame = cv2.resize(frame, (0,0), fx=0.25, fy=0.25)

                # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
                
                rgb_small_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)
                
                # Find all the faces and face encodings in the current frame of video
                face_locations = face_recognition.face_locations(rgb_small_frame)
                face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

                face_names = []
                distance=[]
                for face_encoding in face_encodings:
                    # See if the face is a match for the known face(s)
                    matches = face_recognition.compare_faces(self.known_face_encodings, face_encoding)
                    name = "Unknown"

                    # # If a match was found in known_face_encodings, just use the first one.
                    # if True in matches:
                    #     first_match_index = matches.index(True)
                    #     name = known_face_names[first_match_index]

                    # Or instead, use the known face with the smallest distance to the new face
                    face_distances = face_recognition.face_distance(self.known_face_encodings, face_encoding)
                    best_match_index = np.argmin(face_distances)
                    if matches[best_match_index]:
                        name = self.known_face_names[best_match_index]
                    face_names.append(name)
                    face_width_in_frame=face_locations[face_names.index(name)][1]-face_locations[face_names.index(name)][3]                    
                    
                    if face_width_in_frame<0:
                        face_width_in_frame*=-1
                    distance.append(self.Distance_finder(
                    Focal_length_found, self.Known_width, face_width_in_frame))
            print(distance)
                    



            process_this_frame = not process_this_frame


            # Display the results
            for (top, right, bottom, left), name,Distance in zip(face_locations, face_names,distance):
                print(face_locations)
                print(face_names)
                # Scale back up face locations since the frame we detected in was scaled to 1/4 size
                
                top *= 4
                right *= 4
                bottom *= 4
                left *= 4
                

                # Draw a box around the face
                cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

                # Draw a label with a name below the face
                cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 255, 255), cv2.FILLED)
                font = cv2.FONT_HERSHEY_DUPLEX
                print(f"{name}:{round(Distance/4-20,2)}")
                cv2.putText(frame, f"{name}:{round(Distance/4-20,2)}CM", (left + 6, bottom - 6), font, 1.0, (0, 0, 0), 1)

            # Display the resulting image
            cv2.imshow('Face Recognition', frame)

            # Hit 'q' on the keyboard to quit!
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        # Release handle to the webcam
        video_capture.release()
        cv2.destroyAllWindows()        
       
x = FaceRecognition()
x.vidRecognize()
