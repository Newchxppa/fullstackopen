const Notification = ( { message } ) => {
  //console.log(message, 'jjjj')

  if (message === null){
    return null
  }
  else if (message.includes('Add: ')){
    const text = message.replace('Add: ', '')
    return (
      <div className="add-Noti">
        {text}
      </div>
    )
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export default Notification