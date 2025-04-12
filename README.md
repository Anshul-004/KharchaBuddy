# 💰 Kharcha Buddy

Kharcha Buddy is a mobile app to help you track your expenses easily. You can add expenses manually or scan receipts to save time. It's built to be simple, fast, and useful for everyday expense management.

---

## 🔧 Features

- ➕ Add expenses manually with amount, category, and notes  
- 📷 Scan receipts to auto-fill expense details using OCR  
- 📂 Organize expenses by category and tags  
- 📅 View daily, weekly, or monthly summaries  
- 📊 Get visual breakdowns with simple analytics  
- 📱 Mobile-friendly design using React Native

---

## 🛠 Tech Stack

- React Native (Expo)  
- Node.js + Express  
- MongoDB  
- OCR: Tesseract.js or Google Vision API  
- State: Context API or Zustand

---

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm  
- Expo CLI (`npm install -g expo-cli`)  
- MongoDB (local or Atlas)  
- OCR API key (if using a third-party service)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-kharcha-buddy-repo-url>
   cd KharchaBuddy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   OCR_API_KEY=your_ocr_service_key
   ```

4. Start the app:
   ```bash
   npx expo start
   ```

   Scan the QR code using Expo Go on your phone.
