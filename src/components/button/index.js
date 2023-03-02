import "./style.css"

export default function Button(props) {
 const {label, disabled, onButtonClick} = props
 return(
  <button disabled={disabled} onClick={onButtonClick}>{label}</button>
 )
}