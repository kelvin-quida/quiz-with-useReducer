import { useReducer } from "react"
import { Header } from "./components/ui/Header"
import Main from "./components/Main"
import { useEffect } from "react"
import Loader from './components/ui/Loader'
import Error from './components/ui/Error'
import StartScreen from "./components/StartScreen"
import Question from "./components/Question"
import NextButton from "./components/ui/NextButton"

const initialState = {
  questions:[],
  status:'loading',
  index:0,
  answer:null,
  points: 0
}

function reducer(state,action){
  switch (action.type) {
    case "dataReceived":
      return{
        ...state,
        questions: action.payload,
        status:'ready',
      }
    case "dataFailed":
      return {
        ...state,
        status:'error'
      }
    case "start":
      return{
        ...state,
        status:'active'
      }
    case "newAnswer":
        const question = state.questions.at(state.index)

        return{
          ...state,
          answer: action.payload,
          points: action.payload === question.correctOption ? state.points + question.points : state.points
        }
    case 'next':
        return{
          ...state,
          index: state.index + 1,
          answer:null,
        }
    default:
      throw new Error("Action unknown")
      break;
  }
}

export default function App() {
  const [{questions,status, index,answer},dispatch] = useReducer(reducer,initialState)

  const numQuestions = questions.length

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res)=> res.json())
      .then((data) => dispatch({type:"dataReceived",payload:data}))
      .catch((err) => dispatch({type:"dataFailed"}))
  },[])

  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loading' && <Loader/>}
        {status === 'error' && <Error/>}
        {status === 'ready' && <StartScreen dispatch={dispatch} numQuestions={numQuestions}/>}
        {status === 'active' && (
          <>
            <Question 
              question={questions[index]} 
              dispatch={dispatch} 
              answer={answer}

            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
          )}
      </Main>
    </div>
  )
}
