import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import CharacterCards from '../components/CharacterCards';
import Character from '../interfaces/Character';
import preloader from '../assets/Hourglass.gif';
import Modal from '../components/Modal';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [characterId, setCharacterId] = useState<number>();
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [isPending, setIsPending] = useState(true);
  const hadleSearch = (query: string) => {
    setSearchQuery(query);
  };

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

  const closeModal = () => {
    setModalVisibility(false);
  };

  const showModal = (id: number) => {
    setCharacterId(id);
    return setModalVisibility(true);
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
      <Modal
        modalVisibility={modalVisibility}
        closeModal={closeModal}
        modalText={`${characterId}`}
      />
    </>
  );
}

export default Home;
