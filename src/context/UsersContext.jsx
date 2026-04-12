import { createContext, useContext, useCallback, useReducer, useEffect } from 'react'
import { fetchUsers, createUser, updateUserApi, deleteUserApi } from '../api/usersApi'

const UsersContext = createContext(null)

const initialState = {
  users: [],
  isLoading: false,
  error: null,
}

function usersReducer(state, action) {
  switch (action.type) {
    case 'fetch_start':
      return { ...state, isLoading: true, error: null }
    case 'fetch_success':
      return { ...state, isLoading: false, users: action.payload }
    case 'fetch_error':
      return { ...state, isLoading: false, error: action.payload }

    case 'add_success':
      return { ...state, users: [...state.users, action.payload] }
    case 'update_success':
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u
        ),
      }
    case 'delete_success':
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
      }

    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export function UsersProvider({ children }) {
  const [state, dispatch] = useReducer(usersReducer, initialState)

  useEffect(() => {
    let cancelled = false
    dispatch({ type: 'fetch_start' })
    fetchUsers()
      .then((data) => {
        if (!cancelled) dispatch({ type: 'fetch_success', payload: data })
      })
      .catch((err) => {
        if (!cancelled) dispatch({ type: 'fetch_error', payload: err.message })
      })
    return () => {
      cancelled = true
    }
  }, [])

  const addUser = useCallback(async (userData) => {
    const created = await createUser(userData)
    dispatch({ type: 'add_success', payload: created })
    return created
  }, [])

  const updateUser = useCallback(async (user) => {
    const updated = await updateUserApi(user)
    dispatch({ type: 'update_success', payload: updated })
    return updated
  }, [])

  const deleteUser = useCallback(async (id) => {
    await deleteUserApi(id)
    dispatch({ type: 'delete_success', payload: id })
    return id
  }, [])

  const value = {
    users: state.users,
    isLoading: state.isLoading,
    error: state.error,
    addUser,
    updateUser,
    deleteUser,
  }

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}

export function useUsers() {
  const context = useContext(UsersContext)
  if (context === null) {
    throw new Error('useUsers должен использоваться внутри UsersProvider')
  }
  return context
}