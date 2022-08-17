import Nav from '../Nav/Nav'
import { Link } from "react-router-dom";
import classes from './Header.module.css'

const Header = () => {
  return (
    <header className={classes.header}>
      <Link to="/">
        <h1 className={classes.logo}>Dumpster</h1>
      </Link>
      <Nav />
    </header>
  )
}

export default Header
