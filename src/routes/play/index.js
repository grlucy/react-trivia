import { useOutletContext, useNavigate } from "react-router-dom"
import {useState, useEffect, useCallback} from "react"
import "./style.css"

export default function Play() {
  const navigate = useNavigate()
  const {name, amount, difficulty, questions} = useOutletContext()
  const [numCorrect, setNumCorrect] = useState(0)
  const [currentQuestionNum, setCurrentQuestionNum] = useState(1)
  const [currentQuestionText, setCurrentQuestionText] = useState()
  const [currentQuestionAnswers, setCurrentQuestionAnswers] = useState([])

  const updateCurrentQuestion = useCallback((qArr) => {
    const currentQ = qArr[currentQuestionNum - 1]
    setCurrentQuestionText(currentQ.question)
    // If question is multiple choice, randomize the order of the answers
    if (currentQ.type === "multiple") {
      const arr = [currentQ.correct_answer, ...currentQ.incorrect_answers]
      const randomized = arr.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
      setCurrentQuestionAnswers(randomized)
    } else {
      setCurrentQuestionAnswers(["True", "False"])
    }
  }, [currentQuestionNum])

  useEffect(() => {
    if (!name || !amount || !difficulty) {
      return navigate("/")
    } else if (questions?.length) {
      updateCurrentQuestion(questions)
    }
  }, [name, amount, difficulty, questions, navigate, updateCurrentQuestion])

  return (
    <>
      <div className="playHeader">
        <h2>{name}</h2>
        <p>Question {currentQuestionNum} / {amount}</p>
      </div>
      <h1 className="questionHeader">{decodeURIComponent(currentQuestionText)}</h1>
      {currentQuestionAnswers.map(ans => (
        <p key={ans}>{decodeURIComponent(ans)}</p>
      ))}
    </>
  )
}