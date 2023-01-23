import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Errors from '../components/errors';
import Nav from '../components/nav';

export default function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});

  // fetch users from backend and handle unauthenticated users
  const fetchUsers = async() => {
    try {
      // make request with session token
      const response = await axios.get('http://localhost:4000/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('codehance-token')}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        // redirect to login page
        navigate('/login');
      }
      setErrors(error.response);
    }
  };

  // fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // delete user
  const deleteUser = async(id) => {
    try {
      await axios.delete(`http://localhost:4000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('codehance-token')}`,
        },
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      setErrors(error.response);
    }
  };

  return (
    <>
      <Nav />

      <h2 style={{textDecoration: 'underline'}}>List of users from backend</h2>

      <Errors errors={errors} />

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
                <button onClick={() => navigate(`/users/${user.id}`)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
