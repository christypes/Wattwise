from flask import Flask, jsonify
from flask_cors import CORS
from tplinkcloud import TPLinkDeviceManager
import asyncio, json

# To 
# async def main():
#     manager = TPLinkDeviceManager("msg.shkim@gmail.com", "ck951753")
#     device = await manager.find_device("Laundry")
#     power_usage = await device.get_power_usage_realtime()
#     print(json.dumps(power_usage, indent=2, default=lambda x: x.__dict__))
# asyncio.run(main())

# Initialize Flask app
app = Flask(__name__)

# Allows CORS (Cross Origin Resource Sharing)
CORS(app, resources={r"/*": {"origins": "https://your-frontend-domain.github.io"}})         
manager = TPLinkDeviceManager("msg.shkim@gmail.com", "ck951753")

@app.route('/api/status', methods=['GET'])
def get_device_status():
    try:
        async def fetch_data():
            device = await manager.find_device("Laundry")
            return await device.get_power_usage_realtime()
        energy_data = asyncio.run(fetch_data())
        return jsonify({
                    "current_power": energy_data.power_mw,
                    "total_energy": energy_data.total_wh
                })  
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run Flask server
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=True)
