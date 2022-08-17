import Nav from '../Nav/Nav'
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white dark:bg-slate-800 shadow px-4 lg:px-6 py-2.5">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link to="/">
          <h1>Dumpster</h1>
        </Link>
        <Nav />
      </div>
    </header>
  )
}

export default Header
