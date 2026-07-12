import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DisplayBlogs from './DisplayBlogs'


describe('<DisplayBlog />', () => {
  beforeEach(() => {
    const blogs = [{ title: '7 ways AI is transforming healthcare', author: 'Madeleine North', link: 'https://www.weforum.org/stories/2025/08/ai-transforming-global-health/' }]
    const defaultProps = {
      blogs: blogs,
      upVoteBlog: vi.fn(),
      deleteBlog: vi.fn(),
      user: vi.fn(),
      displayLike: vi.fn()
    }
    render(<DisplayBlogs {...defaultProps} />)
  })

  test('Blog only displays title and author by default', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const element = screen.getByText('remove')
    expect(element).toBeVisible()
  })

  test('Blog shows amount of likes after clicking view', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const element = screen.getByText('https://www.weforum.org/stories/2025/08/ai-transforming-global-health/', { exact: false })
    const element2 = screen.getByText('votes', { exact: false })
    expect(element2).toBeDefined()
    expect(element).toBeVisible()
  })

  test('Like button is working', async () => {
    cleanup()
    const blogs = [{ title: '7 ways AI is transforming healthcare', author: 'Madeleine North', link: 'https://www.weforum.org/stories/2025/08/ai-transforming-global-health/' }]
    const upVote = vi.fn()
    const defaultProps = {
      blogs: blogs,
      upVoteBlog: upVote,
      deleteBlog: vi.fn(),
      user: vi.fn(),
      displayLike: vi.fn()
    }
    render(<DisplayBlogs {...defaultProps} />)

    const user = userEvent.setup()

    const button = screen.getByText('view')
    await user.click(button)

    const voteButton = screen.getByText('upvote')
    await user.click(voteButton)
    await user.click(voteButton)

    expect(upVote.mock.calls).toHaveLength(2)
  })
})

