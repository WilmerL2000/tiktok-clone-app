import React from 'react';
import { MdOutlineVideocamOff } from 'react-icons/md';
import { BiCommentX } from 'react-icons/bi';
import { FcSearch } from 'react-icons/fc';
import { FaUserAltSlash } from 'react-icons/fa';

type NoResultsProps = {
  text: string;
  type: string;
};

const NoResults: React.FC<NoResultsProps> = ({ text, type }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className="text-4xl md:text-8xl">
        {type === 'comments' && <BiCommentX />}
        {type === 'videos' && <MdOutlineVideocamOff />}
        {type === 'search' && <FcSearch />}
        {type === 'account' && <FaUserAltSlash />}
      </div>
      <p className="text-lg md:text-2xl text-center">{text}</p>
    </div>
  );
};
export default NoResults;
