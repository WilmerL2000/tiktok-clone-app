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
    <div className="gap-1 p-2 cursor-pointer font-semibold rounded ">
      <Link href={`/profile/${userId}`} className="flex">
        <div className="ml-4 md:w-20 md:h-20 w-16 h-16">
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
        <div>
          <div className="mt-2 flex flex-col gap-2">
            <p className="flex gap-2 items-center md:text-md font-bold text-primary">
              {userName.replace(/\s+/g, '')}{' '}
              <GoVerified className="text-blue-400 text-md" />
            </p>
            <p
              className={`capitalize font-medium text-xs text-gray-500 ${
                !pathname.includes('/detail/') && 'hidden md:block'
              } `}
            >
              {userName}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default UserBanner;
