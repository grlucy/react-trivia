import {useState, useEffect} from "react"
import Dropdown from "../../components/dropdown"
import Input from "../../components/input"
import Button from "../../components/button"
import "./style.css"

export default function Home() {
  const [playerName, setPlayerName] = useState("")
  const [categoryOpts, setCategoryOpts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState()
  const [numQuestionsOpts] = useState([
    {id: 1, name: "1"},
    {id: 10, name: "10"},
    {id: 20, name: "20"},
    {id: 30, name: "30"}
  ])
  const [selectedNumQuestions, setSelectedNumQuestions] = useState(1)
  const [difficultyOpts] = useState([
    {id: "easy", name: "Easy"},
    {id: "medium", name: "Medium"},
    {id: "hard", name: "Hard"}
  ])
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy")
  const [typeOpts] = useState([
    {id: "multiple", name: "Multiple Choice"},
    {id: "boolean", name: "True/False"}
  ])
  const [selectedType, setSelectedType] = useState("multiple")

  const getCategories = () => {
    // TO DO: fetch https://opentdb.com/api_category.php
    const res = [
      {id: 9, name: "General Knowledge"},
      {id: 10, name: "Entertainment: Books"},
      {id: 31, name: "Entertainment: Japanese Anime & Manga"}
    ]
    setCategoryOpts(res)
    setSelectedCategory(res[0].id)
  }

  const handleNameChange = (e) => {
    setPlayerName(e.target.value)
  }

  const handleDropdownChange = (e) => {
    const newVal = e.target.value
    switch (e.target.id) {
      case 'category':
        setSelectedCategory(newVal)
        break
      case 'numQuestions':
        setSelectedNumQuestions(newVal)
        break
      case 'difficulty':
        setSelectedDifficulty(newVal)
        break
      case 'type':
        setSelectedType(newVal)
        break
      default:
        console.error('handleDropdownChange error: Event target had unexpected ID')
    }
  }

  const handleSubmit = () => {
    // TO DO: store player name, number of questions, and difficulty for scoreboard
    const url = `https://opentdb.com/api.php?amount=${selectedNumQuestions}&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=${selectedType}`
    console.log(url)
    // TO DO: fetch trivia questions and store
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      <h2>Set up your game!</h2>
      <div className="setupForm">
        <Input
        label="Player Name:"
        inputId="playerName"
        value={playerName}
        onInputChange={handleNameChange} />
        <Dropdown
        label="Category:"
        dropdownId="category"
        opts={categoryOpts}
        onDropdownChange={handleDropdownChange} />
        <Dropdown
        label="Number of Questions:"
        dropdownId="numQuestions"
        opts={numQuestionsOpts}
        onDropdownChange={handleDropdownChange} />
        <Dropdown
        label="Difficulty:"
        dropdownId="difficulty"
        opts={difficultyOpts}
        onDropdownChange={handleDropdownChange} />
        <Dropdown
        label="Type:"
        dropdownId="type"
        opts={typeOpts}
        onDropdownChange={handleDropdownChange} />
      </div>
      <Button
      label="Start!"
      disabled={!playerName}
      onButtonClick={handleSubmit} />
    </>
  )
}