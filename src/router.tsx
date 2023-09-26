import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Layout } from '@/components'
import { Decks, FriendsDeckPage, MyDeckPage, Profile } from '@/pages'
import { CardPage } from '@/pages/card-page'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <div>login</div>,
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
  const isLoggedIn = true

  return isLoggedIn ? <Outlet /> : <Navigate to={'/login'} />
}

export const Router = () => {
  return <RouterProvider router={router} />
}
