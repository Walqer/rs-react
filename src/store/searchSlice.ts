import { Slice, createSlice } from '@reduxjs/toolkit';

const appSlice: Slice = createSlice({
  name: 'app',
  initialState: {
    query: '',
    characterId: null,
    characters: null,
    cardList: [],
  },
  reducers: {
    saveQuery(state, action) {
      state.query = action.payload;
    },
    setCharacterId(state, action) {
      state.characterId = action.payload;
    },
    setCharacters(state, action) {
      state.characters = action.payload;
    },
    addCard(state, action) {
      state.cardList.push(action.payload);
    },
  },
});

export const { saveQuery, setCharacterId, setCharacters, addCard } = appSlice.actions;

export default appSlice.reducer;
