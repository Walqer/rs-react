import React from 'react';

import { FormProps } from './Form';

export interface User {
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

interface CardProps {
  cardData: FormProps;
}

// eslint-disable-next-line react/prefer-stateless-function
export class Card extends React.Component<CardProps> {
  render() {
    const { cardData: user } = this.props;
    return (
      <div className="user-card">
        <img src={user.inputAvatar} alt="" />
        <p>
          {user.inputName} {user.inputLastName}
        </p>
        <p>{user.inputBirthday}</p>
        <p>{user.inputSex}</p>
        <p>{user.selectCountry}</p>
      </div>
    );
  }
}
