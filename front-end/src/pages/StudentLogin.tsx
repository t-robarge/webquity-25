import { Link } from "react-router-dom";
import "../styles/login.css";

export default function StudentLogin() {
  return (
    <div className="login-main-container">
      <h1>Student Login</h1>
      <p>Enter your email and password</p>

      <form className="login-form">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" required />

        <button type="submit" className="button">Login</button>

        <p>
          Don't have an account? <Link to="/">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

