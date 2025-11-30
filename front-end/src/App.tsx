// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import BookFab from "./components/BookFab";
import ChatWidget from "./components/chat/ChatWidget";
import InstructorLogin from "./pages/InstructorLogin";
import ParentLogin from "./pages/ParentLogin";
import StudentLogin from "./pages/StudentLogin";
import LoginMain from "./pages/Login";
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/instructor-login" element={<InstructorLogin />} />
        <Route path="/parent-login" element={<ParentLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/login" element={<LoginMain />} />
      </Routes>
      <BookFab to="/tasks" size={50} />
      <ChatWidget />
    </>
  );
}
