import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import Logo from '@/utils/tiktik-logo.png';
import { GoogleLogin } from '@react-oauth/google';
import { createOrGetUser } from '@/utils';
import useAuthStore from '@/store/authStore';
import DropdownMenu from './DropdownMenu';

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
            onError={() => console.log('Login Failed')}
          />
        )}
      </div>
    </nav>
  );
};
export default Navbar;
