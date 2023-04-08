import React, { ChangeEvent, useState } from 'react';

export default function Search() {
  const [data, setData] = useState(localStorage.searchData);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: searchData } = event.target;
    setData(searchData);
    localStorage.searchData = searchData;
  };

  return (
    <form className="search-form">
      <input
        onInput={handleInput}
        name="search"
        type="search"
        defaultValue={data}
        placeholder="Adam Sendler"
      />
    </form>
  );
}
