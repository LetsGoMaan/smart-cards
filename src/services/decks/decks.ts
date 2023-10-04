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
  CreateCardArgs,
  UpdateDeckArgs,
  DeleteDeckArgs,
} from '@/services'
import { baseApi } from '@/services/base-api.ts'

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
        query: ({ ...args }) => {
          return { url: `v1/decks`, method: 'POST', body: { ...args } }
        },
        invalidatesTags: ['Decks'],
      }),
      getDeckCardsById: builder.query<DeckCardsByIdResponse, GetDeckCardsByIdArgs>({
        query: ({ id, ...args }) => {
          return { url: `v1/decks/${id}/cards`, method: 'GET', params: { ...args } }
        },
        providesTags: ['Decks', 'Cards'],
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
        providesTags: ['Learn'],
      }),
      saveCardRating: builder.mutation<{}, SaveCardRating>({
        query: ({ id, ...args }) => {
          return { url: `v1/decks/${id}/learn`, method: 'POST', body: { ...args } }
        },
        invalidatesTags: ['Learn'],
      }),
      createCard: builder.mutation<Card, CreateCardArgs>({
        query: ({ id, ...args }) => {
          return { url: `v1/decks/${id}/cards`, method: 'POST', body: { ...args } }
        },
        invalidatesTags: ['Decks'],
      }),
      updateDeck: builder.mutation<Deck, UpdateDeckArgs>({
        query: ({ id, ...args }) => {
          return { url: `v1/decks/${id}`, method: 'PATCH', body: { ...args } }
        },
        invalidatesTags: ['Decks'],
      }),
      deleteDeckById: builder.mutation<Deck, DeleteDeckArgs>({
        query: ({ id }) => {
          return { url: `v1/decks/${id}`, method: 'DELETE' }
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
  useCreateCardMutation,
  useUpdateDeckMutation,
  useDeleteDeckByIdMutation,
} = decksApi
