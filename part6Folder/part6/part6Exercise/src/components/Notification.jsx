import { useNotiText } from './notis'

const Notification = () => {
  const  text  = useNotiText()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }
  if(!text){
    return null
  }

  return (
    <div style={style}>
      {text}
    </div>
  )
}

export default Notification