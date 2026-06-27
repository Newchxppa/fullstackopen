const LoginForm = ({ addLogin ,handleUsername, username, handlePassword, password }) => {

  return (
  <div className="login-Div">
    <h3>Login into your account</h3>
    <form onSubmit={addLogin}>
      <div>
        <label>
          Username: <input onChange={handleUsername} value={username} type="text" />
        </label>
      </div>
      <div>
        <label>
          Password: <input onChange={handlePassword} value={password} className="password-Input" type="password" />
        </label>
      </div>
      <button className="login-Button" type="submit">Login</button>
    </form>
  </div>
)}


export default LoginForm