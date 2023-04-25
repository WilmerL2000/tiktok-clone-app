import React, { useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { FaRegCommentDots } from 'react-icons/fa';
import { BsPlay } from 'react-icons/bs';

import { Video } from '@/types';
import UserBanner from './User/UserBanner';
import { useRouter } from 'next/router';
import { useVideo } from '@/hooks/useVideo';

type VideoCardProps = {
  post: Video;
};

const VideoCard: React.FC<VideoCardProps> = ({
  post: { caption, postedBy, video, _id, likes },
}) => {
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { pathname } = useRouter();

  const { onVideoPress, isPlaying, playVideo, resetVideo } = useVideo(videoRef);

  /* This `useEffect` hook is responsible for muting or unmuting the video and playing it based on
certain conditions. It runs whenever `isVideoMuted` or `pathname` changes. */
  useEffect(() => {
    if (videoRef?.current) {
      if (pathname.includes('/profile') && window.innerWidth <= 700) {
        videoRef.current.muted = true;
        videoRef.current.play();
      } else {
        videoRef.current.muted = isVideoMuted;
      }
    }
  }, [isVideoMuted, pathname]);

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div
        className={`flex ${pathname.includes('/profile') ? 'hidden' : 'none'}`}
      >
        <UserBanner
          userId={postedBy._id}
          image={postedBy.image}
          userName={postedBy.userName}
        />
      </div>
      <div className="mx-auto lg:ml-20 flex ">
        <div className="rounded-3xl flex">
          <Link href={`/detail/${_id}`}>
            <video
              loop
              ref={videoRef}
              src={video.asset.url}
              className="md:w-[300px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer "
              {...(pathname.includes('/profile') && {
                onMouseOver: playVideo,
                onMouseLeave: resetVideo,
              })}
            ></video>
          </Link>
          {!pathname.includes('/profile') && (
            <div className=" bottom-0 cursor-pointer flex justify-center flex-col gap-10 p-3 text-2xl lg:text-3xl">
              {isPlaying ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-black  " />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-black  " />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="text-black  " />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className="text-black  " />
                </button>
              )}
              <Link href={`/detail/${_id}`}>
                <FaRegCommentDots className="text-black  " />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default VideoCard;
