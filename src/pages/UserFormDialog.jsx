import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useState, useEffect } from 'react'

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  role: 'user',
  status: 'active'
}

const INITIAL_FORM_ERROR = {
  name: '',
  email: '',
}

export function UserFormDialog({ open, onClose, onSubmit, initialValues = null, isSubmitting = false}) {
  const [fields, setFields] = useState(INITIAL_FORM_STATE)
  const [errors, setErrors] = useState(INITIAL_FORM_ERROR)

  const isEditMode = Boolean(initialValues)

  useEffect(() => {
    if (!open) return
    if (initialValues) {
      const { name, email, role, status } = initialValues
      setFields({ name, email, role, status })
    } else {
      setFields(INITIAL_FORM_STATE)
    }
    setErrors(INITIAL_FORM_ERROR)
  }, [open, initialValues])

  const handleSubmit = () => {
    const newErrors = { name: '', email: '' }
    if (!fields.name.trim()) newErrors.name = 'Обязательное поле'
    if (!fields.email.trim()) newErrors.email = 'Обязательное поле'
    else if (!fields.email.includes('@')) newErrors.email = 'Некорректный email'

    setErrors(newErrors)

    if (newErrors.name || newErrors.email) return

    onSubmit({ ...initialValues, ...fields, name: fields.name.trim(), email: fields.email.trim() })
    setFields(INITIAL_FORM_STATE)
    setErrors(INITIAL_FORM_ERROR)
    onClose()
  }

  const onCloseLocal = () => {
    setFields(INITIAL_FORM_STATE)
    setErrors(INITIAL_FORM_ERROR)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onCloseLocal} fullWidth maxWidth="sm">
      <DialogTitle>
        {isEditMode ? 'Редактировать пользователя' : 'Новый пользователь'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Имя"
            value={fields.name}
            onChange={(e) => setFields((prev) => ({ ...prev, name: e.target.value}))}
            error={Boolean(errors.name)}
            helperText={errors.name}
            fullWidth
            autoFocus
          />
          <TextField
            label="Email"
            type="email"
            value={fields.email}
            onChange={(e) => setFields((prev) => ({ ...prev, email: e.target.value}))}
            error={Boolean(errors.email)}
            helperText={errors.email}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="new-user-role-label">Роль</InputLabel>
            <Select
              labelId="new-user-role-label"
              label="Роль"
              value={fields.role}
              onChange={(e) => setFields((prev) => ({ ...prev, role: e.target.value}))}
            >
              <MenuItem value="admin">Администратор</MenuItem>
              <MenuItem value="manager">Менеджер</MenuItem>
              <MenuItem value="user">Пользователь</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="new-user-status-label">Статус</InputLabel>
            <Select
              labelId="new-user-status-label"
              label="Статус"
              value={fields.status}
              onChange={(e) => setFields((prev) => ({ ...prev, status: e.target.value}))}
            >
              <MenuItem value="active">Активен</MenuItem>
              <MenuItem value="inactive">Неактивен</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseLocal} disabled={isSubmitting}>Отмена</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Сохранение…' : (isEditMode ? 'Сохранить' : 'Создать')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}