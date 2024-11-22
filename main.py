# from tplinkcloud import TPLinkDeviceManager
# import asyncio
# import json

# async def main():
#     manager = TPLinkDeviceManager("msg.shkim@gmail.com", "ck951753")
#     device = await manager.find_device("Laundry")
#     power_usage = await device.get_power_usage_realtime()
#     print(json.dumps(power_usage, indent=2, default=lambda x: x.__dict__))
# asyncio.run(main())

from flask import Flask, jsonify
from tplinkcloud import TPLinkDeviceManager

# Initialize Flask app
app = Flask(__name__)
manager = TPLinkDeviceManager("msg.shkim@gmail.com", "ck951753")

@app.route('/api/status', methods=['GET'])
def get_device_status():
    try:
        devices = manager.get_devices()
        for device in devices:
            if device.alias == "Your KP115 Alias":  # Replace with your device's alias
                energy_data = device.get_energy_usage()
                return jsonify({
                    "current_power": energy_data["current_power"],
                    "total_energy": energy_data["total_energy"]
                })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run Flask server
if __name__ == '__main__':
    app.run(debug=True)
