import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Chat } from "./components/Chat";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { About } from "./components/About";
import { initializeApp } from "firebase/app";

function App() {

  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBC6pyDJ-gWScE6VU_48riKn2AYTIE-BN4",
    authDomain: "fire-chat-rafasanabria1.firebaseapp.com",
    projectId: "fire-chat-rafasanabria1",
    storageBucket: "fire-chat-rafasanabria1.appspot.com",
    messagingSenderId: "56990427317",
    appId: "1:56990427317:web:f186095704aaf85b21f6fc"
  };

  // Initialize Firebase
  const app = initializeApp (firebaseConfig);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/login" replace/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
