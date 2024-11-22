from tplinkcloud import TPLinkDeviceManager
import asyncio
import json

async def main():
    manager = TPLinkDeviceManager("msg.shkim@gmail.com", "ck951753")
    device = await manager.find_device("Laundry")
    power_usage = await device.get_power_usage_realtime()
    print(json.dumps(power_usage, indent=2, default=lambda x: x.__dict__))
    
    

asyncio.run(main())

