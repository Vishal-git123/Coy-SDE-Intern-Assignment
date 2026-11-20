# COY – Profile Discovery & Matching Platform

A full-stack profile discovery and matching application built as part of the **COY SDE Internship Assignment**. The platform allows users to discover profiles, express interest through likes, and connect through mutual matches.

The project focuses on building a functional user experience backed by REST APIs, persistent data storage, and matching logic.

## ✨ Key Features

- **Profile Discovery:** Browse and discover other user profiles through an interactive interface.
- **Like & Swipe Functionality:** Express interest in profiles through user interactions.
- **Mutual Matching:** A match is established when two users express interest in each other.
- **Matches Dashboard:** View profiles with whom a mutual match has been established.
- **Match Notifications:** Display a match confirmation through an interactive modal.
- **Persistent Storage:** Store profile and interaction data using MongoDB.
- **Component-Based UI:** Reusable React components for profile cards, navigation, swipe actions, and match views.

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, JavaScript, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| API Communication | REST APIs |
| Styling | CSS |
| Development Tools | Git, GitHub, npm |

## 🏗️ Project Architecture

The application follows a frontend-backend architecture.

```text
COY-SDE-INTERN-ASSIGNMENT/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── MatchModal.jsx
│   │   │   ├── MatchesView.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProfileCard.jsx
│   │   │   └── SwipeButtons.jsx
│   │   │
│   │   ├── Pages/
│   │   │   ├── Discover.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Matches.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Profile.js
│   │   └── Swipe.js
│   ├── routes/
│   │   └── profileRoutes.js
│   ├── seed.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

## ⚙️ Core Application Logic

### 1. Profile Discovery

Users can browse available profiles through the Discover section. The interface presents profile information and provides interaction controls.

### 2. Like & Matching Mechanism

The matching functionality is based on mutual interest:

1. User A likes User B.
2. The application records the interaction.
3. The system checks whether User B has already liked User A.
4. If both users have expressed interest, a mutual match is established.
5. The match is reflected in the Matches section.

**Important distinction:** A like and a match are two different states. A one-sided like does not automatically constitute a mutual match.

### 3. Matches Management

The Matches section presents mutually interested users, keeping the discovery and confirmed-match experiences separate.

## 🚀 Getting Started

Follow these instructions to run the project locally.

### Prerequisites

- Node.js and npm
- MongoDB instance (local MongoDB or MongoDB Atlas)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Vishal-git123/Coy-Sde-intern-assignment.git

cd Coy-Sde-intern-assignment
```

### 2. Configure the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Replace the MongoDB connection string with your own database credentials.

### 3. Start the Backend

```bash
node server.js
```

The backend should start on the configured port after successfully connecting to MongoDB.

### 4. Configure the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your browser.

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| PORT | Backend server port |
| MONGO_URI | MongoDB connection string |

Never commit `.env` files, database credentials, or other sensitive configuration to GitHub.



- Home / Landing Page
- Discover Profiles
- Like Interaction
- Successful Mutual Match
- Matches Dashboard

*Screenshots can be added to a `screenshots/` directory and embedded here.*

## 💡 Engineering Considerations

The implementation separates frontend presentation from backend business logic.

Key considerations include:

- Reusable frontend components for maintainability.
- Separate data models for profiles and swipe interactions.
- REST-based communication between frontend and backend.
- MongoDB for persistent application data.
- Mutual-interest verification before establishing a match.


## 👨‍💻 Developer

**Vishal Singh**

B.Tech – Electronics and Communication Engineering  
Maharaja Agrasen Institute of Technology, Delhi

- GitHub: [Vishal-git123](https://github.com/Vishal-git123)
- Project Repository: [COY SDE Intern Assignment](https://github.com/Vishal-git123/Coy-Sde-intern-assignment)

---

**Built with a focus on functional correctness, clean architecture, and practical full-stack development.**

*Developed as part of the COY Software Development Engineer Internship Assignment.*
