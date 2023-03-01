import {useState, useEffect} from "react"
import Dropdown from "../../components/dropdown"
import "./style.css"

export default function Home() {
  const [categoryOpts, setCategoryOpts] = useState([])
  const [numQuestionsOpts] = useState([
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
    // https://opentdb.com/api_category.php
    setCategoryOpts([
      {id: 9, name: "General Knowledge"},
      {id: 10, name: "Entertainment: Books"},
      {id: 31, name: "Entertainment: Japanese Anime & Manga"}
    ])
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      <h2>Set up your game!</h2>
      <div class="setupForm">
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