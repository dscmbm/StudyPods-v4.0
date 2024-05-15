import os
from flask import Flask, render_template, request, redirect, url_for
from werkzeug.utils import secure_filename

app = Flask(__name__)

UPLOAD_FOLDER = 'images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif'}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/colorize', methods=['POST', 'GET'])
def colorize():
    if request.method == 'POST':
        if 'image' not in request.files:
            return redirect(request.url)

        file = request.files['image']

        if file.filename == '':
            return redirect(request.url)

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)

            # Run the colorization script
            os.system(f'python colorize.py --image {filepath}')

            # Load and display the colorized image
            colorized_image_path = 'colorized_image.jpg'
            colorized_image = url_for('static', filename=colorized_image_path)

            return render_template('index.html', colorized_image=colorized_image)
    else:
        return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
