import useAuthStore from '@/store/authStore';
import React, { useEffect, useState } from 'react';
import { MdFavorite } from 'react-icons/md';

type LikeButtonProps = {
  likes: any;
  flex: string;
  handleLike: () => void;
  handleDislike: () => void;
};

const LikeButton: React.FC<LikeButtonProps> = ({
  likes,
  flex,
  handleLike,
  handleDislike,
}) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  /* This line of code is filtering the `likes` array based on whether the `_ref` property of each item
in the array matches the `_id` property of the `userProfile` object */
  let filterLikes = likes?.filter(
    (item: any) => item._ref === userProfile?._id
  );

  /* Is used to update the state of `alreadyLiked` based on changes to the
`filterLikes` and `likes` props. If the length of `filterLikes` is greater than 0, it sets
`alreadyLiked` to true, otherwise it sets it to false. */
  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div className="flex gap-6">
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div
            className="bg-primary rounded-full p-2 md:p-4 text-[#F51997] "
            onClick={handleDislike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div
            className="bg-primary rounded-full p-2 md:p-4 "
            onClick={handleLike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold ">{likes?.length || 0}</p>
      </div>
    </div>
  );
};
export default LikeButton;
