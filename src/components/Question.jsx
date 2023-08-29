export default function Question({getQuestions}) {
  
  const questions = getQuestions.map(questionObj => questionObj.question);
  return (
    <div>{questions}</div>
  )
}
