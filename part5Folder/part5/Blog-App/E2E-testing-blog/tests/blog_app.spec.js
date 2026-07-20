const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginForm, addBlog } = require('./helper')

// describe('Blog app', () => {
//   beforeEach(async ({ page, request }) => {
//     await request.post('http://localhost:3001/api/testing/reset')
//     await request.post('http://localhost:3001/api/users', {
//       data: {
//         name: 'Kinne G',
//         username: 'kg123',
//         password: 'fullstackBlog'
//       }
//     })

//     await page.goto('http://localhost:5173')
//   })

//   test('Login form is shown', async ({ page }) => {
//     const element = page.getByText('Login into your account')
//     await expect(element).toBeVisible()

//   })

//   describe('Login', () => {
//     test('succeeds with correct credentials', async ({ page }) => {
//       await loginForm(page, 'kg123', 'fullstackBlog')
//       await expect(page.getByText('Log Out')).toBeVisible()
//     })

//     test('fails with wrong credentials', async ({ page }) => {
//       await loginForm(page, 'incorrect', 'information')
//       await expect(page.getByText('wrong credentials')).toBeVisible()
//     })

//     describe('When logged in', () => {
//       beforeEach(async ({ page }) => {
//         await loginForm(page, 'kg123', 'fullstackBlog')
//       })

//       test('a new blog can be created', async ({ page }) => {
//         await addBlog(page, 'Sample author', 'Sample title', 'samplelinkblog.com')
//         await expect(page.getByText('Title: Sample title')).toBeVisible()
//       })

//       describe('When a blog is added', () => {
//         beforeEach(async ({ page }) => {
//           await addBlog(page, 'Sample author', 'Sample title', 'samplelinkblog.com')
//         })

//         test('blog can be liked', async ({ page }) => {
//           await page.getByRole('button', { name: 'view'}).click()
//           await page.getByRole('button', { name: 'upvote' }).click()
//           await expect(page.getByText('1')).toBeVisible()
//         })

//         test('a blog can be removed', async ({ page }) => {
//           await page.getByRole('button', { name: 'view'}).click()
//           page.on('dialog', dialog => dialog.accept())
//           await page.getByRole('button', { name:'remove'}).click()
//           await expect(page.getByText('Nothing saved at the moment...'))
//         })

//         test('only the user who uploaded the note have the remove button visible', async ({ page, request }) => {
//           page.on('dialog', dialog => dialog.accept())
//           await page.getByRole('button', { name: 'Log Out' }).click()
//           await request.post('http://localhost:3001/api/users', {
//             data: {
//               name: 'Clone 1',
//               username: 'clone15',
//               password: 'doesntmatter'
//             }
//           })
//           await loginForm(page, 'clone15', 'doesntmatter')
//           await page.getByRole('button', { name: 'view' }).click()
//           await expect(page.getByText('remove')).not.toBeVisible()
//         })
//       })

//       test('blogs are ordered by the amount of likes', async ({ page }) => {
//           await addBlog(page, 'Sample author2', 'Sample title2', 'samplelink2.com')
//           await page.getByRole('button', { name: 'close'}).click()
//           await addBlog(page, 'Sample author3', 'Sample title3', 'samplelink3.com')
//           await expect(page.getByText('Title: Sample title3')).toBeVisible()
//           await page.getByRole('button', { name: 'view' }).nth(0).click()
//           await page.getByRole('button', { name: 'upvote' }).click()
//           await page.getByRole('button', { name: 'upvote' }).click()
//           await page.getByRole('button', { name: 'hide' }).click()
//           await page.getByRole('button', { name: 'view' }).nth(1).click()
//           await page.getByRole('button', { name: 'upvote' }).click()
//           await page.getByRole('button', { name: 'upvote' }).click()
//           await page.getByRole('button', { name: 'upvote' }).click()
//           await page.getByRole('button', { name: 'upvote' }).click()
//           await page.getByRole('button', { name: 'hide' }).click()
//           await page.getByRole('button', {name: 'view'}).nth(0).click()
//           await expect(page.getByText('samplelink3.com')).toBeVisible()
//         })

      
//     })
//   })
  
