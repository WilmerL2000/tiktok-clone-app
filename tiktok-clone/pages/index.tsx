import { NoResults, VideoCard } from '@/components';
import { Video } from '@/types';
import { BASE_URL } from '@/utils';
import axios from 'axios';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';

interface HomeProps {
  videos: Video[];
}

export default function Home({ videos }: HomeProps) {
  return (
    <>
      <Head>
        <title>Tiktok clone</title>
        <meta
          name="description"
          content="This project is a clone of TikTok, which has some of the most outstanding features and functionality of the original application."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col gap-10 h-full">
        {videos?.length ? (
          videos?.map((video: Video) => (
            <VideoCard post={video} key={video._id} />
          ))
        ) : (
          <NoResults text={`No Videos`} type="videos" />
        )}
      </div>
    </>
  );
}

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let resp = null;
  if (topic) {
    resp = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    resp = await axios.get(`${BASE_URL}/api/post`);
  }
  return {
    props: {
      videos: resp.data,
    },
  };
};
