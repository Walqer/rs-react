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

function UserCard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=10')
      .then((response) => response.json())
      .then((data) => setUsers(data.results));
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div key={user.login.username}>
          <img src={user.picture.large} alt="" />
          <p>
            {user.name.first} {user.name.last}
          </p>
          <p>{user.email}</p>
          <p>
            {user.location.city}, {user.location.state}, {user.location.country}
          </p>
        </div>
      ))}
    </div>
  );
}

export default UserCard;
