const Part = ( { part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const SumExercise = ( { course }) => {
  const totalSum = course.reduce((course, index) => course + index.exercises, 0);
  return (
    <p style={{fontWeight: "bold"}}>total of exercises {totalSum}</p>
  )

}

const Content = ( { content }) => {
  return (
    <div>
    {content.map(course => 
      <Part key={course.id} part={course} />
    )}
    <SumExercise course={content} />
    </div>
  )
}



const Header = ( {course} ) => {
  return (
    <div>
      <h2>{course.name}</h2>
      <Content content={course.parts} />
    </div>
  )
}
const Course = ({ courses }) => {
  return(
    <div>
      {courses.map(course => 
        <Header key={course.id} course={course} />
      )}
    </div>
  )
}
export default Course