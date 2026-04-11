import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { DataGrid } from '@mui/x-data-grid'
import { UsersFilters } from './UsersFilters'
import { useState, useMemo } from 'react'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { UserFormDialog } from './UserFormDialog'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { ConfirmDialog } from './ConfirmDialog'
import { useUsers } from '../context/UsersContext'

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
  {
    field: 'actions',
    headerName: 'Действия',
    width: 120,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Stack direction="row" spacing={0.5}>
        <IconButton
          size="small"
          onClick={() => params.row.onEdit(params.row)}
          aria-label="Редактировать"
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={() => params.row.onDelete(params.row)}
          aria-label="Удалить"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>
    ),
  },
]

export function Users() {
  const { users, addUser, updateUser, deleteUser } = useUsers()
  const [nameOrEmail, setNameOrEmail] = useState('')
  const [role, setRole] = useState('all')
  const [status, setStatus] = useState('all')
  const [isFormOpen, setFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [deletingUser, setDeletingUser] = useState(null)

  const handleUserSubmit = (newUser) => {
    if (!editingUser) {
      addUser(newUser)
    } else {
      updateUser({ ...editingUser, ...newUser })
    }
  }

  const filterProps = { nameOrEmail, role, status, setNameOrEmail, setRole, setStatus }

  const filteredRows = useMemo(() => {
    const query = nameOrEmail.toLowerCase()
    return users.filter((elem) => (
      (elem.name.toLowerCase().includes(query) ||
      elem.email.toLowerCase().includes(query)) &&
      (role === 'all' || elem.role === role) &&
      (status === 'all' || elem.status === status)
    ))
  }, [users, nameOrEmail, role, status])

  const handleAddClick = () => {
    setEditingUser(null)
    setFormOpen(true)
  }

  const handleEditClick = (user) => {
    setEditingUser(user)
    setFormOpen(true)
  }

  const handleFormClose = () => {
    setFormOpen(false)
    setEditingUser(null)
  }

  const handleDeleteClick = (user) => {
    setDeletingUser(user)
  }

  const handleDeleteConfirm = () => {
    deleteUser(deletingUser.id)
    setDeletingUser(null)
  }

  const handleDeleteCancel = () => {
    setDeletingUser(null)
  }


  const rowsWithActions = useMemo(() => (
    filteredRows.map((row) => ({
      ...row,
      onEdit: handleEditClick,
      onDelete: handleDeleteClick,
    }))
  ), [filteredRows])

  return (
    <Card variant="outlined">
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Пользователи
          </Typography>
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleAddClick}
          >
            Добавить пользователя
          </Button>
        </Box>

        <UsersFilters {...filterProps} />
        <DataGrid
          rows={rowsWithActions}
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

      <UserFormDialog
        open={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleUserSubmit}
        initialValues={editingUser}
      />

      <ConfirmDialog
        open={Boolean(deletingUser)}
        title="Удалить пользователя"
        message={
          deletingUser
            ? `Удалить пользователя ${deletingUser.name}? Это действие нельзя отменить.`
            : ''
        }
        onConfirm={handleDeleteConfirm}
        onClose={handleDeleteCancel}
      />
    </Card>
  )
}
