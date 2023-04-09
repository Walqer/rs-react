import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import CharacterCards from '../components/CharacterCards';
import Character from '../interfaces/Character';
import preloader from '../assets/Hourglass.gif';
import mortygif from '../assets/mortyhead.gif';
import Modal from '../components/Modal';
import CharacterCard from '../components/DetailedCard';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<boolean>(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [characterId, setCharacterId] = useState<number>();
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [isPending, setIsPending] = useState(true);
  const hadleSearch = (query: string) => {
    setSearchQuery(`?name=${query}`);
  };

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${searchQuery}`)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          setIsPending(false);
        } else {
          setError(false);
        }
        return response.json();
      })
      .then((data) => setCharacters(data.results))
      .then(() => setIsPending(false));

    return () => {
      setIsPending(true);
      setCharacters(null);
    };
  }, [searchQuery]);

  const closeModal = () => {
    setModalVisibility(false);
    setCharacterId(undefined);
  };

  const showModal = (id: number) => {
    setModalVisibility(true);
    setCharacterId(id);
  };
  return (
    <>
      <h1 className="main-title">Hello these are characters from the Rick & Morty</h1>
      <Search onSearch={hadleSearch} />
      {isPending && (
        <div className="preloader">
          <img width={256} height={256} src={preloader} alt="preloader" />
          <span>Loading...</span>
        </div>
      )}
      {error && (
        <div className="preloader">
          <img width={256} height={256} src={mortygif} alt="preloader" />
          <span>Character not found</span>
        </div>
      )}
      {characters && !error && <CharacterCards showModal={showModal} characters={characters} />}
      {(characterId || characterId === 0) && (
        <Modal
          modalVisibility={modalVisibility}
          closeModal={closeModal}
          modalComponent={<CharacterCard id={characterId} />}
        />
      )}
    </>
  );
}

export default Home;
