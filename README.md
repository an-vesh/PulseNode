# PulseNode 🏥⚡

> **Stop waiting. Start saving lives with Algorithmic Triage.**

PulseNode is a real-time, multi-tenant SaaS application designed to revolutionize how Emergency Rooms manage patient intake and resource allocation. By automating triage sorting and bed management, PulseNode ensures the most critical patients receive care instantly.

---

## 🚨 The Problem: The Fatal Flaw in Modern ERs
Currently, most Emergency Rooms operate on a "first-come, first-served" basis or rely on slow, manual triage sorting by exhausted nursing staff. When a critical trauma patient arrives 15 minutes after someone with a minor injury, the cognitive overhead of manually re-sorting the waiting list often leads to fatal delays. Beds sit empty while staff try to figure out who goes next.

## 💡 The Solution: Algorithmic Automation
PulseNode shifts the cognitive load to our backend infrastructure, completely automating the intake, sorting, and bed assignment processes using mathematically proven algorithms.

### ⚙️ Core Technical Innovations
* **Max-Heap Priority Queue in RAM:** Instead of a standard array or database query, the backend uses a Priority Queue (Max-Heap) data structure. When a new patient arrives, they are mathematically sorted to their exact priority spot in `O(log n)` time based on vital severity.
* **Algorithmic Triage Scoring:** The system calculates a priority score (0-100+) by heavily weighting objective vital signs (Heart Rate, Blood Pressure) and immediate trauma flags (Active Blood Loss), overriding subjective symptom reporting.
* **Greedy Resource Matcher:** When a doctor discharges a patient, our Greedy Algorithm instantly `extractMax()` pops the highest-priority patient from the heap and assigns them to the newly available bed. Zero manual work required.
* **Isolated WebSockets:** A multi-tenant SaaS architecture where multiple hospitals operate simultaneously. Real-time `Socket.io` rooms guarantee that Hospital A's live updates never bleed into Hospital B's dashboard.

---

## ✨ Features

- **Secure Hospital Registration:** Password-protected accounts with bcrypt hashing.
- **Admin Command Center:** A beautiful, dark-mode dashboard for managing the ER.
- **Real-Time Patient Intake:** Add patients with vitals, blood type, and trauma notes.
- **Live Auto-Sorting Queue:** The patient list re-arranges itself instantly.
- **One-Click Discharges:** Clear a bed and the next critical patient is instantly pulled from the queue and assigned.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend:** Node.js, Express.js, Socket.io.
- **Database:** MongoDB (Mongoose ORM).
- **Security:** bcryptjs for password hashing.

---

## 🚀 Running Locally

### Prerequisites
- Node.js installed
- A MongoDB cluster URI (Atlas or Local)

### 1. Clone & Install
```bash
git clone https://github.com/an-vesh/PulseNode.git
cd PulseNode

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Variables
Create a `.env` file in the `backend/` directory:
```env
MONGO_URI=mongodb://localhost:27017/acuityflow
PORT=5000
```

Create a `.env` file in the `frontend/` directory (optional if using defaults):
```env
VITE_BACKEND_URL=http://localhost:5000
```

### 3. Start the Servers
Open two terminal instances.

**Terminal 1: Backend**
```bash
cd backend
node server.js
```

**Terminal 2: Frontend**
```bash
cd frontend
npm run dev
```

Navigate to `http://localhost:5173` to view the app!

---

*Designed and engineered to eliminate the wait.*
