import { createContext, useContext, useState, useCallback } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const SnackbarContext = createContext(null)

export function SnackbarProvider({ children }) {
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' })

  const showSnackbar = useCallback((message, severity = 'success') => {
    setSnack({ open: true, message, severity })
  }, [])

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') return
    setSnack((prev) => ({ ...prev, open: false }))
  }

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={snack.severity} variant="filled" sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}

export function useSnackbar() {
  const ctx = useContext(SnackbarContext)
  if (ctx === null) throw new Error('useSnackbar должен использоваться внутри SnackbarProvider')
  return ctx
}