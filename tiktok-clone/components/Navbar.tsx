import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import Logo from '@/utils/tiktik-logo.png';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { createOrGetUser } from '@/utils';
import useAuthStore from '@/store/authStore';

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [userExist, setUserExist] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (userProfile) setUserExist(true);
  }, [userProfile, userExist]);

  const user = false;
  return (
    <nav className="w-full flex justify-between  items-center border-b-2 border-gray-200 py-2 px-2 md:px-8 ">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="logo"
            width={500}
            height={500}
          />
        </div>
      </Link>
      <div>SEARCH</div>

      <div>
        {userExist ? (
          <div className="flex gap-5 md:gap-10 items-center">
            <Link
              href="/upload"
              className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2"
            >
              <IoMdAdd className="text-xl" />{' '}
              <span className="hidden md:block">Upload</span>
            </Link>
            {userProfile?.image && (
              <div className="relative">
                <Image
                  width={40}
                  height={40}
                  alt="Profile photo"
                  className="rounded-full cursor-pointer"
                  src={userProfile?.image}
                  onClick={() => setIsOpen((prev) => !prev)}
                />
                {isOpen && (
                  <div className="z-20 absolute w-40 mt-2 right-0 rounded-md bg-gray-400 divide-y">
                    <div className=" px-2 py-3">
                      <span className="block text-sm text-gray-900 dark:text-white">
                        {userProfile.userName}
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
                            setUserExist((prev) => !prev);
                          }}
                        >
                          <FiLogOut color="red" fontSize={21} />
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(resp) => {
              createOrGetUser(resp, addUser);
            }}
            onError={() => console.log('Login Failed')}
          />
        )}
      </div>
    </nav>
  );
};
export default Navbar;
