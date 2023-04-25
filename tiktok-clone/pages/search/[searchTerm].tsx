import { NoResults, SearchLayout, UserBanner, VideoCard } from '@/components';
import useAuthStore from '@/store/authStore';
import { IUser, Video } from '@/types';
import { BASE_URL } from '@/utils';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

type SearchProps = {
  videos: Video[];
};

const Search: React.FC<SearchProps> = ({ videos }) => {
  const [isAccounts, setIsAccounts] = useState(true);
  const { allUsers, userProfile }: { allUsers: IUser[]; userProfile: any } =
    useAuthStore();

  const router = useRouter();
  const { searchTerm }: any = router.query;

  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const searchedAccounts = !userProfile
    ? allUsers?.filter((user: IUser) =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allUsers?.filter(
        (user: IUser) =>
          user.userName.toLowerCase().includes(searchTerm.toLowerCase()) &&
          user._id !== userProfile._id
      );

  return (
    <SearchLayout>
      <div className="">
        <div className="flex gap-10 mb-10 border-b-2 border-gray-200 z-50 bg-white w-full">
          <p
            onClick={() => setIsAccounts(true)}
            className={`text-xl  font-semibold cursor-pointer ${accounts} mt-2`}
          >
            Accounts
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer ${isVideos} mt-2`}
            onClick={() => setIsAccounts(false)}
          >
            Videos
          </p>
        </div>
        {isAccounts ? (
          <div className="mt-14">
            {searchedAccounts.length > 0 ? (
              searchedAccounts.map((user: IUser, idx: number) => (
                <div
                  key={idx}
                  className="border-b-2 border-gray-200 hover:bg-primary"
                >
                  <UserBanner
                    userId={user._id}
                    image={user.image}
                    userName={user.userName}
                  />
                </div>
              ))
            ) : (
              <NoResults
                text={`No account results for "${searchTerm}"`}
                type="account"
              />
            )}
          </div>
        ) : (
          <div className="md:mt-14 flex flex-wrap gap-6 md:justify-start ">
            {videos.length ? (
              videos.map((post: Video, idx: number) => (
                <VideoCard post={post} key={idx} />
              ))
            ) : (
              <NoResults
                text={`No video results for "${searchTerm}"`}
                type="videos"
              />
            )}
          </div>
        )}
      </div>
    </SearchLayout>
  );
};
export default Search;

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: data },
  };
};
