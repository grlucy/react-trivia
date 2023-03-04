import "./style.css"

export default function Answer(props) {
 const {revealedBool, correctBool, text, onAnswerClick} = props

 return (
  <div className="answerContainer" data-correct={correctBool} onClick={!revealedBool ? onAnswerClick : undefined}>
   {revealedBool ? (<p className={correctBool ? "correct" : "incorrect"}>{correctBool ? "✓" : "X"}</p>) : ""}
   <p data-correct={correctBool}>
    {text}
   </p>
  </div>
 )
}