import { googleLogout } from '@react-oauth/google';
import Link from 'next/link';
import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';
import 'animate.css';

type DropdownMenuProps = {
  userName?: string;
  removeUser: any;
  setUserExist: any;
  setIsOpen: any;
  userId: number;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  userName,
  removeUser,
  setUserExist,
  setIsOpen,
  userId,
}) => {
  return (
    <div className="z-20 absolute w-40 mt-2 right-0 rounded-md bg-gray-200 divide-y animate__animated animate__fadeIn animate__fast">
      <div className=" px-2 py-3">
        <span className="block text-sm text-gray-900 ">{userName}</span>
      </div>
      <ul className="py-2 ">
        <li>
          <Link
            href={`/profile/${userId}`}
            className="flex gap-2 px-4 py-2 text-sm text-grLinky-700 hover:bg-grLinky-100 
            dark:hover:bg-gray-300  "
            onClick={() => {
              setIsOpen((prev: boolean) => !prev);
            }}
          >
            <CgProfile className="hover:text-white" fontSize={21} />
            Profile
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="flex gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 
            dark:hover:bg-gray-300  "
            onClick={() => {
              googleLogout();
              removeUser();
              setUserExist((prev: boolean) => !prev);
              setIsOpen((prev: boolean) => !prev);
            }}
          >
            <FiLogOut className="hover:text-white" fontSize={21} />
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
};
export default DropdownMenu;
