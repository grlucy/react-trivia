import "./style.css"

export default function Table(props) {
 const {dataArr} = props
 return (
  <table>
   <thead>
    <tr>
     <td>
      Rank
     </td>
     <td>
      Player
     </td>
     <td>
      Score
     </td>
    </tr>
   </thead>
   <tbody>
    {dataArr.map((arr, i) => (
     <tr key={i}>
      <td>
       {i+1}
      </td>
      <td>
       {arr[1]}
      </td>
      <td>
       {arr[0]}%
      </td>
     </tr>
    ))}
   </tbody>
  </table>
 )
}