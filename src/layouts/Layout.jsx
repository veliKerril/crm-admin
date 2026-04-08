import { Outlet } from "react-router"
import { Header, Sidebar } from '../components'

export function Layout() {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
    </>
  )
}