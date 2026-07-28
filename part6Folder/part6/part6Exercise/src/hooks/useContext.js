import { useContext } from 'react'
import NotificationContext from '../components/NotificationContext'

export const useText = () => useContext(NotificationContext)
