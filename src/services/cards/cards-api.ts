import { Card } from '@/services'
import { baseApi } from '@/services/base-api.ts'
import { DeleteCardArg, UpdateCardArgs } from '@/services/cards/types.ts'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      updateCard: builder.mutation<Card, UpdateCardArgs>({
        query: ({ id, ...args }) => {
          const formData = new FormData()

          args.answerImg && formData.append('answerImg', args.answerImg)
          formData.append('answer', args.answer)
          args.questionImg && formData.append('questionImg', args.questionImg)
          formData.append('question', args.question)

          return { url: `v1/cards/${id}`, method: 'PATCH', body: formData, formData: true }
        },
        invalidatesTags: ['Cards'],
      }),
      deleteCard: builder.mutation<void, DeleteCardArg>({
        query: ({ id }) => {
          return { url: `v1/cards/${id}`, method: 'DELETE' }
        },
        invalidatesTags: ['Cards'],
      }),
    }
  },
})

export const { useUpdateCardMutation, useDeleteCardMutation } = cardsApi
