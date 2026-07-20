import { TextField, InputAdornment, Box, FormControl, InputLabel, Input, IconButton, Button } from '@mui/material'
import { useId, useState }  from 'react'
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
const LoginForm = ({ addLogin ,handleUsername, handlePassword, username, password }) => {
  const sxId = useId()
  const textFieldId = useId()
  const standardPasswordId = useId()
  const [showPassword, setShowPassword] = useState(false)
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show)
  }

  return (
    <div className="login-Div">
      <h3>Login into your account</h3>
      <form onSubmit={addLogin}>
        <div>
          <Box sx={{ m:1, display: 'flex' }}>
            <TextField sx={{ width: '25ch' }} id={`${sxId}-input`} label="Username" value={username} variant="standard" onChange={(e) => handleUsername(e.target.value)} />
          </Box>

        </div>
        <div>
          <FormControl sx={{ m: 1, width: '25ch' }} variant='standard'>
            <InputLabel htmlFor={`${standardPasswordId}-input`}>
              Password
            </InputLabel>
            <Input
              id={`${standardPasswordId}-input`}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => handlePassword(e.target.value)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label={
                      showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={(event => event.preventDefault())}
                    onMouseUp={(event => event.preventDefault())}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <Button type='submit' variant='contained' style={{ marginTop: 10, marginLeft: 130 }}>Login</Button>
      </form>
    </div>
  )}


export default LoginForm