import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Layout } from '@/components'
import { Decks, EmptyDeck, Profile } from '@/pages'
import { FriendsDeckPage } from '@/pages/friends-deck-page'

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
    path: '/deck/id',
    element: <EmptyDeck />,
  },
  {
    path: '/deck/clmqc0jvg0liqvo2q97l4eyrp/cards',
    element: <FriendsDeckPage />,
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
