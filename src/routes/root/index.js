import { Outlet, NavLink } from 'react-router-dom'
import "./style.css"

export default function Root() {
  const styleNavLink = ({isActive}) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal'
    }
  }
  return (
    <>
     <nav>
      <h1 className='logo'>Trivia Game</h1>
      <div className="navigation">
        <NavLink style={styleNavLink} to="/">Home</NavLink>
        <NavLink style={styleNavLink} to="/scoreboard">Scoreboard</NavLink>
      </div>
     </nav>
     <Outlet />
    </>
  )
}