import Grid from '@mui/material/Grid'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { MetricCard } from './MetricCard'
import Box from '@mui/material/Box'
import { RevenueChart } from './RevenueChart'

const mockData = [
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

export function Dashboard() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Grid container spacing={2}>
        {mockData.map(({ id, title, value, change, icon, format }) => (
          <Grid key={id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <MetricCard
              title={title}
              value={format(value)}
              change={change}
              icon={icon}
            />
          </Grid>
        ))}
      </Grid>

      <RevenueChart />
    </Box>
  )
}