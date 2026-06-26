const loginForm = ( { handleLogin, username, handleUsername, password, handlePassword   } ) => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
            username
            <input
              type='text'
              value={username}
              onChange={handleUsername}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type='password'
              value={password}
              onChange={handlePassword}
            />
          </label>
        </div>
      <button type='submit'>login</button>
    </form>
  )

export default loginForm