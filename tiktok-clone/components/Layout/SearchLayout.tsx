import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

type SearchLayoutProps = {
  children: JSX.Element;
};

const SearchLayout: React.FC<SearchLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div className="w-full">
      <div>
        <form onSubmit={handleSearch} className="relative top-10 bg-white mr-5">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full bg-primary p-4 px-4 md:text-md font-medium border-2 border-gray-100 
            focus:outline-none focus:border-2 focus:border-gray-300 rounded-lg md:top-0"
            placeholder="Search"
          />
          <button
            onClick={handleSearch}
            className="absolute top-3 right-2.5 p-2 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400 rounded-md hover:bg-gray-400 hover:text-white"
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div className="relative mt-16">{children}</div>
    </div>
  );
};
export default SearchLayout;
