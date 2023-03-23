import {useState, useEffect} from "react"
import Table from "../../components/table"
import "./style.css"

export default function Scoreboard() {
  const [easyScores, setEasyScores] = useState([])
  const [medScores, setMedScores] = useState([])
  const [hardScores, setHardScores] = useState([])

  useEffect(() => {
    let scoresObj = localStorage.getItem('highScores')
    if (!scoresObj) return
    scoresObj = JSON.parse(scoresObj)
    const easy = []
    const med = []
    const hard = []
    Object.entries(scoresObj).forEach(([key, val]) => {
      if (val.easy) {
        easy.push([val.easy, key])
      }
      if (val.medium) {
        med.push([val.medium, key])
      }
      if (val.hard) {
        hard.push([val.hard, key])
      }
    })
    setEasyScores(easy.sort((a,b) => b[0] - a[0]))
    setMedScores(med.sort((a,b) => b[0] - a[0]))
    setHardScores(hard.sort((a,b) => b[0] - a[0]))
  }, [])
  
  return (
    <>
     <h2>Easy</h2>
      {easyScores.length > 0 ? (
        <Table
        dataArr={easyScores} />
      ) : (
        <p className="noScores">No scores yet!</p>
      )}
     <h2>Medium</h2>
      {medScores.length > 0 ? (
        <Table
        dataArr={medScores} />
      ) : (
        <p className="noScores">No scores yet!</p>
      )}
     <h2>Hard</h2>
      {hardScores.length > 0 ? (
        <Table
        dataArr={hardScores} />
      ) : (
        <p className="noScores">No scores yet!</p>
      )}
    </>
  )
}