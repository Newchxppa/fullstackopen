const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likesCalc = blogs.reduce((acc, curr) => {
    return acc + curr.likes
  },0)
  return likesCalc
}



const favoriteBlog = (blogs) => {
  let compare = blogs[0].likes
  for (let i = 0; i < blogs.length; i++) {
    if(blogs[i].likes > compare)
      compare = blogs[i].likes
  }
  return compare
}

const blogs = [
  {
    _id: '6a3349982ea0b8c917e940f1',
    title: '7 ways AI is transforming healthcare',
    author: 'Madeleine North',
    link: 'https://www.weforum.org/stories/2025/08/ai-transforming-global-health/',
    likes: 4,
    __v: 0
  },
  {
    _id: '6a3349982ea0b8c917e940f2',
    title: 'Understanding the Basics of Quantum Computing',
    author: 'Elena Rostova',
    link: 'https://www.techjournal.org/stories/2026/01/basics-of-quantum-computing/',
    likes: 12,
    __v: 0
  },
  {
    _id: '6a3349982ea0b8c917e940f3',
    title: 'How Renewable Energy is Shaping Future Cities',
    author: 'Marcus Vance',
    link: 'https://www.ecotimes.com/articles/2026/03/renewable-energy-future-cities/',
    likes: 45,
    __v: 1
  },
  {
    _id: '6a3349982ea0b8c917e940f4',
    title: 'The Rise of Remote Work in the Tech Industry',
    author: 'Sarah Jenkins',
    link: 'https://www.worktrends.io/blog/rise-of-remote-work-tech/',
    likes: 0,
    __v: 0
  },
  {
    _id: '6a3349982ea0b8c917e940f5',
    title: 'Deep Dive into Blockchain and Decentralized Finance',
    author: 'Kenji Takahashi',
    link: 'https://www.cryptofocus.net/defi/deep-dive-blockchain-finance/',
    likes: 89,
    __v: 3
  }
]
console.log(favoriteBlog(blogs))

//Find the author with the most amount of blogs
const mostBlogs = (blogs) => {


  return 0
}

//Find the author with the most amount of likes
const mostLikes = (blogs) => {

  return 0
}

module.exports = { dummy, totalLikes, favoriteBlog }