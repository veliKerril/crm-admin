import { Outlet } from "react-router"
import { Box } from '@mui/material'
import { Header, Sidebar } from '../components'
import Toolbar from '@mui/material/Toolbar';

export function Layout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}