import { Comments, LikeButton, UserBanner } from '@/components';
import { useVideo } from '@/hooks/useVideo';
import useAuthStore from '@/store/authStore';
import { Video } from '@/types';
import { BASE_URL } from '@/utils';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import { MdOutlineCancel } from 'react-icons/md';

type Props = {
  postDetails: Video;
};

const Detail = ({ postDetails }: Props) => {
  const [post, setPost] = useState();
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const [userExist, setUserExist] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const { userProfile }: any = useAuthStore();

  const { onVideoPress, isPlaying } = useVideo(videoRef);

  useEffect(() => {
    if (userProfile) setUserExist(true);
    if (postDetails) setPost(postDetails[0]);
  }, [userProfile, postDetails]);

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  /**
   * This function handles liking a post by sending a PUT request to the server and updating the post's
   * likes count.
   * @param {boolean} like - a boolean value indicating whether the user has liked or unliked the post.
   */
  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });
      setPost((prev) => ({ ...prev, likes: data.likes }));
    }
  };

  /**
   * This function adds a comment to a post and updates the post's comments list.
   * @param e - The event object, which is passed as an argument to the function when the event (in this
   * case, a form submission) occurs.
   */
  const addComment = async (e) => {
    e.preventDefault();
    if (userProfile && comment) {
      setIsPostingComment((prev) => !prev);
      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });

      setPost((prev) => ({ ...prev, comments: data.comments }));
      setComment('');
      setIsPostingComment((prev) => !prev);
    }
  };

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
                  onClick={onVideoPress}
                  loop
                  src={post?.video?.asset.url}
                  className=" h-full cursor-pointer"
                ></video>
              </div>

              <div className="absolute top-[45%] left-[40%]  cursor-pointer">
                {!isPlaying && (
                  <button onClick={onVideoPress}>
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
          <div className="relative w-[1000px] md:w-[900px] lg:w-[700px] flex flex-col">
            <div className="lg:mt-20 mt-10 h-full">
              <UserBanner
                userId={post?.postedBy?._id}
                image={post?.postedBy?.image}
                userName={post?.postedBy?.userName}
              />
              <div className="px-10">
                <p className=" text-md text-gray-600">{post?.caption}</p>
              </div>
              {userExist && (
                <>
                  <div className="mt-10 px-10">
                    <div>
                      <LikeButton
                        likes={post?.likes}
                        handleLike={() => handleLike(true)}
                        handleDislike={() => handleLike(false)}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <>
              <Comments
                comment={comment}
                setComment={setComment}
                addComment={addComment}
                comments={post?.comments}
                isPostingComment={isPostingComment}
              />
            </>
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
