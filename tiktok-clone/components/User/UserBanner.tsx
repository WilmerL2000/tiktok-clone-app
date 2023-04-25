import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { GoVerified } from 'react-icons/go';

type UserBannerProps = {
  userId: string;
  image: string;
  userName: string;
};

const UserBanner: React.FC<UserBannerProps> = ({ userId, image, userName }) => {
  const { pathname } = useRouter();

  return (
    <Link
      href={`/profile/${userId}`}
      className="flex mb-3 p-2 cursor-pointer font-semibold items-center rounded gap-1 md:gap-0"
    >
      <div className="ml-4 md:w-20 md:h-14 w-12 h-12">
        <>
          <Image
            width={62}
            height={62}
            alt="Profile photo"
            className="rounded-full"
            src={image}
          />
        </>
      </div>
      <div className=" flex flex-col gap-2">
        <div className="flex gap-2 items-center md:text-md font-bold text-primary">
          <p>{userName.replace(/\s+/g, '')} </p>
          <GoVerified className="text-blue-400 text-md" />
        </div>
        <p
          className={`capitalize text-sm text-gray-400 ${
            !pathname.includes('/detail/') && 'hidden md:block'
          } `}
        >
          {userName}
        </p>
      </div>
    </Link>
  );
};
export default UserBanner;
