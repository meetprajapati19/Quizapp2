import React, { useState } from 'react';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const history = useHistory();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post('http://localhost:5000/api/faculty/login', { username, password });
  //     localStorage.setItem('token', res.data.token);
  //     history.push('/dashboard');
  //   } catch (err) {
  //     console.error(err);
  //     alert('Invalid credentials');
  //   }
  // };

  return (
    <div>
      <h2>Login</h2>
      <form >
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
