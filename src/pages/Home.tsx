import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import CharacterCards from '../components/CharacterCards';
import Character from '../interfaces/Character';
import preloader from '../assets/Hourglass.gif';
import Modal from '../components/Modal';
import CharacterCard from '../components/DetailedCard';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [characterId, setCharacterId] = useState<number>();
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [isPending, setIsPending] = useState(true);
  const hadleSearch = (query: string) => {
    setSearchQuery(`?name=${query}`);
  };

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${searchQuery}`)
      .then((response) => response.json())
      .then((data) => setCharacters(data.results))
      .then(() => setIsPending(false));

    return () => {
      setIsPending(true);
      setCharacters(null);
    };
  }, [searchQuery]);

  const closeModal = () => {
    setModalVisibility(false);
  };

  const showModal = (id: number) => {
    setModalVisibility(true);
    setCharacterId(id);
  };
  return (
    <>
      <h1 className="main-title">Hello these are random people in the world</h1>
      <Search onSearch={hadleSearch} />
      {isPending && (
        <div className="preloader">
          <img width={256} height={256} src={preloader} alt="preloader" />
          <span>Loading...</span>
        </div>
      )}
      {characters && <CharacterCards showModal={showModal} characters={characters} />}
      {(characterId || characterId === 0) && (
        <Modal
          modalVisibility={modalVisibility}
          closeModal={closeModal}
          modalComponent={<CharacterCard character={characters![characterId]} />}
        />
      )}
    </>
  );
}

export default Home;
