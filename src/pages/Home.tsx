import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import preloader from '/Hourglass.gif';
import mortygif from '/mortyhead.gif';
import Search from '../components/Search';
import CharacterCards from '../components/CharacterCards';
import Modal from '../components/Modal';
import CharacterCard from '../components/DetailedCard';
import IState from '../interfaces/IsearchState';
import { setCharacterId } from '../store/searchSlice';
import { useGetCharactersQuery } from '../api/character';

function Home() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: IState) => state.search.query);
  const { data: characters, isFetching, isError } = useGetCharactersQuery(`?name=${searchQuery}`);
  const characterId = useSelector((state: IState) => state.search.characterId);
  const [modalVisibility, setModalVisibility] = useState(false);

  const closeModal = () => {
    setModalVisibility(false);
    dispatch(setCharacterId(undefined));
  };

  const showModal = (id: number) => {
    setModalVisibility(true);
    dispatch(setCharacterId(id));
  };
  return (
    <>
      <h1 className="main-title">Hello these are characters from the Rick & Morty</h1>
      <Search />
      {isFetching && (
        <div className="preloader">
          <img width={256} height={256} src={preloader} alt="preloader" />
          <span>Loading...</span>
        </div>
      )}
      {isError && (
        <div className="preloader">
          <img width={256} height={256} src={mortygif} alt="preloader" />
          <span>Character not found</span>
        </div>
      )}
      {characters && !isError && (
        <CharacterCards showModal={showModal} characters={characters.results} />
      )}
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
