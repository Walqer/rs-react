import React, { useState, useEffect } from 'react';

interface User {
  gender: string;
  name: {
    first: string;
    last: string;
  };
  location: {
    city: string;
    state: string;
    country: string;
  };
  email: string;
  login: {
    username: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

function UsersCards() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetch('/data/users.json')
      .then((response) => response.json())
      .then((data) => setUsers(data.results));
  });

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
