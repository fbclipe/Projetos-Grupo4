import React, { useState, useEffect } from 'react';
import './User.css';

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);

  return (
    <div className="user-container">
      <h2>Usuários</h2>
      {users.map(u => (
        <div key={u.id} className="user-card">
          <h3>{u.username}</h3>
          <p>{u.email}</p>
        </div>
      ))}
    </div>
  );
}
