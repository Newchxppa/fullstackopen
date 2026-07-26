import { useFeedBackActions } from './store'

const Feedback = () => {
  const { incrementGood, incrementNeutral, incrementBad } = useFeedBackActions()
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={incrementGood}>good</button>
      <button onClick={incrementNeutral}>neutral</button>
      <button onClick={incrementBad}>bad</button>
    </div>
  )
}

export default Feedback