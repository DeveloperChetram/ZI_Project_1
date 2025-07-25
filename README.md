# 📊 Excel Analytics Platform

A full-stack MERN application that allows users to upload Excel files, dynamically map data to chart axes, generate 2D/3D charts, and download results as images or PDFs. The platform includes user/admin authentication, dashboard history, and optional AI-based insights.

---

## 🚀 Features

- 🔐 **User & Admin Authentication** (JWT-based)
- 📁 **Excel Upload & Parsing** using `SheetJS`
- 📈 **Dynamic Data Mapping** (X and Y axes selection)
- 📊 **Chart Generation**:
  - Bar, Line, Pie, Scatter (Chart.js)
  - 3D Column Charts (Three.js)
- 📥 **Downloadable Charts** (PNG, PDF)
- 🧠 **AI Tools API Integration** *(Optional)* for smart data summaries
- 🗂️ **Dashboard** with upload history
- 🌐 **Responsive UI**

---

## 🛠 Tech Stack

### Frontend
- React.js
- Redux Toolkit
- Tailwind CSS
- Chart.js
- Three.js

### Backend
- Node.js
- Express.js
- MongoDB
- Multer (File Upload)
- SheetJS (`xlsx` for Excel parsing)

### Optional
- OpenAI or similar API for insights
- Cloudinary (if image storage is required)

---

## 📅 Development Timeline (5 Weeks)

| Week | Milestone |
|------|-----------|
| 1 | Project setup, user/admin authentication, dashboard layout |
| 2 | File upload setup, Excel parsing logic, storing data in MongoDB |
| 3 | Chart rendering with Chart.js & Three.js, dynamic axis selection |
| 4 | Save analysis history, enable download, integrate AI API |
| 5 | Admin panel, testing, deployment (Netlify/Render) |

---


