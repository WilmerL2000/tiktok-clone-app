import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { BsFillSendPlusFill } from 'react-icons/bs';
import { RiMailSendLine } from 'react-icons/ri';
import { IComment, IUser } from '@/types';
import useAuthStore from '@/store/authStore';
import { NoResults } from './';

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

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 mt-4 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[457px]">
        {comments?.length > 0 ? (
          comments?.map((item: IComment, idx: number) => <></>)
        ) : (
          <NoResults text="No Comments Yet!" type="comments" />
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10 ">
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
