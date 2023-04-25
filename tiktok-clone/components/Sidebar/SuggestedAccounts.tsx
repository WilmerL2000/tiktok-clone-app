import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { IUser } from '@/types';
import useAuthStore from '@/store/authStore';

type SuggestedAccountsProps = {};

const SuggestedAccounts: React.FC<SuggestedAccountsProps> = () => {
  const { fetchAllUsers, allUsers, userProfile } = useAuthStore();
  const [usersExist, setusersExist] = useState(false);
  const filteredUsers = allUsers.filter(
    (user) => user?._id !== userProfile?._id
  );
  useEffect(() => {
    fetchAllUsers();
    if (allUsers) setusersExist(true);
  }, [fetchAllUsers, allUsers]);

  return (
    <div className="xl:border-b-2 border-gray-200 pb-4">
      <div className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Suggested accounts
      </div>
      <div>
        {usersExist &&
          filteredUsers?.slice(0, 6).map((user: IUser) => (
            <Link href={`/profile/${user._id}`} key={user._id}>
              <div className="flex items-center gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
                <div className="w-8 h-8">
                  <Image
                    width={500}
                    height={500}
                    className="rounded-full"
                    src={user.image}
                    alt="user-profile"
                  />
                </div>
                <div className="hidden xl:block">
                  <div className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                    <p>{user.userName.replace(/\s+/g, '')} </p>
                    <GoVerified className="text-blue-400" />
                  </div>
                  <p className="capitalize text-gray-400 text-xs">
                    {user.userName}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
export default SuggestedAccounts;
