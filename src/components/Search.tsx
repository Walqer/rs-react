import React, { ChangeEvent, useEffect, useState } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

export interface FormProps {
  serchQuery: string;
}

export default function Search(props: SearchProps) {
  const [data, setData] = useState(localStorage.searchData);
  const { onSearch } = props;
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: searchData } = event.target;
    setData(searchData);
    localStorage.searchData = searchData;
    if (searchData.length === 0) {
      onSearch(data);
    }
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(data);
  };

  useEffect(() => {
    onSearch(data);
  }, []);

  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input
        className="search-form__input"
        onInput={handleInput}
        name="search"
        type="search"
        defaultValue={data}
        placeholder="Rick"
      />
    </form>
  );
}
