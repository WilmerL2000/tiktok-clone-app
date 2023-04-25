import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { BsFillSendPlusFill } from 'react-icons/bs';
import { RiMailSendLine } from 'react-icons/ri';
import { IComment, IUser } from '@/types';
import useAuthStore from '@/store/authStore';
import { NoResults } from '..';

type CommentsProps = {
  isPostingComment: boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
};

const Comments: React.FC<CommentsProps> = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}) => {
  const { allUsers, userProfile }: any = useAuthStore();
  const [userExist, setUserExist] = useState<boolean>(false);

  useEffect(() => {
    if (userProfile) setUserExist(true);
  }, [userProfile]);

  return (
    <div className="border-t-2 border-gray-200 px-10 mt-4 py-2 bg-[#F8F8F8] border-b-2 ">
      <div
        className={`overflow-y-scroll ${
          comments?.length > 0 ? 'h-[500px]' : 'h-[300px]'
        } `}
      >
        {comments?.length > 0 ? (
          comments?.map((item: IComment, idx: number) => (
            <div key={idx}>
              {allUsers?.map(
                (user: IUser) =>
                  user._id === (item.postedBy._ref || item.postedBy._id) && (
                    <div
                      className=" p-2 items-center border-b-2 border-gray-200"
                      key={idx}
                    >
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12">
                            <Image
                              width={500}
                              height={500}
                              className="rounded-full cursor-pointer"
                              src={user.image}
                              alt="user-profile"
                            />
                          </div>

                          <div className="flex cursor-pointer gap-1 items-center text-sm md:text-[18px] font-bold leading-6 text-primary">
                            <p>{user.userName} </p>
                            <GoVerified className="text-blue-400" />
                          </div>
                        </div>
                      </Link>
                      <div>
                        <p className="-mt-5 ml-16 text-xs md:text-[16px] mr-8">
                          {item.comment}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </div>
          ))
        ) : (
          <NoResults text="No Comments Yet!" type="comments" />
        )}
      </div>
      {userExist && (
        <div className=" p-2 md:px-10 ">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] sm:w-[300px] 
              md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
              placeholder="Add comment.."
            />
            <button
              className="text-md text-gray-400 hover:text-gray-700"
              disabled={isPostingComment}
              onClick={addComment}
            >
              {isPostingComment ? (
                <RiMailSendLine className="w-6 h-6" />
              ) : (
                <BsFillSendPlusFill className="w-6 h-6" />
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default Comments;
