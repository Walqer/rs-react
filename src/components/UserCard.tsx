import React from 'react';

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

class UsersCards extends React.Component<object, { users: User[] }> {
  constructor(props: User) {
    super(props);
    this.state = {
      users: [] as User[],
    };
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/?results=10')
      .then((response) => response.json())
      .then((data) => this.setState({ users: data.results }));
  }

  render() {
    const { users } = this.state;
    return (
      <ul className="user-list">
        {users.map((user) => (
          <li className="user-card" key={user.login.username}>
            <img src={user.picture.large} alt="" />
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
}

export default UsersCards;
