import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Layout } from '@/components'
import {
  CardPage,
  Decks,
  ForgotPasswordPage,
  FriendsDeckPage,
  MyDeckPage,
  Profile,
  SignInPage,
  SignUpPage,
} from '@/pages'
import { CheckEmailPage } from '@/pages/check-email-page/check-email-page.tsx'
import { useAuthMeQuery } from '@/services'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <SignInPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/check-email',
    element: <CheckEmailPage />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Decks />,
  },
  {
    path: '/my-profile',
    element: <Profile />,
  },
  {
    path: '/my-pack/:id',
    element: <MyDeckPage />,
  },
  {
    path: '/friends-pack/:id',
    element: <FriendsDeckPage />,
  },
  {
    path: '/card/:id',
    element: <CardPage />,
  },
]

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [...publicRoutes, { element: <PrivateRoutes />, children: privateRoutes }],
  },
])

function PrivateRoutes() {
  const { data, isLoading } = useAuthMeQuery()

  if (isLoading) return <div>loading...</div>
  const isLoggedIn = !!data

  return isLoggedIn ? <Outlet /> : <Navigate to={'/login'} />
}

export const Router = () => {
  return <RouterProvider router={router} />
}
