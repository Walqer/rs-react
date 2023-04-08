import React, { useState, useEffect } from 'react';
import Character from '../interfaces/Character';
import preloader from '../assets/Hourglass.gif';

interface CharacterCardProps {
  id: number;
}

export default function CharacterCard(props: CharacterCardProps) {
  const [characterData, setCharacterData] = useState<Character | null>(null);
  const { id } = props;
  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => response.json())
      .then((data) => setCharacterData(data));
  }, [id]);

  if (!characterData) {
    return (
      <div className="preloader">
        <img width={128} height={128} src={preloader} alt="preloader" />
        <span>Loading...</span>
      </div>
    );
  }
  const { image, name, status, species, location, gender } = characterData;
  return (
    characterData && (
      <div className="character">
        <img className="character__img" src={image} alt={name} />
        <div className="character__info">
          <span className="character__name">{name}</span>
          <span className="gender">gender: {gender}</span>
          <span className="character__status">
            {status} - {species}
          </span>
          <span className="location">Last known location: {location.name}</span>
        </div>
      </div>
    )
  );
}
