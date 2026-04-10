const firstNames = ['Иван', 'Мария', 'Алексей', 'Ольга', 'Дмитрий', 'Елена', 'Сергей', 'Анна', 'Павел', 'Татьяна']
const lastNames = ['Иванов', 'Петров', 'Смирнов', 'Кузнецов', 'Соколов', 'Попов', 'Лебедев', 'Козлов', 'Новиков', 'Морозов']
const roles = ['admin', 'manager', 'user']
const statuses = ['active', 'inactive']

export const usersData = Array.from({ length: 20 }, (_, i) => {
  const first = firstNames[i % firstNames.length]
  const last = lastNames[(i * 3) % lastNames.length]
  const name = `${first} ${last}`
  return {
    id: i + 1,
    name,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
    role: roles[i % roles.length],
    status: statuses[i % 4 === 0 ? 1 : 0], // примерно 25% inactive
    createdAt: new Date(2024, i % 12, ((i * 7) % 27) + 1).toISOString(),
    orders: Math.round(5 + ((i * 13) % 200)),
  }
})