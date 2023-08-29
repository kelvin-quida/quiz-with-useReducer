import Options from "./Options";

export default function Question({question,index}) {
  
  return (
    <div>
      <h4>{question.question}</h4>

      <Options question={question} index={index} />
    </div>
  )
}
 