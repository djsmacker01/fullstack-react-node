import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Errors from '../components/errors';
import { Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // create user object
    const user = {
      email,
      password,
    };

    try {
      // send user object to backend
      const response = await axios.post(
        'http://localhost:4000/api/login',
        user
      );

      // save token to local storage
      localStorage.setItem('codehance-token', response.data.token);

      // redirect to users page
      navigate('/users');
    } catch (error) {
      setErrors(error.response);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <Errors errors={errors} />

      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>

        <p>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>

        <p>
          <button type="submit">Login</button>
        </p>
      </form>
      <p>Don't have an account? <Link to='/register'>Register Here</Link></p>
    </div>
  );
}
