export default function Options({question,index}) {
  return (
    <div className="options">
    {question.options.map(option => <button className="btn btn-option" key={index}>{option}</button>)}
  </div>
  )
}
