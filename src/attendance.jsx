import { useState, useEffect } from 'react';

function AttendanceRecord() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        if (!response.ok) throw new Error(`Error fetching users: ${response.status}`);
        const data = await response.json();
        setUsers(data.sort((a, b) => new Date(a.lastLogin) - new Date(b.lastLogin)));
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleClearDatabase = () => {
    const password = prompt("Please enter the password to clear the database:");

    if (password === "admin1") {
      // Proceed to clear the database
      clearDatabase();
    } else {
      alert("Incorrect password. Database not cleared.");
    }
  };

  const clearDatabase = async () => {
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "DELETE", // Assuming your backend supports DELETE to clear all data
      });

      if (response.status === 200) {
        alert("Database cleared successfully.");
        setUsers([]); // Clear the users in the frontend
      } else {
        alert("Failed to clear the database.");
      }
    } catch (error) {
      console.error("Error clearing the database:", error.message);
      alert("Error clearing the database. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h1>Attendance Record</h1>
      <button onClick={handleClearDatabase} className="btn-clear">
        Bersihkan Database
      </button>
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
    </div>
  );
}

export default AttendanceRecord;
