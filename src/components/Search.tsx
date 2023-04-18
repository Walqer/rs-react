import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveQuery } from '../store/searchSlice';
import IState from '../interfaces/IsearchState';

export default function Search() {
  const [text, setText] = useState<string>('');
  const dispatch = useDispatch();
  const query = useSelector((state: IState) => state.search.query);
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: searchData } = event.target;
    setText(searchData);
    if (searchData.length === 0) {
      dispatch(saveQuery(text));
    }
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(saveQuery(text));
  };

  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input
        className="search-form__input"
        onInput={handleInput}
        name="search"
        type="search"
        defaultValue={query}
        placeholder="Rick"
      />
    </form>
  );
}
