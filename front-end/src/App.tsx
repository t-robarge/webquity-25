// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ChatBot from "./pages/ChatBot";
import Tasks from "./pages/Tasks";
import BookFab from "./components/BookFab";
import ChatWidget from "./components/chat/ChatWidget";
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
      <BookFab to="/tasks" size={50} />
      <ChatWidget />
    </>
  );
}
