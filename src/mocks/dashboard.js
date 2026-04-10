import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

export const metricsData = [
  {
    id: 1,
    title: 'Выручка',
    value: 500000,
    change: '+120 000 за месяц',
    icon: AttachMoneyIcon,
    format: (v) => `${v.toLocaleString('ru-RU')} ₽`,
  },
  {
    id: 2,
    title: 'Заказы',
    value: 4520,
    change: '+645 за месяц',
    icon: ShoppingCartIcon,
    format: (v) => v.toLocaleString('ru-RU'),
  },
  {
    id: 3,
    title: 'Новые клиенты',
    value: 123,
    change: '+14 за месяц',
    icon: PersonAddIcon,
    format: (v) => v.toLocaleString('ru-RU'),
  },
  {
    id: 4,
    title: 'Конверсия',
    value: 34,
    change: '+12% за месяц',
    icon: TrendingUpIcon,
    format: (v) => `${v}%`,
  },
]

export const revenueData = [
  { month: 'Янв', revenue: 320000 },
  { month: 'Фев', revenue: 280000 },
  { month: 'Мар', revenue: 410000 },
  { month: 'Апр', revenue: 390000 },
  { month: 'Май', revenue: 450000 },
  { month: 'Июн', revenue: 470000 },
  { month: 'Июл', revenue: 430000 },
  { month: 'Авг', revenue: 460000 },
  { month: 'Сен', revenue: 510000 },
  { month: 'Окт', revenue: 540000 },
  { month: 'Ноя', revenue: 580000 },
  { month: 'Дек', revenue: 620000 },
]

export const trafficSourcesData = [
  { name: 'Поиск', value: 42 },
  { name: 'Прямые заходы', value: 25 },
  { name: 'Соцсети', value: 18 },
  { name: 'Реклама', value: 12 },
  { name: 'Прочее', value: 3 },
]

export const ordersData = {
  week: [
    { label: 'Пн', orders: 45 },
    { label: 'Вт', orders: 52 },
    { label: 'Ср', orders: 48 },
    { label: 'Чт', orders: 61 },
    { label: 'Пт', orders: 78 },
    { label: 'Сб', orders: 95 },
    { label: 'Вс', orders: 82 },
  ],
  month: Array.from({ length: 30 }, (_, i) => ({
    label: `${i + 1}`,
    orders: Math.round(40 + Math.random() * 70),
  })),
  quarter: [
    { label: 'Октябрь', orders: 1820 },
    { label: 'Ноябрь', orders: 2150 },
    { label: 'Декабрь', orders: 2640 },
  ],
}