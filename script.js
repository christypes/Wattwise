// script.js

function showTab(tabId) {
    document.getElementById('status').style.display = 'none';
    document.getElementById('history').style.display = 'none';
    document.getElementById(tabId).style.display = 'block';
}

// Replace this with your real API endpoint
const API_URL = "https://wattwise.onrender.com/";

async function fetchDeviceStatus() {
    try {
        const response = await fetch(`${API_URL}/api/status`);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        updateDashboard(data);
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("device-status").textContent = "Offline";
    }
}

// Updates dashboard text according to fetched data
function updateDashboard(data) {
    const statusElement = document.getElementById('device-status');
    statusElement.textContent = "Online";
    statusElement.style.color = data.isRunning ? "#4caf50" : "#f44336";
    document.getElementById('current-usage').textContent = `${data.currentPower} W`;
    document.getElementById('total-usage').textContent = `Total: ${data.totalEnergy} kWh`;
}
