import {useState, useEffect} from "react"
import Dropdown from "../../components/dropdown"
import Input from "../../components/input"
import "./style.css"

export default function Home() {
  const [playerName, setPlayerName] = useState("")
  const [categoryOpts, setCategoryOpts] = useState([])
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

  const getCategories = () => {
    // TO DO: fetch https://opentdb.com/api_category.php
    setCategoryOpts([
      {id: 9, name: "General Knowledge"},
      {id: 10, name: "Entertainment: Books"},
      {id: 31, name: "Entertainment: Japanese Anime & Manga"}
    ])
  }

  const handleNameChange = (e) => {
    setPlayerName(e.target.value)
  }

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    console.log('playerName', playerName)
  }, [playerName])

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
        opts={categoryOpts} />
        <Dropdown
        label="Number of Questions:"
        dropdownId="numQuestions"
        opts={numQuestionsOpts} />
        <Dropdown
        label="Difficulty:"
        dropdownId="difficulty"
        opts={difficultyOpts} />
        <Dropdown
        label="Type:"
        dropdownId="type"
        opts={typeOpts} />
      </div>
    </>
  )
}