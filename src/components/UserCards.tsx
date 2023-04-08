import React, { useState, useEffect } from 'react';
import User from '../interfaces/User';

function UsersCards() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetch('/data/users.json')
      .then((response) => response.json())
      .then((data) => setUsers(data.results));
  }, [users]);

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li className="user-card" key={user.login.username}>
          <img src={user.picture.large} alt={`${user.login.username} logo`} />
          <p>
            {user.name.first} {user.name.last}
          </p>
          <p>
            {user.location.city}, {user.location.state}, {user.location.country}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default UsersCards;
