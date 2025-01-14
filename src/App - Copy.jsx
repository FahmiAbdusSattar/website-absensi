import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

function Registration() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/users.json")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleRegister = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      alert("Email already registered. Please use a different email.");
    } else {
      alert("Registration Successful!");
    }
  };

  return (
    <div className="form-container">
      <h1>Registration Form</h1>
      <form onSubmit={handleRegister}>
        <input type="text" name="name" placeholder="Enter your name" required />
        <input type="email" name="email" placeholder="Enter your email" required />
        <input type="password" name="password" placeholder="Create a password" required />
        <input type="password" placeholder="Confirm your password" required />
        <div className="checkbox-container">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">I accept all terms & conditions</label>
        </div>
        <button className="btn" type="submit">Register Now</button>
      </form>
      <p>Already have an account?</p>
      <Link to="/login">Login now</Link>
    </div>
  );
}

function Login() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/users.json")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      alert('Welcome back, ${user.email}!');
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Enter your email" required />
        <input type="password" name="password" placeholder="Enter your password" required />
        <button className="btn" type="submit">Login Now</button>
      </form>
      <p>Don't have an account?</p>
      <Link to="/register">Register here</Link>
    </div>
  );
}

export default App;