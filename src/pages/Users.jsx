import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { DataGrid } from '@mui/x-data-grid'
import { usersData } from '../mocks'
import { UsersFilters } from './UsersFilters'
import { useState, useMemo } from 'react'

const roleLabels = {
  admin: 'Администратор',
  manager: 'Менеджер',
  user: 'Пользователь',
}

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Имя', flex: 1, minWidth: 160 },
  { field: 'email', headerName: 'Email', flex: 1, minWidth: 220 },
  {
    field: 'role',
    headerName: 'Роль',
    width: 160,
    valueFormatter: (value) => roleLabels[value] ?? value,
  },
  {
    field: 'status',
    headerName: 'Статус',
    width: 130,
    renderCell: (params) => (
      <Chip
        label={params.value === 'active' ? 'Активен' : 'Неактивен'}
        color={params.value === 'active' ? 'success' : 'default'}
        size="small"
        variant={params.value === 'active' ? 'filled' : 'outlined'}
      />
    ),
  },
  {
    field: 'createdAt',
    headerName: 'Дата регистрации',
    width: 170,
    valueGetter: (value) => new Date(value),
    valueFormatter: (value) => value.toLocaleDateString('ru-RU'),
    type: 'date',
  },
  {
    field: 'orders',
    headerName: 'Заказы',
    width: 110,
    type: 'number',
  },
]

export function Users() {
  const [nameOrEmail, setNameOrEmail] = useState('')
  const [role, setRole] = useState('all')
  const [status, setStatus] = useState('all')
  const filterProps = { nameOrEmail, role, status, setNameOrEmail, setRole, setStatus }

  const filteredRows = useMemo(() => {
    return usersData.filter((elem) => (
      (elem.name.includes(nameOrEmail) ||
      elem.email.includes(nameOrEmail)) &&
      (role === 'all' || elem.role === role) &&
      (status === 'all' || elem.status === status)
    ))
  }, [nameOrEmail, role, status])

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Пользователи
        </Typography>
        <UsersFilters { ...filterProps }/>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
            sorting: { sortModel: [{ field: 'id', sort: 'asc' }] },
          }}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          sx={{ height: 600, border: 0 }}
        />
      </CardContent>
    </Card>
  )
}