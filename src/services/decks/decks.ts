import { baseApi } from '@/services/base-api.ts'
import {
  CreateDeckArgs,
  Deck,
  DecksCardsByIdResponse,
  DecksResponse,
  GetDecksArgs,
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
      getDecksCardsById: builder.query<DecksCardsByIdResponse, { id: string }>({
        query: ({ id }) => {
          return { url: `v1/decks/${id}/cards`, method: 'GET' }
        },
        providesTags: ['Decks'],
      }),
    }
  },
})

export const { useGetDecksQuery, useCreateDeckMutation, useGetDecksCardsByIdQuery } = decksApi
