<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
=======
# 🚨 SentinelAI - AI-Powered Emergency Prioritization & Response System

> "SentinelAI transforms emergency response by using AI-driven triage, intelligent prioritization, and real-time geospatial awareness to ensure critical incidents receive immediate attention." 🚨

An intelligent emergency response platform that receives SOS requests, uses AI to assess severity, assigns priority scores, and visualizes incidents on a real-time map to help emergency operators respond faster and more effectively.

---

## 📖 Table of Contents
* [Problem Statement](#-problem-statement)
* [Solution Overview](#-solution-overview)
* [Key Features](#-key-features)
* [System Architecture](#-system-architecture)
* [User Roles](#-user-roles)
* [Product Requirements](#-product-requirements)
* [Frontend Specification](#-frontend-specification)
* [Backend Specification](#-backend-specification)
* [API Documentation](#-api-documentation)
* [Database Schema](#-database-schema)
* [Tech Stack](#-tech-stack)
* [Demo Workflow](#-demo-workflow)
* [Hackathon Scope](#-hackathon-scope)
* [Future Scope](#-future-scope)

---

## 🚨 Problem Statement

Emergency services often receive hundreds of SOS requests simultaneously during accidents, crimes, medical emergencies, disasters, and women's safety incidents. Current systems rely heavily on manual triage, causing:

* Delayed response times
* Misprioritized incidents
* Resource inefficiencies
* Lack of real-time situational awareness
* Critical emergencies remaining unattended while less severe cases are processed

---

## 💡 Solution Overview

SentinelAI autonomously streamlines the emergency intake process. The system receives SOS reports, analyzes the reports using AI, assigns a priority score, and classifies the emergency type. It then displays incidents on a live map, sorts emergencies by urgency, and assists operators in crucial decision-making.

---

## ⭐ Key Features

* **AI Emergency Triage:** Analyzes text reports, images, and location data to output a priority score, severity level, and emergency type.
* **Priority Dashboard:** Operators can view all incidents, sort by priority, filter by emergency type, and monitor live statistics.
* **AI Image Analysis:** Detects vehicle accidents, fires, violence indicators, and crowd incidents.
* **Women Safety Fast Track:** AI automatically boosts priority if distress keywords are detected, the emergency occurs late at night, or the SOS suggests personal danger.
* **Fake SOS Detection (Future):** Identifies spam reports, duplicate incidents, and suspicious submissions.

### Real-Time Emergency Map

Displays incidents using color-coded markers based on urgency:

| Priority | Color |
| :--- | :--- |
| Critical | 🔴 Red |
| High | 🟠 Orange |
| Medium | 🟡 Yellow |
| Low | 🟢 Green |

---

## 🏗 System Architecture

## 🏗 System Architecture

| Stage | Component | Action / Data Handled |
| :---: | :--- | :--- |
| **1** | 👤 **Citizen** | Triggers emergency SOS alert. |
| **2** | 📱 **Client App** | Captures `Text Description`, `Image`, & `GPS Location`. |
| **3** | ⚙️ **Backend API** | Receives and authenticates the emergency payload. |
| **4** | 🧠 **Gemini AI** | Analyzes context ➔ Generates `Priority Score` & `Severity`. |
| **5** | 🗄️ **Database** | Stores incident securely as a document. |
| **6** | 🖥️ **Operator UI** | Dispatches real-time updates to **Dashboard** and **Live Map**. |

## 👥 User Roles

**Citizen**
* Submit SOS
* Upload image
* Share location

**Operator / Admin**
* View incidents
* Monitor emergency map
* Filter incidents
* Update status

---

## 📋 Product Requirements

### SOS Submission
Users can submit their emergency type, a brief description, their live location (latitude/longitude), and an image of the incident.

### AI Analysis
The system generates a Priority Score (0-100), a Severity Level, and an Emergency Type.

### Dashboard & Map
The system displays an incident list with priority ranking, filters, and statistics. It also plots incidents on a live map that updates in real-time.

---

## 🖥 Frontend Specification

### Routes

* **`/` (Home):** Project overview and quick SOS access.
* **`/submit-sos` (Submit SOS):** Fields for Emergency Type, Description, Latitude, Longitude, and Image Upload.
* **`/dashboard` (Dashboard):** Features the Incident Table, Priority Ranking, Search, Filters, and Statistics.
* **`/map` (Emergency Map):** Features Priority Markers, Filtering, and Incident Popups.
* **`/incidents/:id` (Incident Details):** Displays Description, Priority Score, Severity, Location, AI Reasoning, and Status.

### 📂 Frontend Folder Structure (`src/`)

| Folder / Category | File | Purpose |
| :--- | :--- | :--- |
| 📄 **`pages/`** | `Home.tsx` | Project overview and quick SOS access button. |
| | `SubmitSOS.tsx` | Handles citizen SOS inputs (text, image, location). |
| | `Dashboard.tsx` | Operator view with priority ranking, filters, and stats. |
| | `MapView.tsx` | Renders the full-screen geospatial emergency map. |
| | `IncidentDetails.tsx` | Shows detailed AI reasoning, priority score, and status. |
| 🧩 **`components/`** | `Navbar.tsx` | Application navigation header. |
| | `SOSForm.tsx` | Reusable UI form for capturing the SOS payload. |
| | `IncidentCard.tsx` | UI card summarizing an individual emergency. |
| | `PriorityBadge.tsx` | Color-coded urgency indicator (Critical/High/Medium/Low). |
| | `MapComponent.tsx` | Reusable Leaflet map module for plotting incidents. |
| 🔌 **`services/`** | `api.ts` | Manages backend HTTP requests and external API calls. |
| 📦 **`context/`** | `IncidentContext.tsx` | React Context for managing global incident state. |

## ⚙ Backend Specification

* **Incident Service:** Responsible for creating, updating, retrieving, and listing incidents.
* **AI Service:** Responsible for Priority Scoring, Severity Classification, and Image Analysis using Gemini.
* **Dashboard Service:** Responsible for calculating statistics, filters, and sorting mechanisms.

---

## 📡 API Documentation

### Create SOS
**POST** `/api/incidents`
{
  "type": "Medical",
  "description": "Road accident with injuries",
  "latitude": 28.61,
  "longitude": 77.20
}

### Get All Incidents
**GET** `/api/incidents`

### Get Incident By ID
**GET** `/api/incidents/:id`

### Update Incident Status
**PATCH** `/api/incidents/:id/status`
*Possible values: Open, Assigned, Resolved*
{
  "status": "Resolved"
}

### AI Analysis
**POST** `/api/ai/analyze`
// Request
{
  "description": "Person unconscious after accident"
}

// Response
{
  "priorityScore": 95,
  "severity": "Critical",
  "emergencyType": "Medical",
  "reasoning": "Life-threatening injury detected."
}

### Image Analysis
**POST** `/api/ai/image-analyze`
{
  "detected": ["vehicle accident"],
  "confidence": 92
}

### Dashboard Statistics
**GET** `/api/dashboard/stats`
{
  "critical": 12,
  "high": 22,
  "medium": 45,
  "low": 15
}

---

## 🗄 Database Schema

**Collection: `incidents`**
{
  "id": "uuid",
  "type": "Medical",
  "description": "Person unconscious after crash",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "imageUrl": "",
  "priorityScore": 95,
  "severity": "Critical",
  "status": "Open",
  "createdAt": "timestamp"
}

---

## 🤖 AI Priority Engine (Gemini Prompt)

> **System Prompt:** You are an emergency triage officer. Analyze the emergency report and return JSON containing priorityScore (number), severity (Critical | High | Medium | Low), emergencyType (Medical | Crime | Fire | Disaster | Women Safety), and reasoning (string).

---

## 🛠 Tech Stack

* **Frontend:** React, Tailwind CSS, React Router, Leaflet
* **Backend:** Node.js, Express.js
* **Database:** Firebase Firestore
* **AI:** Gemini API
* **Maps:** Leaflet, OpenStreetMap

---

## 🚀 Demo Workflow

1. Citizen submits SOS
2. Backend stores report
3. Gemini analyzes emergency
4. Priority score generated
5. Incident saved
6. Dashboard updates
7. Marker appears on map
8. Operator responds

---

## 🏆 48-Hour Hackathon Scope

**Must Build**
* [x] SOS Submission Form
* [x] Gemini-Based Priority Engine
* [x] Emergency Dashboard
* [x] Real-Time Map
* [x] Priority Filtering
* [x] Incident Details Page

**Nice To Have**
* [x] Image Analysis
* [x] Live Updates (Firestore)
* [x] Emergency Category Filters

---

## 🔮 Future Scope

* Disaster clustering
* Automatic responder assignment
* Ambulance tracking
* Predictive risk analysis
* AI fake SOS detection
* Voice SOS support
* Video analysis
* Government emergency integration
>>>>>>> f4ee43d2e3ee19b091f549a2f04418ccbf664c04
