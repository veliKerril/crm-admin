import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from "react-router";

const links = [
  { to: '/dashboard', label: 'Дашборд' },
  { to: '/analytics', label: 'Аналитика' },
  { to: '/settings',  label: 'Настройки' },
  { to: '/user',      label: 'Пользователь' },
]

export function Sidebar() {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent">
      <Toolbar />
      <List
        sx={{ bgcolor: 'background.paper' }}
        component="nav"
      >
        {links.map(({ to, label }) => (
          <ListItemButton
            key={to}
            component={NavLink}
            to={to}
            end
            sx={{
              '&.active': {
                bgcolor: 'action.selected',
              },
            }}
          >
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}