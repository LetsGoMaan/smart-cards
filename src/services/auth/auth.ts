import {
  AuthResponse,
  LoginRequestArgs,
  LoginResponse,
  SignUpRequestArgs,
} from '@/services/auth/types.ts'
import { baseApi } from '@/services/base-api.ts'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      logout: builder.mutation<void, void>({
        query: () => {
          return { url: `v1/auth/logout`, method: 'POST' }
        },
      }),
      login: builder.mutation<LoginResponse, LoginRequestArgs>({
        query: ({ ...args }) => {
          return { url: `v1/auth/login`, method: 'POST', body: { ...args } }
        },
      }),
      authMe: builder.query<AuthResponse, void>({
        query: () => {
          return { url: `v1/auth/me`, method: 'GET' }
        },
        extraOptions: {
          maxRetries: 0,
        },
      }),
      signUp: builder.mutation<AuthResponse, SignUpRequestArgs>({
        query: ({ ...args }) => {
          return { url: `v1/auth/sign-up`, method: 'POST', body: { ...args } }
        },
      }),
    }
  },
})

export const { useLogoutMutation, useLoginMutation, useAuthMeQuery, useSignUpMutation } = authApi
