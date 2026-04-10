import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'

export function UsersFilters({ nameOrEmail, role, status, setNameOrEmail, setRole, setStatus }) {

  const onChangeStatus = (e) => {
    setStatus(e.target.value)
  }

  const onChangeRole= (e) => {
    setRole(e.target.value)
  }

  
  const onChangeNameOrEmail= (e) => {
    setNameOrEmail(e.target.value)
  }

  const onResetClick = () => {
    setStatus('all')
    setRole('all')
    setNameOrEmail('')
  }


  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 2,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <TextField
        size="small"
        placeholder="Поиск по имени или email"
        sx={{ flex: 1, minWidth: 240 }}
        onChange={onChangeNameOrEmail}
        value={nameOrEmail}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" >
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />

      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel id="role-filter-label">Роль</InputLabel>
        <Select labelId="role-filter-label" label="Роль" defaultValue="all" onChange={onChangeRole} value={role}>
          <MenuItem value="all">Все</MenuItem>
          <MenuItem value="admin">Администратор</MenuItem>
          <MenuItem value="manager">Менеджер</MenuItem>
          <MenuItem value="user">Пользователь</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel id="status-filter-label">Статус</InputLabel>
        <Select labelId="status-filter-label" label="Статус" defaultValue="all" onChange={onChangeStatus} value={status}>
          <MenuItem value="all">Все</MenuItem>
          <MenuItem value="active">Активен</MenuItem>
          <MenuItem value="inactive">Неактивен</MenuItem>
        </Select>
      </FormControl>

      <Button variant="outlined" sx={{ ml: 'auto' }}  onClick={onResetClick}>
        Сбросить фильтры
      </Button>
    </Box>
  )
}