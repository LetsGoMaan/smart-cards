//import { current } from '@reduxjs/toolkit'

import {
  //CreateDeckArgs,
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
  RootState,
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
      //createDeck: builder.mutation<Deck, CreateDeckArgs>({
      createDeck: builder.mutation<Deck, FormData>({
        query: args => {
          return { url: `v1/decks`, method: 'POST', body: args }
        },
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          const state = getState() as RootState

          const {
            orderBy,
            authorId,
            maxCardsCount,
            minCardsCount,
            searchByName,
            itemsPerPage,
            currentPage,
          } = state.decks

          try {
            const res = await queryFulfilled

            dispatch(
              decksApi.util.updateQueryData(
                'getDecks',
                {
                  name: searchByName,
                  itemsPerPage,
                  currentPage,
                  orderBy,
                  authorId,
                  minCardsCount,
                  maxCardsCount,
                },
                draft => {
                  draft.items.pop()
                  draft.items.unshift(res.data)
                  //draft.items = [res.data, ...draft.items]
                }
              )
            )
          } catch {
            //patchResult.undo()
            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
          }
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
          const formData = new FormData()

          args.answerImg && formData.append('answerImg', args.answerImg)
          formData.append('answer', args.answer)
          args.questionImg && formData.append('questionImg', args.questionImg)
          formData.append('question', args.question)

          //return { url: `v1/decks/${id}/cards`, method: 'POST', body: { ...args } }
          return { url: `v1/decks/${id}/cards`, method: 'POST', body: formData, formData: true }
        },
        invalidatesTags: ['Decks'],
      }),
      updateDeck: builder.mutation<Deck, UpdateDeckArgs>({
        query: ({ id, ...args }) => {
          const formData = new FormData()
          const isPackPrivate = args.isPrivate ? 'true' : 'false'

          formData.append('name', args.name)
          formData.append('cover', args.cover)
          formData.append('isPrivate', isPackPrivate)
          //return { url: `v1/decks/${id}`, method: 'PATCH', body: { ...args } }

          return { url: `v1/decks/${id}`, method: 'PATCH', body: formData, formData: true }
        },
        async onQueryStarted({ id, ...args }, { dispatch, getState, queryFulfilled }) {
          const state = getState() as RootState
          const {
            orderBy,
            authorId,
            maxCardsCount,
            minCardsCount,
            searchByName,
            itemsPerPage,
            currentPage,
          } = state.decks
          const patchResult = dispatch(
            decksApi.util.updateQueryData(
              'getDecks',
              {
                name: searchByName,
                itemsPerPage,
                currentPage,
                orderBy,
                authorId,
                minCardsCount,
                maxCardsCount,
              },
              draft => {
                console.log(args)
                const ind = draft.items.findIndex(item => item.id === id)

                draft.items[ind] = {
                  ...draft.items[ind],
                  name: args.name,
                  //cover: args.cover,
                  isPrivate: args.isPrivate,
                }
              }
            )
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()

            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
          }
        },
        invalidatesTags: ['Decks'],
      }),
      deleteDeckById: builder.mutation<Deck, DeleteDeckArgs>({
        query: ({ id }) => {
          return { url: `v1/decks/${id}`, method: 'DELETE' }
        },
        async onQueryStarted({ id }, { dispatch, getState, queryFulfilled }) {
          const state = getState() as RootState
          const {
            orderBy,
            authorId,
            maxCardsCount,
            minCardsCount,
            searchByName,
            itemsPerPage,
            currentPage,
          } = state.decks
          const patchResult = dispatch(
            decksApi.util.updateQueryData(
              'getDecks',
              {
                name: searchByName,
                itemsPerPage,
                currentPage,
                orderBy,
                authorId,
                minCardsCount,
                maxCardsCount,
              },
              draft => {
                draft.items = draft.items.filter(item => item.id !== id)
                /*draft.items.splice(
                  draft.items.findIndex(item => item.id === id),
                  1
                )*/
              }
            )
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()

            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
          }
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
