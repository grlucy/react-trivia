import {useState, useEffect} from "react"
import { useOutletContext, useNavigate } from "react-router-dom"
import Dropdown from "../../components/dropdown"
import Input from "../../components/input"
import Button from "../../components/button"
import "./style.css"

export default function Home() {
  const {setQuestions, name, setName, amount, setAmount, difficulty, setDifficulty} = useOutletContext()
  const navigate = useNavigate()
  const [categoryOpts, setCategoryOpts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState()
  const [numQuestionsOpts] = useState([
    {id: 1, name: "1"},
    {id: 5, name: "5"},
    {id: 10, name: "10"},
    {id: 20, name: "20"},
    {id: 30, name: "30"}
  ])
  const [difficultyOpts] = useState([
    {id: "easy", name: "Easy"},
    {id: "medium", name: "Medium"},
    {id: "hard", name: "Hard"}
  ])
  const [typeOpts] = useState([
    {id: "multiple", name: "Multiple Choice"},
    {id: "boolean", name: "True/False"}
  ])
  const [selectedType, setSelectedType] = useState("multiple")
  const [errMsg, setErrMsg] = useState("")

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleDropdownChange = (e) => {
    const newVal = e.target.value
    switch (e.target.id) {
      case "category":
        setSelectedCategory(newVal)
        break
      case "numQuestions":
        setAmount(newVal)
        break
      case "difficulty":
        setDifficulty(newVal)
        break
      case "type":
        setSelectedType(newVal)
        break
      default:
        console.error("handleDropdownChange error: Event target had unexpected ID")
    }
  }

  const handleSubmit = () => {
    setErrMsg("")
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${selectedCategory}&difficulty=${difficulty}&type=${selectedType}&encode=url3986`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.response_code !== 0) {
          switch (data.response_code) {
            case 1:
              setErrMsg("Oops! There aren't enough questions of this type. Lower the number of questions and try again.")
              break;
            case 2:
              setErrMsg("Error: Invalid parameter")
              break;
            case 3: 
              setErrMsg("Error: Token not found")
              break;
            case 4:
              setErrMsg("Error: Token requires reset.")
              break;
            default:
              console.error("Error: Request unsuccessful.")
          }
          return
        }
        setQuestions(data.results)
        navigate("/play")
      })
  }

  useEffect(() => {
    // TO DO: implement Open Trivia API session tokens
    setName("")
    setAmount(numQuestionsOpts[0].id)
    setDifficulty(difficultyOpts[0].id)
    setSelectedType(typeOpts[0].id)
    fetch("https://opentdb.com/api_category.php")
      .then((response) => response.json())
      .then((data) => {
        setCategoryOpts(data.trivia_categories)
        setSelectedCategory(data.trivia_categories[0].id)
      })

  }, [setName, setAmount, numQuestionsOpts, setDifficulty, difficultyOpts, setSelectedType, typeOpts])

  return (
    <>
      <h2>Set up your game!</h2>
      <div className="setupForm">
        <Input
        label="Player Name:"
        inputId="playerName"
        value={name}
        onInputChange={handleNameChange} />
        <Dropdown
        label="Category:"
        dropdownId="category"
        opts={categoryOpts}
        onDropdownChange={handleDropdownChange}
        value={selectedCategory} />
        <Dropdown
        label="Number of Questions:"
        dropdownId="numQuestions"
        opts={numQuestionsOpts}
        onDropdownChange={handleDropdownChange}
        value={amount} />
        <Dropdown
        label="Difficulty:"
        dropdownId="difficulty"
        opts={difficultyOpts}
        onDropdownChange={handleDropdownChange}
        value={difficulty} />
        <Dropdown
        label="Type:"
        dropdownId="type"
        opts={typeOpts}
        onDropdownChange={handleDropdownChange}
        value={selectedType} />
      </div>
      <Button
      label="Start!"
      disabled={!name}
      onButtonClick={handleSubmit} />
      {errMsg ? (<p>{errMsg}</p>) : ''}
    </>
  )
}