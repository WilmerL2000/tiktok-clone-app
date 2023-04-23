import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

import axios from 'axios';
import { Video } from '@/types';
import { BASE_URL } from '@/utils';
import useAuthStore from '@/store/authStore';
import { Comments, LikeButton } from '@/components';

type Props = {
  postDetails: Video;
};

const Detail = ({ postDetails }: Props) => {
  const [post, setPost] = useState(postDetails[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const [userExist, setUserExist] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const { userProfile }: any = useAuthStore();

  useEffect(() => {
    if (userProfile) setUserExist(true);
  }, [userProfile]);

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  if (!post) return null;

  return (
    <>
      {post && (
        <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
          <div
            className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center 
          bg-black"
          >
            <div className="opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
              <p className="cursor-pointer " onClick={() => router.back()}>
                <MdOutlineCancel className="text-white text-[35px] hover:opacity-90" />
              </p>
            </div>
            <div className="relative">
              <div className="lg:h-[100vh] h-[60vh]">
                <video
                  ref={videoRef}
                  onClick={onVideoClick}
                  loop
                  src={post?.video?.asset.url}
                  className=" h-full cursor-pointer"
                ></video>
              </div>

              <div className="absolute top-[45%] left-[40%]  cursor-pointer">
                {!isPlaying && (
                  <button onClick={onVideoClick}>
                    <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
                  </button>
                )}
              </div>
            </div>
            <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10  cursor-pointer">
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="text-white text-3xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className="text-white text-3xl lg:text-4xl" />
                </button>
              )}
            </div>
          </div>
          <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
            <div className="lg:mt-20 mt-10">
              <div className="flex gap-1 p-2 cursor-pointer font-semibold rounded ">
                <div className="ml-4 md:w-20 md:h-20 w-16 h-16">
                  <Link href="/">
                    <>
                      <Image
                        width={62}
                        height={62}
                        alt="Profile photo"
                        className="rounded-full"
                        src={post.postedBy.image}
                      />
                    </>
                  </Link>
                </div>
                <div>
                  <Link href="/">
                    <div className="mt-2 flex flex-col gap-2">
                      <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                        {post.postedBy.userName}{' '}
                        <GoVerified className="text-blue-400 text-md" />
                      </p>
                      <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                        {post.postedBy.userName}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="px-10">
                <p className=" text-md text-gray-600">{post.caption}</p>
              </div>
              <div className="mt-10 px-10">
                {userExist && (
                  <LikeButton
                  // likes={post.likes}
                  // flex='flex'
                  // handleLike={() => handleLike(true)}
                  // handleDislike={() => handleLike(false)}
                  />
                )}
              </div>
              <Comments
              // comment={comment}
              // setComment={setComment}
              // addComment={addComment}
              // comments={post.comments}
              // isPostingComment={isPostingComment}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { postDetails: data },
  };
};

export default Detail;
