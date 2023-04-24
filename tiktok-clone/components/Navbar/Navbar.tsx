import useAuthStore from '@/store/authStore';
import { createOrGetUser } from '@/utils';
import Logo from '@/utils/tiktik-logo.png';
import { GoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { IoIosArrowDown, IoMdAdd } from 'react-icons/io';
import DropdownMenu from './DropdownMenu';

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [userExist, setUserExist] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (userProfile) setUserExist(true);
  }, [userProfile, userExist]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

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

      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 -left-20 bg-white"
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0"
            placeholder="Search accounts and videos"
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
          >
            <BiSearch />
          </button>
        </form>
      </div>

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
          onError={() => console.log('Login Failed')}
        />
      )}
    </nav>
  );
};
export default Navbar;
