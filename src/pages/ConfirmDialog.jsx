import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

export function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onClose,
  isSubmitting = false,
}) {
  return (
    <Dialog open={open} onClose={isSubmitting ? undefined : onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent><DialogContentText>{message}</DialogContentText></DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>Отмена</Button>
        <Button onClick={onConfirm} variant="contained" color="error" disabled={isSubmitting} autoFocus>
          {isSubmitting ? 'Удаление…' : 'Удалить'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}