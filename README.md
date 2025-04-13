# 💰 Kharcha Buddy

Kharcha Buddy is a mobile app to help you track your expenses easily. You can add expenses manually or scan receipts to save time. It's built to be simple, fast, and useful for everyday expense management.

---

# 🔧 Features

- ➕ Add expenses manually with amount, category, and notes  
- 📷 Scan receipts to auto-fill expense details using OCR  
- 📂 Organize expenses by category and tags  
- 📅 View daily, weekly, or monthly summaries  
- 📊 Get visual breakdowns with simple analytics  
- 🔐 Secure authentication using Google (Third-party Auth) + Email logins  
- 🔁 Password reset features for account recovery  
- 📱 Mobile-friendly design using React Native

---

# 🛠 Tech Stack

- **Frontend:** React Native (Expo)  
- **Backend:** SQLite, Firebase (Authentication)  
- **API:** Google Cloud Vision (OCR)  

---

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm  
- Expo CLI (`npm install -g expo-cli`)  
- Firebase project (for authentication)  
- Google Cloud Vision API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kalyanipagar18/KharchaBuddy.git
   cd KharchaBuddy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup Firebase and Google Cloud Vision API by creating a `.env` file in the root directory:
   ```env
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   FIREBASE_APP_ID=your_app_id
   GOOGLE_CLOUD_VISION_API_KEY=your_google_vision_key
   ```

4. Start the app:
   ```bash
   npx expo start
   ```

