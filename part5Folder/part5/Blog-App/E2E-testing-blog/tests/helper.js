const loginForm = async (page, username, password) => {
  await page.getByLabel('Username:').fill(username)
  await page.getByLabel('Password:').fill(password)
  await page.getByRole('button', { name: 'Login'}).click() 
}

const addBlog = async (page, author, title, link) => {
  await page.getByRole('button', { name: 'create new blog' }).click()
  await page.getByPlaceholder('Write title here').fill(title)
  await page.getByPlaceholder('Write author here').fill(author)
  await page.getByPlaceholder('Write link here').fill(link)
  await page.getByRole('button', { name: 'Submit'}).click() 
  await page.getByText('added').waitFor()
}

export {
  loginForm,
  addBlog
}