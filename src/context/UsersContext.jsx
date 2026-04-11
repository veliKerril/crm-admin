import { createContext, useContext, useCallback, useReducer } from 'react'
import { usersData } from '../mocks'

const UsersContext = createContext(null)

function usersReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const newUser = {
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        orders: 0,
      }
      return [...state, newUser]
    }
    case 'update':
      return state.map(u => u.id === action.payload.id ? { ...u, ...action.payload } : u)
    case 'delete':
      return state.filter(u => u.id !== action.payload)
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export function UsersProvider({ children }) {
  const [users, dispatch] = useReducer(usersReducer, usersData)

  const addUser = useCallback((userData) => dispatch({ type: 'add', payload: userData }), [])
  const updateUser = useCallback((user) => dispatch({ type: 'update', payload: user }), [])
  const deleteUser = useCallback((id) => dispatch({ type: 'delete', payload: id }), [])

  const value = { users, addUser, updateUser, deleteUser }

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}

export function useUsers() {
  const context = useContext(UsersContext)
  if (context === null) {
    throw new Error('useUsers должен использоваться внутри UsersProvider')
  }
  return context
}