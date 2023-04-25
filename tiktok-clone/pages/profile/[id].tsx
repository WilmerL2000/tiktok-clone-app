import { NoResults, VideoCard } from '@/components';
import { IUser, Video } from '@/types';
import { BASE_URL } from '@/utils';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { GoVerified } from 'react-icons/go';

type ProfileProps = {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
};

const Profile: React.FC<ProfileProps> = ({
  data: { user, userVideos, userLikedVideos },
}) => {
  const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
  const [videosList, setVideosList] = useState<Video[]>([]);
  const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
  const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';

  useEffect(() => {
    const fetchVideos = async () => {
      if (showUserVideos) {
        setVideosList(userVideos);
      } else {
        setVideosList(userLikedVideos);
      }
    };

    fetchVideos();
  }, [showUserVideos, userLikedVideos, userVideos]);

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32 ">
          <Image
            width={500}
            height={500}
            className="rounded-full"
            src={user.image}
            alt="user-profile"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="flex gap-1 items-center justify-center text-md md:text-2xl tracking-wider font-bold text-primary lowercase">
            {user.userName.replace(/\s+/g, '')}{' '}
            <GoVerified className="text-blue-400" />
          </p>
          <p className="capitalize text-gray-400 text-xs md:text-xl">
            {user.userName}
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer ${videos} mt-2`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer ${liked} mt-2`}
            onClick={() => setShowUserVideos(false)}
          >
            Liked
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6  md:justify-center">
          {videosList.length > 0 ? (
            videosList.map((post: Video, idx: number) => (
              <VideoCard key={idx} post={post} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`}
              type="videos"
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Profile;

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: { data: data },
  };
};
