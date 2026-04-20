import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'
import { Layout } from './layouts'
import { Analytics } from './pages/Analytics'
import { Dashboard } from './pages/Dashboard'
import { Settings } from './pages/Settings'
import { Users } from './pages/Users'
import { UsersProvider } from './context/UsersContext'
import { SnackbarProvider } from './context/SnackbarContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: 'analytics',
        element: <Analytics />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: 'users',
        element: <Users />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackbarProvider>
      <UsersProvider>
        <RouterProvider router={router} />
      </UsersProvider>
    </SnackbarProvider>
  </StrictMode>
)
