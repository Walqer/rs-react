import React, { useState } from 'react';
import Search from '../components/Search';
import CharacterCards from '../components/CharacterCards';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const hadleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <h1 className="main-title">Hello these are random people in the world</h1>
      <Search onSearch={hadleSearch} />
      <CharacterCards searchQuery={searchQuery} />;
    </>
  );
}

export default Home;
