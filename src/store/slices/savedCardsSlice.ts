import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SavedCardsState {
  savedCards: string[];
}

const initialState: SavedCardsState = {
  savedCards: [],
};

const savedCardsSlice = createSlice({
  name: "savedCards",
  initialState,
  reducers: {
    toggleCard: (state, action: PayloadAction<string>) => {
      const cardId = action.payload;
      const index = state.savedCards.indexOf(cardId);
      if (index >= 0) {
        state.savedCards.splice(index, 1);
      } else {
        state.savedCards.push(cardId);
      }
    },
  },
});

export const { toggleCard } = savedCardsSlice.actions;

export default savedCardsSlice.reducer;
