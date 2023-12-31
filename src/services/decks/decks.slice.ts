import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  itemsPerPage: 10,
  currentPage: 1,
  searchByName: '',
  authorId: '',
  tabValue: 'allCards',
  minCardsCount: '0',
  maxCardsCount: '100',
  addDeckName: '',
  editDeckName: '',
  orderBy: 'updated-desc',
  myCardsPage: {
    currentPage: '1',
    itemsPerPage: '10',
  },
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
    setCardsByAuthor: (
      state,
      action: PayloadAction<{ authorId: string; tabValue: 'allCards' | 'myCards' }>
    ) => {
      state.authorId = action.payload.authorId
      state.tabValue = action.payload.tabValue
    },
    setMinMaxCardsCount: (state, action: PayloadAction<number[]>) => {
      state.minCardsCount = action.payload[0].toString()
      state.maxCardsCount = action.payload[1].toString()
    },
    setOrderBy: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload
    },
    setEditDeckName: (state, action: PayloadAction<string>) => {
      state.editDeckName = action.payload
    },
    setDeckName: (state, action: PayloadAction<string>) => {
      state.addDeckName = action.payload
    },
    setCurrentPageMyDeck: (state, action: PayloadAction<string>) => {
      state.myCardsPage.currentPage = action.payload
    },
    setItemsPerPageMyDeck: (state, action: PayloadAction<string>) => {
      state.myCardsPage.itemsPerPage = action.payload
    },
  },
})

export const {
  setDeckName,
  setEditDeckName,
  setSearchByName,
  setCardsByAuthor,
  setMinMaxCardsCount,
  setCurrentPageMyDeck,
  setItemsPerPageMyDeck,
  setCurrentPage,
  setItemsPerPage,
  setOrderBy,
} = decksSlice.actions
