import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { MetricCard } from './MetricCard'
import { RevenueChart } from './RevenueChart'
import { TrafficSourcesChart } from './TrafficSourcesChart'
import { OrdersChart } from './OrdersChart'
import { metricsData } from '../../mocks'
import { useUsers } from '../../context/UsersContext'

export function Dashboard() {
  const { users } = useUsers()

  const metrics = metricsData.map((m) =>
    m.id === 3 ? { ...m, value: users.length } : m
  )
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Grid container spacing={2}>
        {metrics.map(({ id, title, value, change, icon, format }) => (
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

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <RevenueChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TrafficSourcesChart />
        </Grid>
      </Grid>

      <OrdersChart />
    </Box>
  )
}