import React from 'react';
import { MdOutlineVideocamOff } from 'react-icons/md';

type NoResultsProps = {
  text: string;
};

const NoResults: React.FC<NoResultsProps> = ({ text }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-8xl">
        <MdOutlineVideocamOff />
      </p>
      <p className="text-2xl text-center">{text}</p>
    </div>
  );
};
export default NoResults;
