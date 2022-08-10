import { useState } from "react";
import classes from "./Search.module.css";

const Search = () => {
  const [input, setInput] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <form onSubmit={searchHandler} className={classes.form}>
      <input
        placeholder="Search"
        type="search"
        className={classes.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
};

export default Search;
