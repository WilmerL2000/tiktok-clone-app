import { googleLogout } from '@react-oauth/google';
import Link from 'next/link';
import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';

type DropdownMenuProps = {
  userName?: string;
  removeUser: any;
  setUserExist: any;
  setIsOpen: any;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  userName,
  removeUser,
  setUserExist,
  setIsOpen,
}) => {
  return (
    <div className="z-20 absolute w-40 mt-2 right-0 rounded-md bg-gray-500 divide-y">
      <div className=" px-2 py-3">
        <span className="block text-sm text-gray-900 dark:text-white">
          {userName}
        </span>
      </div>
      <ul className="py-2 ">
        <li>
          <Link
            href="#"
            className="flex gap-2 px-4 py-2 text-sm text-grLinky-700 hover:bg-grLinky-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            <CgProfile color="white" fontSize={21} />
            Profile
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="flex gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            onClick={() => {
              googleLogout();
              removeUser();
              setUserExist((prev: boolean) => !prev);
              setIsOpen((prev: boolean) => !prev);
            }}
          >
            <FiLogOut color="red" fontSize={21} />
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
};
export default DropdownMenu;
