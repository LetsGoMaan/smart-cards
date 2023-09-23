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
        query: args => {
          return { url: `v1/decks/${args.id}/cards`, method: 'GET' }
        },
        providesTags: ['Decks'],
      }),
      getDeckById: builder.query<GetDeckByIdResponse, GetDeckByIdArgs>({
        query: args => {
          return { url: `v1/decks/${args.id}`, method: 'GET' }
        },
        providesTags: ['Decks'],
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useCreateDeckMutation,
  useGetDeckByIdQuery,
  useGetDeckCardsByIdQuery,
} = decksApi
