# import asyncio, json
# async def main():
#     manager = TPLinkDeviceManager("msg.shkim@gmail.com", "ck951753")
#     device = await manager.find_device("Laundry")
#     power_usage = await device.get_power_usage_realtime()
#     print(json.dumps(power_usage, indent=2, default=lambda x: x.__dict__))
# asyncio.run(main())

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from tplinkcloud import TPLinkDeviceManager
import asyncio

# Initialize FastAPI app
app = FastAPI()

# CORS Middleware for cross-origin access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],#"https://chriswrites.github.io"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# TP-Link Device Manager Initialization
manager = TPLinkDeviceManager("msg.shkim@gmail.com", "ck951753")

# Route to get device status
@app.get("/api/status")
async def get_device_status():
    try:
        # Fetch device data asynchronously
        device = await manager.find_device("Laundry")  # Replace "Laundry" with your device's name
        power_usage = await device.get_power_usage_realtime()
        return {
            "current_power": power_usage.power_mw / 1000,  # Convert mW to W
            "total_energy": power_usage.total_wh / 1000,   # Convert Wh to kWh
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the app (for local testing only)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5001)