// })

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Kinne G',
        username: 'kg123',
        password: 'fullstackBlog'
      }
    })
    await page.goto('http://localhost:5173')
  })
  test('Home page works', async ({ page }) => {
    await expect(page.getByText('Nothing saved at the moment')).toBeVisible()
  })

  test('Login page works', async ({ page }) => {
    await loginForm(page, 'kg123', 'fullstackBlog')
    await expect(page.getByRole('button', { name: 'logout'})).toBeVisible()
  })

  test('Like button doesnt show to unlogged users', async ({ page }) => {
    await page.getByRole('link', { name: 'The Art of Minimalist Code by Elena Rostova'}).click()
    await expect(page.getByRole('button', { name: 'upvote'})).not.toBeVisible()
  })

  test('users who didnt create the blog are only shown upvote button', async ({ page, request }) => {
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Samuel Jackson',
        username: 'samJ67',
        password: 'supriseMFer'
      }
    })
    await loginForm(page, 'samJ67', 'supriseMFer')
    await page.getByRole('link', { name: 'The Art of Minimalist Code by Elena Rostova'}).click()
    await expect(page.getByRole('button', { name: 'remove'})).not.toBeVisible()
    await expect(page.getByRole('button', { name: 'upvote'})).toBeVisible()
  })

  test('login fails with incorrect information', async ({ page }) => {
    await loginForm(page, 'wrongInfo', 'blahblahblahdemo')
    await expect(page.getByText('wrong credentials')).toBeVisible()
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginForm(page, 'kg123', 'fullstackBlog')
    })

    test('Creating a new blog works and delete is visible', async ({ page }) => {
      await expect(page.getByRole('button', {name: 'logout'})).toBeVisible()
      await page.getByRole('link', {name: 'new blog'}).click()
      await expect(page.getByText('Enter Title')).toBeVisible()
      await addBlog(page, 'Madeleine North','10 ways AI is transforming healthcare', 'madelinenorth.dev')
      await expect(page.getByText('10 ways AI is transforming healthcare by Madeleine North has been added')).toBeVisible()
      await page.getByRole('link', { name: '10 ways AI is transforming healthcare by Madeleine North'}).click()
      await expect(page.getByRole('button', {name: 'remove'})).toBeVisible()
    })

    test('deleting a blog works', async ({ page }) => {
      await expect(page.getByRole('button', {name: 'logout'})).toBeVisible()
      await page.getByRole('link', { name: 'new blog' }).click()
      await expect(page.getByText('Enter Title')).toBeVisible()
      await addBlog(page, 'Sam J', 'Going to Be Deleted', 'byebye.com')
      await expect(page.getByRole('link', {name: 'Going to Be Deleted by Sam J'})).toBeVisible()
      await page.getByRole('link', {name: 'Going to Be Deleted by Sam J'}).click()
      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
      page.on('dialog', async dialog => {
        console.log(dialog.message()); 
        await page.waitForTimeout(1000)
        await dialog.accept()
      })
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('Nothing saved at the moment')).toBeVisible()
    })

    test('user can upvote a blog', async ({ page }) => {
      await expect(page.getByRole('button', {name: 'logout'})).toBeVisible()
      await page.getByRole('link', { name: 'new blog' }).click()
      await expect(page.getByText('Enter Title')).toBeVisible()
      await addBlog(page, 'Sam J', 'Going to Be Deleted', 'byebye.com')
      await page.getByRole('link', { name: 'Going to Be Deleted by Sam J' }).click()
      await page.getByRole('button', { name: 'upvote' }).click()
      await page.getByRole('link', { name: 'blogs' }).click()
      await page.getByRole('link', { name: 'Going to Be Deleted by Sam J' }).click()
      await expect(page.getByText('1')).toBeVisible()
    })
  })



})

