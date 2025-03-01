import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You are not authorized to view this content.');
        return;
      }

      try {
        const response = await axios.get('https://ordermanagement-production-0b45.up.railway.app/api/users/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users. You may not have sufficient permissions.');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="w-screen flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">User List</h2>

        {error && (
          <p className="text-red-600 text-center mb-4">
            {error}
          </p>
        )}

        {!error && users.length > 0 ? (
          <ul className="divide-y divide-gray-300">
            {users.map((user) => (
              <li key={user.id} className="py-4">
                <div className="flex justify-between items-center">
                  <div className="text-gray-700 font-semibold">{user.company_name}</div>
                  <div
                    className={`${
                      user.is_staff ? 'text-green-600' : 'text-gray-600'
                    } font-medium`}
                  >
                    {user.is_staff ? 'Staff' : 'Regular User'}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          !error && (
            <p className="text-gray-600 text-center">No users found.</p>
          )
        )}
      </div>
    </div>
  );
};

export default UserList;
