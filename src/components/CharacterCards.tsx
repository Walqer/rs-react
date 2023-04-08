import React from 'react';
import Character from '../interfaces/Character';

interface CharacterCardsProps {
  characters: Character[] | null;
  showModal: (id: number) => void;
}

function CharacterCards(props: CharacterCardsProps) {
  const { characters, showModal } = props;
  return (
    <ul className="user-list">
      {characters?.map((person, index) => (
        <li
          className="user-card"
          key={person.id}
          onClick={() => showModal(index)}
          role="presentation"
        >
          <img src={person.image} alt={`${person.name}`} />
          <p>{person.name}</p>
        </li>
      ))}
    </ul>
  );
}

export default CharacterCards;
