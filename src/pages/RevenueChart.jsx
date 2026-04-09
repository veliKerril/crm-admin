import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
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

const formatRub = (v) => `${(v / 1000).toLocaleString('ru-RU')}k ₽`

export function RevenueChart() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Выручка за год
        </Typography>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={formatRub} tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value) => [`${value.toLocaleString('ru-RU')} ₽`, 'Выручка']}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#1976d2"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}