import { Link } from "react-router-dom";
import "../styles/login.css";

export default function LoginMain() {
  return (
    <div className="login-main-container">
      <h1>Login</h1>
      <p>Are you a Student, Instructor or Parent?</p>

      <div className="login-buttons">
        <Link to="/student-login" className="button">I'm a Student</Link>
        <Link to="/instructor-login" className="button">I'm an Instructor</Link>
        <Link to="/parent-login" className="button">I'm a Parent</Link>
      </div>
    </div>
  );
}
