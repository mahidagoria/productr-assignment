# Productr - MERN Stack Assignment

This is the completed Full Stack web application matching the Orufy Technologies Productr Figma design constraints.

## Tech Stack
- **Frontend**: React.js (Vite), React Router, vanilla CSS perfectly matched to Figma specs.
- **Backend**: Node.js, Express.js, JSON Web Tokens (JWT).
- **Database**: MongoDB (Mongoose ODM).

## Features Complete
- **Authentication**: Pixel-perfect login screen and OTP Verification layout with a synthetic 3D background. The verification pin is mocked internally globally to `123456` for assessment testing.
- **Card-Based Published Matrix**: Fully responsive CSS Grid mapping all required fields (`name`, `type`, `stock`, `mrp`, `sellingPrice`, `brand`, `eligibility`) physically mirroring the provided Figma assets instead of standard tabular listings.
- **Publishing Engine**: A customized Mongoose `published` boolean flag mapped symmetrically to functional toggle buttons inside the dashboard cards which seamlessly pushes state updates to the REST API.
- **Dynamic Empty States**: Vector SVG empty state handling on tab filtering.

---

## 🚀 Setup Instructions

### 1. Environment Variables Configuration
For security, the database connection strings are hidden. You **must** create an environment variables file.

1. Navigate to the `/server` folder.
2. Create a file exactly named `.env`.
3. Paste the following configuration logic inside:
```env
PORT=5001
MONGODB_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING
JWT_SECRET=supersecret123
```
*(Note: Replace `YOUR_MONGODB_ATLAS_CONNECTION_STRING` with your active MongoDB cluster URI)*

### 2. How to run the Backend
Open a terminal and navigate to the project completely, then run the server index:
```bash
cd server
npm install
npm run dev
```
The Backend will start on `http://localhost:5001` (bypassing MacOS Port 5000 AirPlay limits) and automatically construct the schema if successful.

### 3. How to run the Frontend
Open **another** fresh terminal window alongside your backend and run:
```bash
cd client
npm install
npm run dev
```
The Frontend will start dynamically on `http://localhost:5173`. Click the preview link, input any email, and use the strict OTP `123456`.
