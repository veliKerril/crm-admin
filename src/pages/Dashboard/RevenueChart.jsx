import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { revenueData } from '../../mocks'

const formatRub = (v) => `${(v / 1000).toLocaleString('ru-RU')}k ₽`

export function RevenueChart() {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Выручка за год
        </Typography>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={revenueData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
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