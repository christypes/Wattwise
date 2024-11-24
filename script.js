// script.js

const API_URL = "https://wattwise.onrender.com/";

function showTab(tabId) {
    document.getElementById('status').style.display = 'none';
    document.getElementById('history').style.display = 'none';
    document.getElementById(tabId).style.display = 'block';
}

async function fetchDeviceStatus() {
    try {
        const response = await fetch(`${API_URL}/api/status`);
        const data = await response.json();

        if (data.error){
            console.error("Error fetching device status:", data.error);
            updateDeviceStatus("Error", 0, 0);
            return;
        }
        updateDeviceStatus("Online", data.current_power, data.total_energy);
    } catch (error) {
        console.error("Error:", error);
        updateDeviceStatus("Offline", 0, 0);
    }
}

// Updates dashboard text according to fetched data
function updateDeviceStatus(status, current_power, total_energy) {
    document.getElementById("device-status").textContent = status;
    document.getElementById("current-usage").textContent = `${current_power} W`;
    document.getElementById("total-usage").textContent = `Total: ${total_energy} kWh`;
    const statusElement = document.getElementById("device-status");
    statusElement.style.color = (status === "Online") ? "#4caf50" : "#f44336";
}

function updateHistoricalChart(data) {
    const labels = data.map(item => new Date(item.timestamp).toLocaleTimeString());
    const powerData = data.map(item => item.current_power);

    const ctx = document.getElementById("historicalChart").getContext("2d");

    // Destroy existing chart if any
    if (window.historicalChart) {
        window.historicalChart.destroy();
    }

    // Create a new chart
    window.historicalChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Power Usage (W)",
                data: powerData,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

// Periodically fetch and update real-time status
setInterval(fetchDeviceStatus, 5000);       // 5 seconds
fetchDeviceStatus();

// Periodically fetch historical data
setInterval(fetchHistoricalData, 30000);    // 30 seconds
fetchHistoricalData();
