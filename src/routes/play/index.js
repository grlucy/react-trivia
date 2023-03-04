import { useOutletContext, useNavigate } from "react-router-dom"
import {useState, useEffect, useCallback} from "react"
import Answer from "../../components/answer"
import "./style.css"

export default function Play() {
  const navigate = useNavigate()
  const {name, amount, difficulty, questions} = useOutletContext()
  const [numCorrect, setNumCorrect] = useState(0)
  const [currentQuestionNum, setCurrentQuestionNum] = useState(1)
  const [currentQuestionText, setCurrentQuestionText] = useState()
  const [currentQuestionOpts, setCurrentQuestionOpts] = useState([])
  const [currentQuestionAnswer, setCurrentQuestionAnswer] = useState()
  const [answeredBool, setAnsweredBool] = useState(false)

  const updateCurrentQuestion = useCallback((qArr) => {
    const currentQ = qArr[currentQuestionNum - 1]
    setCurrentQuestionText(currentQ.question)
    setCurrentQuestionAnswer(currentQ.correct_answer)
    // If question is multiple choice, randomize the order of the options
    if (currentQ.type === "multiple") {
      const arr = [currentQ.correct_answer, ...currentQ.incorrect_answers]
      const randomized = arr.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
      setCurrentQuestionOpts(randomized)
    } else {
      setCurrentQuestionOpts(["True", "False"])
    }
  }, [currentQuestionNum])

  const handleSelectAnswer = (e) => {
    const isCorrect = e.target.dataset.correct.toLowerCase() === "true"
    if (isCorrect) {
      setNumCorrect(numCorrect + 1)
    }
    setAnsweredBool(true)
  }

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
        <p>
          Question {currentQuestionNum} / {amount}
          <span className="numCorrect">{numCorrect} Correct</span>
        </p>
      </div>
      <h1 className="questionHeader">{decodeURIComponent(currentQuestionText)}</h1>
      <div className="optionsContainer">
        {currentQuestionOpts.map(opt => (
          <Answer
          key={"answer-" + opt}
          revealedBool={answeredBool}
          correctBool={opt === currentQuestionAnswer}
          text={decodeURIComponent(opt)}
          onAnswerClick={handleSelectAnswer} />
        ))}
      </div>
      {/* TO DO: Add button that either goes to next question or finishes game */}
    </>
  )
}