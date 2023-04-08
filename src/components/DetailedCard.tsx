import React from 'react';
import Character from '../interfaces/Character';

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard(props: CharacterCardProps) {
  const { character } = props;
  const { image, name, status, species, location, gender } = character;
  return (
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
  );
}
