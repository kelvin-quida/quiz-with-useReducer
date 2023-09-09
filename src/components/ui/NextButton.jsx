import { useQuiz } from "../../context/QuizContext"


export default function NextButton() {
  const {dispatch,answer,index,numQuestions} = useQuiz()

  if(answer === null) return
  
  if(index < numQuestions - 1)
  return (
    <button 
      className="btn btn-ui" 
      onClick={() => dispatch({type:'next'})}
    >
      Next
    </button>
  )

    
  if(index === numQuestions - 1)
  return (
    <button 
      className="btn btn-ui" 
      onClick={() => dispatch({type:'finish'})}
    >
      Finish
    </button>
  )
}
