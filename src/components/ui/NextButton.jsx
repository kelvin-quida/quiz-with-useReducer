

export default function NextButton({dispatch,answer}) {
  if(answer === null) return
  
  return (
    <button className="btn btn-ui" onClick={() => dispatch({type:'next'})}>Next</button>
  )
}
