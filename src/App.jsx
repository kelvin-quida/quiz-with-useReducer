import { useReducer } from "react"
import { Header } from "./components/Header"
import Main from "./components/Main"
import { useEffect } from "react"

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
  
    default:
      throw new Error("Action unknown")
      break;
  }
}

export default function App() {
  const [state,dispatch] = useReducer(reducer,initialState)

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
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  )
}
