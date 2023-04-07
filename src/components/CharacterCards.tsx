import React, { useState, useEffect } from 'react';
import Character from '../interfaces/Character';

interface CharacterCardsProps {
  searchQuery: string;
}

function CharacterCards(props: CharacterCardsProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const { searchQuery } = props;
  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?name=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => setCharacters(data.results));
  }, [searchQuery]);

  return (
    <ul className="user-list">
      {characters.map((person) => (
        <li className="user-card" key={person.id}>
          <img src={person.image} alt={`${person.name}`} />
          <p>{person.name}</p>
          <p>{person.location.name}</p>
        </li>
      ))}
    </ul>
  );
}

export default CharacterCards;
