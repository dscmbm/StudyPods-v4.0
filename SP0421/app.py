from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api', methods=['POST'])
def process_message():
    message = request.json.get('message', '')
    if not message:
        return jsonify({'error': 'No message provided'}), 400

    response = send_to_ai_api(message)
    return jsonify({'message': response})

def send_to_ai_api(message):
    # Replace 'YOUR_API_KEY' with your actual API key
    api_key = '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'
    # Replace 'YOUR_MODEL_ID' with your actual model ID
    model_id = 'gpt-3.5-turbo-0125'
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json',
    }
    data = {
        'model': model_id,
        'messages': [
            {'role': 'user', 'content': message + " give only health and fitness related answers " + "if user asks deviates from the health related topic give an massage with an apology that sorry im not made for this"}
        ]
    }
    url = 'https://api.openai.com/v1/chat/completions'
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json()['choices'][0]['message']['content'].strip()
    else:
        return f'Error: {response.status_code} - {response.text}'

if __name__ == '__main__':
    app.run(debug=True)