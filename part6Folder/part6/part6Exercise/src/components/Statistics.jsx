import { useFeedBackControls } from './store'

const Statistics = () => {
  const { good, neutral, bad } = useFeedBackControls()
  const average = (good + neutral + bad) / 3
  const positive = Math.round(good/(good + neutral + bad) * 100)
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr><td>good</td><td>{good}</td></tr>
          <tr><td>neutral</td><td>{neutral}</td></tr>
          <tr><td>bad</td><td>{bad}</td></tr>
          <tr><td>all</td><td>{good + neutral + bad}</td></tr>
          <tr><td>average</td><td>{average}</td></tr>
          <tr><td>positive</td><td>{positive ? positive : 0}%</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics