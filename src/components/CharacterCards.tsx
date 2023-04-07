import React, { useState, useEffect } from 'react';
import Character from '../interfaces/Character';
import preloader from '../assets/Hourglass.gif';

interface CharacterCardsProps {
  searchQuery: string;
}

function CharacterCards(props: CharacterCardsProps) {
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [isPending, setIsPending] = useState(true);
  const { searchQuery } = props;
  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?name=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => setCharacters(data.results))
      .then(() => setIsPending(false));

    return () => {
      setIsPending(true);
      setCharacters(null);
    };
  }, [searchQuery]);

  return (
    <>
      {isPending && (
        <div className="preloader">
          <img width={256} height={256} src={preloader} alt="preloader" />
          <span>Loading...</span>
        </div>
      )}
      {characters && (
        <ul className="user-list">
          {characters.map((person) => (
            <li className="user-card" key={person.id}>
              <img src={person.image} alt={`${person.name}`} />
              <p>{person.name}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default CharacterCards;
