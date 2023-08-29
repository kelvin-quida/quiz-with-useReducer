import { useReducer } from "react"
import { Header } from "./components/Header"
import Main from "./components/Main"
import { useEffect } from "react"
import Loader from '../src/components/Loader'
import Error from '../src/components/Error'
import StartScreen from "./components/StartScreen"
import Question from "./components/Question"

const initialState = {
  questions:[],
  status:'loading'
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
    default:
      throw new Error("Action unknown")
      break;
  }
}

export default function App() {
  const [{questions,status},dispatch] = useReducer(reducer,initialState)

  const numQuestions = questions.length
  const getQuestions = questions.questions

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
        {status === 'active' && <Question getQuestions={getQuestions}/>}
      </Main>
    </div>
  )
}
