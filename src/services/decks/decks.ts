import { baseApi } from '@/services/base-api.ts'
import {
  CreateDeckArgs,
  Deck,
  DeckCardsByIdResponse,
  DecksResponse,
  GetDecksArgs,
  GetDeckCardsByIdArgs,
  GetDeckByIdArgs,
  GetDeckByIdResponse,
  Card,
  GetRandomCard,
  SaveCardRating,
} from '@/services/decks/types'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksResponse, GetDecksArgs>({
        query: args => {
          return { url: `v1/decks`, method: 'GET', params: args }
        },
        providesTags: ['Decks'],
      }),
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        query: ({ name }) => {
          return { url: `v1/decks`, method: 'POST', body: { name } }
        },
        invalidatesTags: ['Decks'],
      }),
      getDeckCardsById: builder.query<DeckCardsByIdResponse, GetDeckCardsByIdArgs>({
        query: ({ id, ...args }) => {
          return { url: `v1/decks/${id}/cards`, method: 'GET', params: { ...args } }
        },
        providesTags: ['Decks'],
      }),
      getDeckById: builder.query<GetDeckByIdResponse, GetDeckByIdArgs>({
        query: ({ id, ...args }) => {
          return { url: `v1/decks/${id}`, method: 'GET', params: { ...args } }
        },
        providesTags: ['Decks'],
      }),
      getRandomCard: builder.query<Card, GetRandomCard>({
        query: ({ id, ...args }) => {
          return { url: `v1/decks/${id}/learn`, method: 'GET', params: { ...args } }
        },
        providesTags: ['Decks'],
      }),
      saveCardRating: builder.mutation<{}, SaveCardRating>({
        query: ({ id, ...args }) => {
          return { url: `v1/decks/${id}/learn`, method: 'POST', body: { ...args } }
        },
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useCreateDeckMutation,
  useGetDeckByIdQuery,
  useGetDeckCardsByIdQuery,
  useGetRandomCardQuery,
  useSaveCardRatingMutation,
} = decksApi
