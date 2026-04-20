import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export function MetricCard({ title, value, change, icon: Icon }) {
  return (
    <Card variant="outlined">
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: 'primary.light',
            color: 'primary.contrastText',
            flexShrink: 0,
          }}
        >
          <Icon />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
            {value}
          </Typography>
          <Typography variant="caption" color="success.main">
            {change}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}