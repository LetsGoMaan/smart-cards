import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  itemsPerPage: 10,
  currentPage: 1,
  searchByName: '',
  cardName: '',
  authorId: '',
  minCardsCount: '0',
  maxCardsCount: '100',
  //orderBy: 'updated-desc',
  orderBy: '',
  //orderBy: null,
}

export const decksSlice = createSlice({
  name: 'decks',
  initialState: initialState,
  reducers: {
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setSearchByName: (state, action: PayloadAction<string>) => {
      state.searchByName = action.payload
    },
    setCardName: (state, action: PayloadAction<string>) => {
      state.cardName = action.payload
    },
    setCardsByAuthor: (state, action: PayloadAction<string>) => {
      state.authorId = action.payload
    },
    setMinMaxCardsCount: (state, action: PayloadAction<number[]>) => {
      state.minCardsCount = action.payload[0].toString()
      state.maxCardsCount = action.payload[1].toString()
    },
    setOrderBy: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload
    },
    setDefaultValues: () => {
      return {
        ...initialState,
      }
    },
    /*
    setCardsOrderBy: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload
    },*/
  },
})
