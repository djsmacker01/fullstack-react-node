import React, { useState } from 'react';
import axios from 'axios';
import Errors from '../components/errors';
import Nav from '../components/nav';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  // registration form
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // create user object
    const user = {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
    };

    // send user object to backend
    try {
      await axios.post('http://localhost:4000/api/users', user);
      // redirect to login page
      navigate('/login');
    } catch (error) {
      setErrors(error.response);
    }
  };

  return (
    <>
      <Nav />

      <h2>Register</h2>

      <Errors errors={errors} />

      <form onSubmit={handleSubmit}>
        <p>
          <input
            placeholder="First Name"
            type="text"
            id="firstname"
            value={first_name}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </p>

        <p>
          <input
            placeholder="Last Name"
            type="text"
            id="lastname"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </p>

        <p>
          <input
            placeholder="Email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>

        <p>
          <input
            placeholder="Password"
            type="password"
            autoComplete="off"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>

        <p>
          <input
            placeholder="Confirm Password"
            type="password"
            autoComplete="off"
            id="confirm_password"
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </p>

        <p>
          <button type="submit">Register</button>
        </p>
      </form>
    </>
  );
}
