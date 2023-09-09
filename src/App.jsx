import { useReducer } from "react"
import { Header } from "./components/ui/Header"
import Main from "./components/ui/Main"
import { useEffect } from "react"
import Loader from './components/ui/Loader'
import Error from './components/ui/Error'
import StartScreen from "./components/StartScreen"
import Question from "./components/Question"
import NextButton from "./components/ui/NextButton"
import Progress from "./components/ui/Progress"
import FinishScreen from "./components/FinishScreen"
import Footer from "./components/ui/Footer"
import Timer from "./components/Timer"
import { useQuiz } from "./context/QuizContext"


export default function App() {
  // const [{questions,status,index,answer,points, highscore,secondsRemaining},dispatch] = useReducer(reducer,initialState)
  const {status} = useQuiz()

  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loading' && <Loader/>}
        {status === 'error' && <Error/>}
        {status === 'ready' && <StartScreen />}
        {status === 'active' && (
          <>
            <Progress />
            <Question />

            <Footer>
              <>
                <Timer />
                <NextButton />
              </>
            </Footer>
          </>
        )}
        {status === 'finished' && 
          <FinishScreen />
        }
      </Main>
    </div>
  )
}
