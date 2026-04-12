import { usersData } from '../mocks'

const DELAY = 600
const ERROR_RATE = 0.1

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const maybeFail = (message) => {
  if (Math.random() < ERROR_RATE) throw new Error(message)
}

export async function fetchUsers() {
  await wait(DELAY)
  maybeFail('Не удалось загрузить пользователей')
  return [...usersData]
}

export async function createUser(userData) {
  await wait(DELAY)
  maybeFail('Не удалось создать пользователя')
  return {
    ...userData,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    orders: 0,
  }
}

export async function updateUserApi(user) {
  await wait(DELAY)
  maybeFail('Не удалось обновить пользователя')
  return user
}

export async function deleteUserApi(id) {
  await wait(DELAY)
  maybeFail('Не удалось удалить пользователя')
  return id
}