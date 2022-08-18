import React  from "react";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white dark:bg-slate-800 shadow px-4 lg:px-6 py-2.5">
      <div className="flex flex-wrap flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center mx-auto max-w-screen-xl">
        <Link to="/">
          <h1>Dumpster</h1>
        </Link>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
