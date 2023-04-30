import React from 'react';
import { FormCardProps } from './Form';

interface CardProps {
  cardData: FormCardProps;
}

export default function Card(props: CardProps) {
  const { cardData: user } = props;
  return (
    <li className="user-card">
      <img className="user-card__img" src={user.avatarLink} alt="card" />
      <span>name: {user.inputName}</span> <br />
      <span>surname : {user.inputLastName}</span>
      <p>birthday: {user.inputBirthday}</p>
      <p>gender: {user.inputSex}</p>
      <p>country: {user.selectCountry}</p>
    </li>
  );
}
