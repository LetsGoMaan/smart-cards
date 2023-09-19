import { baseApi } from '@/services/base-api.ts'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      logout: builder.mutation<void, void>({
        query: () => {
          return { url: `v1/auth/logout`, method: 'POST' }
        },
      }),
    }
  },
})

export const { useLogoutMutation } = authApi
