// script.js

// Replace this with your real API endpoint
const API_URL = "https://example.com/api/energy"; // Placeholder URL

async function fetchEnergyData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        updateDashboard(data);
    } catch (error) {
        console.error("Error fetching energy data:", error);
        document.getElementById('device-status').textContent = "Error connecting to device.";
    }
}

function updateDashboard(data) {
    const deviceStatus = data.isRunning ? "Running" : "Off";
    const currentUsage = `${data.currentPower} W`;
    const totalUsage = `Total: ${data.totalEnergy} kWh`;

    document.getElementById('device-status').textContent = deviceStatus;
    document.getElementById('current-usage').textContent = currentUsage;
    document.getElementById('total-usage').textContent = totalUsage;

    // Update styles dynamically
    const statusElement = document.getElementById('device-status');
    statusElement.style.color = data.isRunning ? "#4caf50" : "#f44336";
}

// Fetch data every 5 seconds
setInterval(fetchEnergyData, 5000);
fetchEnergyData();
