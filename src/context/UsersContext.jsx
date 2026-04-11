import { createContext, useContext, useState, useCallback } from 'react'
import { usersData } from '../mocks'

const UsersContext = createContext(null)

export function UsersProvider({ children }) {
  const [users, setUsers] = useState(usersData)

  const addUser = useCallback((userData) => {
    setUsers((prev) => {
      const newUser = {
        ...userData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        orders: 0,
      }
      return [...prev, newUser]
    })
  }, [])

  const updateUser = useCallback((updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? { ...u, ...updatedUser } : u))
    )
  }, [])

  const deleteUser = useCallback((id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }, [])

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