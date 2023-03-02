import {useState, useEffect, useCallback} from "react"
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

  const getCategories = useCallback(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((response) => response.json())
      .then((data) => {
        setCategoryOpts(data.trivia_categories)
        setSelectedCategory(data.trivia_categories[0].id)
      })
  }, [])

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
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${selectedCategory}&difficulty=${difficulty}&type=${selectedType}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.response_code !== 0) {
          console.error("Error: Request unsuccessful. Adjust parameters.")
          // TO DO: handle error
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
    getCategories()

  }, [setName, setAmount, numQuestionsOpts, setDifficulty, difficultyOpts, setSelectedType, typeOpts, getCategories])

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
    </>
  )
}