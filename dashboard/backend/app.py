from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load data
df = pd.read_csv("../../data/BrentOilPrices.csv")
df['Date'] = pd.to_datetime(df['Date'], format='mixed', dayfirst=True)
events = pd.read_csv("../../data/events.csv")
events['Date'] = pd.to_datetime(events['Date'], format='%d-%b-%y')

@app.route('/api/prices', methods=['GET'])
def get_prices():
    data = {
        'dates': df['Date'].dt.strftime('%Y-%m-%d').tolist(),
        'prices': df['Price'].tolist()
    }
    return jsonify(data)

@app.route('/api/events', methods=['GET'])
def get_events():
    data = {
        'dates': events['Date'].dt.strftime('%Y-%m-%d').tolist(),
        'descriptions': events['Event_Description'].tolist()
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)