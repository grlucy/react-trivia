import "./style.css"

export default function Input(props) {
 const {label, inputId, onInputChange} = props
 return(
  <div className="inputContainer">
   <label htmlFor={inputId}>{label}</label>
   <input type="text" id={inputId} onChange={onInputChange} />
  </div>
 )
}