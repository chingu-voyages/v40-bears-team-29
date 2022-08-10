import Nav from '../Nav/Nav'
import classes from './Header.module.css'

const Header = () => {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>Dumpster</h1>
      <Nav />
    </header>
  )
}

export default Header
