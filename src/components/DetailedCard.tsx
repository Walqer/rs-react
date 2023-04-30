import React from 'react';
import preloader from '/Hourglass.gif';
import mortygif from '/mortyhead.gif';
import { useGetCharactersQuery } from '../api/character';

interface CharacterCardProps {
  id: number;
}

export default function CharacterCard(props: CharacterCardProps) {
  const { id } = props;
  const { data: characterData, isFetching, isError } = useGetCharactersQuery(`${id}`);

  if (isFetching) {
    return (
      <div className="preloader">
        <img width={128} height={128} src={preloader} alt="preloader" />
        <span>Loading...</span>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="preloader">
        <img width={128} height={128} src={mortygif} alt="preloader" />
        <span>mortygif...</span>
        <span>Character not found</span>
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
