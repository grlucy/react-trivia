import "./style.css"

export default function Dropdown(props) {
 const {label, dropdownId, opts, onDropdownChange} = props
 return (
  <div className="dropdownContainer">
   <label htmlFor={dropdownId}>{label}</label>
   <select name={dropdownId} id={dropdownId} onChange={onDropdownChange}>
    {opts.map((opt, i) => {
     return (<option key={dropdownId + i} value={opt.id}>{opt.name}</option>)
    })}
   </select>
  </div>
 )
}