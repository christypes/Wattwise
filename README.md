# TP-Link Kasa KP115 Integration for Real-Time Energy Monitoring

This project integrates the **TP-Link Kasa KP115 Smart Plug** into a DIY solution for real-time energy monitoring and analytics. The system captures energy usage data, processes it via an API, and displays insights on a custom web dashboard.

---

## Features
- **Real-Time Energy Monitoring**: Fetch current power (Watts) and cumulative energy (kWh) usage.
- **Data Analytics**: Store and analyze historical data for long-term energy trends.
- **Web Integration**: Visualize energy usage through a custom-built web dashboard.

---

## Table of Contents
1. [Getting Started](#getting-started)
2. [System Requirements](#system-requirements)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Project Structure](#project-structure)
6. [Future Improvements](#future-improvements)

---

## Getting Started

Follow these steps to set up the project:

### Prerequisites
1. A TP-Link Kasa KP115 Smart Plug configured via the **Kasa Smart app**.
2. Python 3.8 or higher installed on your system.
3. A Wi-Fi network compatible with the KP115.

---

## System Requirements

- **Hardware**: TP-Link Kasa KP115 Smart Plug
- **Software**:
  - Python (3.8+)
  - `python-kasa` library (for local integration)
  - Optional: Flask/Django for backend
- **Other Tools**:
  - Database for analytics (e.g., SQLite, PostgreSQL)
  - Web front-end (HTML/CSS/JavaScript)
