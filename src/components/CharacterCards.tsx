import React from 'react';
import Character from '../interfaces/Character';

interface CharacterCardsProps {
  characters: Character[] | null;
}

function CharacterCards(props: CharacterCardsProps) {
  const { characters } = props;
  return (
    <ul className="user-list">
      {characters?.map((person) => (
        <li className="user-card" key={person.id}>
          <img src={person.image} alt={`${person.name}`} />
          <p>{person.name}</p>
        </li>
      ))}
    </ul>
  );
}

export default CharacterCards;
