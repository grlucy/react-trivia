export default function Table(props) {
 const {dataArr} = props
 return (
  <table>
   <tbody>
    <tr>
     <td>{JSON.stringify(dataArr)}</td>
    </tr>
   </tbody>
  </table>
 )
}