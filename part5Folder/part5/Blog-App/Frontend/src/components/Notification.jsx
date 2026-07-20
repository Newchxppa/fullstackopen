import { Alert } from '@mui/material'

const Notification = ( { notification } ) => {
  if (notification === null){
    return null
  }

  return (
    <Alert variant='outlined' style={{ marginTop: 15, marginBottom: 10 }} severity={notification.type}>
      {notification.text}
    </Alert>
  )
}

export default Notification