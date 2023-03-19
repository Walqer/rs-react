import React from 'react';
import UserCard from '../components/UserCard';
import Search from '../components/Search';

function Home() {
  return (
    <>
      <h1>Hello these are random people in the world</h1>
      <Search />
      <UserCard />;
    </>
  );
}

export default Home;
