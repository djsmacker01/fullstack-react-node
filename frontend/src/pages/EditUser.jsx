import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Errors from '../components/errors';

export default function EditUser() {
  const navigate = useNavigate(); // navigate to other pages

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const { id } = useParams(); // get id from url

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('codehance-token')}`,
          },
        }
      );
      setFirstName(response.data.first_name);
      setLastName(response.data.last_name);
      setEmail(response.data.email);
    } catch (error) {
      setErrors(error.response);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const editUser = async (e) => {
    e.preventDefault();

    const user = {
      first_name,
      last_name,
      email,
    };

    try {
      await axios.put(`http://localhost:4000/api/users/${id}`, user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('codehance-token')}`,
        },
      });
      navigate('/users');
    } catch (error) {
      setErrors(error.response);
    }
  };
  return (
    <>
      <h2 style={{ textDecoration: 'underline' }}>Edit User</h2>

      <Errors errors={errors} />

      <form onSubmit={editUser}>
        <p>
          <input
            placeholder="Firstname"
            type="text"
            name="first_name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </p>
        <p>
          <input
            placeholder="Lastname"
            type="text"
            name="last_name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </p>
        <p>
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <p>
          <button type="submit">Edit User</button>
        </p>
      </form>
    </>
  );
}
