import React, { useState } from "react";
import { SearchIcon } from "../Icon/Icon";

const Search = () => {
  const [input, setInput] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <div className='mx-auto my-4 px-2 max-w-screen-lg'>
      <form onSubmit={searchHandler} className='block text-gray-700'>
        <div className="relative">
          <SearchIcon className='w-4 absolute left-2 top-1/2 -translate-y-1/2' />
          <input
            placeholder='Search'
            type='search'
            className='w-full rounded-lg border-gray-200 dark:border-none pl-8 shadow'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
