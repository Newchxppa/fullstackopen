import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm /> test', () => {

  test('Blog form calls the event handlers', async () => {

    const createBlog = vi.fn()
    render(<BlogForm createBlog={createBlog} />)

    const user = userEvent.setup()

    const submitButton = screen.getByText('Submit')
    await user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
  })
})