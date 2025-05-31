import React, { useState } from 'react';
import axios from 'axios';
//import '.src/pages/Login.css';


const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <input type="text" placeholder="Username" required
             onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="Password" required
             onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
