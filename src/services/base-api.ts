import { createApi } from '@reduxjs/toolkit/query/react'

import { customFetchBase } from '@/services/base-api-with-refetch.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Decks', 'Cards', 'Learn', 'Me'],
  /*baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),*/
  baseQuery: customFetchBase,
  endpoints: () => ({}),
})
