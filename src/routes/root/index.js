import { Outlet, NavLink } from "react-router-dom"
import {useState} from "react"
import "./style.css"

export default function Root() {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState()
  const [difficulty, setDifficulty] = useState()
  const [questions, setQuestions] = useState()

  const styleNavLink = ({isActive}) => {
    return {
      fontWeight: isActive ? "bold" : "normal"
    }
  }

  return (
    <>
     <nav>
      <h1 className="logo">Trivia Game</h1>
      <div className="navigation">
        <NavLink style={styleNavLink} to="/">Home</NavLink>
        <NavLink style={styleNavLink} to="/scoreboard">Scoreboard</NavLink>
      </div>
     </nav>
     <div className="contentBox">
      <Outlet context={{name, setName, amount, setAmount, difficulty, setDifficulty, questions, setQuestions}} />
     </div>
    </>
  )
}