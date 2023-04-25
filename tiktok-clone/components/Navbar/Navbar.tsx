import useAuthStore from '@/store/authStore';
import { createOrGetUser } from '@/utils';
import Logo from '@/utils/tiktik-logo.png';
import { GoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { IoIosArrowDown, IoMdAdd } from 'react-icons/io';
import DropdownMenu from './DropdownMenu';

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [userExist, setUserExist] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (userProfile) setUserExist(true);
  }, [userProfile, userExist]);

  return (
    <nav className="w-full flex justify-between  items-center border-b-2 border-gray-200 py-2 px-2 md:px-8 ">
      <Link href="/">
        <div className="w-12 h-12 flex items-center">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="logo"
            width={500}
            height={500}
            priority
          />
          <span className="font-extrabold text-transparent text-xl md:text-2xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            TikTok
          </span>
        </div>
      </Link>
      <div className="flex gap-3 items-center">
        <Link
          href="/search"
          className="border-2 text-2xl text-black mr-3 hover:bg-gray-300 p-2 px-4 rounded-md"
        >
          <BiSearch />
        </Link>
        {userExist ? (
          <div className="flex gap-5 md:gap-10 items-center">
            <Link
              href="/upload"
              className="border-2 p-1 md:px-4 text-md font-semibold flex items-center gap-2 rounded-md hover:bg-gray-300"
            >
              <IoMdAdd className="text-xl" />{' '}
              <span className="hidden md:block">Upload</span>
            </Link>
            {userProfile?.image && (
              <div className="relative">
                <div
                  className="flex gap-1 items-center cursor-pointer"
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <Image
                    width={40}
                    height={40}
                    alt="Profile photo"
                    className="rounded-full "
                    src={userProfile?.image}
                  />
                  <IoIosArrowDown color="gray" fontSize={20} />
                </div>

                {isOpen && (
                  <DropdownMenu
                    userName={userProfile?.userName}
                    removeUser={removeUser}
                    setIsOpen={setIsOpen}
                    setUserExist={setUserExist}
                    userId={userProfile?._id}
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(resp) => {
              createOrGetUser(resp, addUser);
            }}
            text="signin"
            onError={() => console.log('Login Failed')}
          />
        )}
      </div>
    </nav>
  );
};
export default Navbar;
