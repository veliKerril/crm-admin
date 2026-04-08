import { NavLink } from "react-router";

export function Sidebar() {
  return (
    <>
      <NavLink to='/dashboard'>Дашборд</NavLink>
      <NavLink to='/analytics'>Аналитика</NavLink>
      <NavLink to='/settings'>Настройки</NavLink>
      <NavLink to='/user'>Пользователь</NavLink>
    </>
  )
}           
