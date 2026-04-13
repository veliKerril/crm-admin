import { createContext, useContext, useCallback } from 'react'
import { fetchUsers, createUser, updateUserApi, deleteUserApi } from '../api/usersApi'
import { useFetch } from '../hooks/useFetch'

const UsersContext = createContext(null)

export function UsersProvider({ children }) {
  const { data, isLoading, error, setData } = useFetch(fetchUsers)

  const users = data ?? []

  const addUser = useCallback(async (userData) => {
    const created = await createUser(userData)
    setData((prev) => [...(prev ?? []), created])
    return created
  }, [setData])

  const updateUser = useCallback(async (user) => {
    const updated = await updateUserApi(user)
    setData((prev) => (prev ?? []).map((u) => (u.id === updated.id ? updated : u)))
    return updated
  }, [setData])

  const deleteUser = useCallback(async (id) => {
    await deleteUserApi(id)
    setData((prev) => (prev ?? []).filter((u) => u.id !== id))
    return id
  }, [setData])

  const value = { users, isLoading, error, addUser, updateUser, deleteUser }

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}

export function useUsers() {
  const context = useContext(UsersContext)
  if (context === null) {
    throw new Error('useUsers должен использоваться внутри UsersProvider')
  }
  return context
}