import { useOutletContext } from "react-router-dom"

export default function Play() {
  const {name, amount, difficulty, questions} = useOutletContext()

  return (
    <>
     <h2>Player: {name}</h2>
     <p># questions: {amount}</p>
     <p>difficulty: {difficulty}</p>
     <p>{JSON.stringify(questions)}</p>
    </>
  )
}