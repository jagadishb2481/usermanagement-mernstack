import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const baseUrl = "http://localhost:3001/api/";
const UserList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get(`${baseUrl}getAll`).then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div className='container'>
      <h1>User List</h1>
      <Table table className="table table-hover table-sm" >
        <thead className="thead-dark">
          <tr class="table-dark">
             <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} class="table-secondary">
                <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td> <div className='container'>
              <button type="button" class="btn btn-primary">Edit</button>
              <button type="button" class="btn btn-danger">Delete</button> 
                </div> 
              </td>
              
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
