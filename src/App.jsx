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
          <Route path="/attendance" element={<AttendanceRecord />} />
        </Routes>
      </div>
    </Router>
  );
}

// Registration Component
function Registration() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        if (!response.ok) throw new Error(`Error fetching users: ${response.status}`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleRegister = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const npm = event.target.npm.value;
    const password = event.target.password.value;
    const newUser = { name, npm, password, lastLogin: null };

    if (!/^\d{8}$/.test(npm)) {
      alert("NPM must be exactly 8 digits.");
      return;
    }

    const existingUser = users.find((user) => user.npm === npm);
    if (existingUser) {
      alert("NPM already registered. Please use a different NPM.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.status === 201) {
        const createdUser = await response.json();
        setUsers([...users, createdUser]);
        alert("Pendaftaran berhasil");
      } else {
        throw new Error(`Pendaftaran gagal: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
      alert("Error during registration. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h1>Registrasi</h1>
      <form onSubmit={handleRegister}>
        <input type="text" name="name" placeholder="tuliskan nama" required />
        <input type="text" name="npm" placeholder="Masukkan NPM" pattern="\d{8}" required />
        <input type="password" name="password" placeholder="Buat password" required />
        <input type="password" placeholder="Konfirmasi password" required />

        <button className="btn" type="submit">Registrasi Sekarang</button>
      </form>
      <p>Sudah mendaftar?</p>
      <Link to="/login">Login</Link>
    </div>
  );
}

// Login Component
function Login() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        if (!response.ok) throw new Error(`Error fetching users: ${response.status}`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const npm = event.target.npm.value;
    const password = event.target.password.value;

    const user = users.find(
      (user) => user.npm === npm && user.password === password
    );

    if (user) {
      alert(`absensi berhasil, selamat datang ${user.name}!`);
      const updatedUser = { ...user, lastLogin: new Date().toISOString() };

      try {
        await fetch(`http://localhost:5000/users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        });
        setUsers(users.map(u => u.id === user.id ? updatedUser : u));
      } catch (error) {
        console.error(error.message);
      }
    } else {
      alert("NPM atau password yand anda masukkan salah");
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="text" name="npm" placeholder="Masukkan NPM" pattern="\d{8}" required />
        <input type="password" name="password" placeholder="Password" required />
        <button className="btn" type="submit">masukkan absensi</button>
      </form>
      <p>Belum mendaftar?</p>
      <Link to="/register">Daftar disini</Link>
      <button className="back-btn">
        <Link to="/attendance">Lihat Record Absensi</Link>
      </button>
    </div>
  );
}

// Attendance Record Component
function AttendanceRecord() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        if (!response.ok) throw new Error(`Error fetching users: ${response.status}`);
        const data = await response.json();
        setUsers(data.sort((a, b) => new Date(b.lastLogin) - new Date(a.lastLogin)));
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUsers();
  }, []);


  return (
    <div className="form-container">
      <h1>Attendance Record</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>NPM</th>
            <th>Last Login</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.npm}</td>
              <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}</td>
            </tr>
          ))}
        </tbody>
      </table>
	        {/* Back Button */}
      <button className="back-btn">
        <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
          Kembali ke Login
        </Link>
      </button>
    </div>
  );
}

export default App;
