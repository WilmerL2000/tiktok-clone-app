import useAuthStore from '@/store/authStore';
import { BASE_URL } from '@/utils';
import { client } from '@/utils/client';
import { topics } from '@/utils/constants';
import { SanityAssetDocument } from '@sanity/client';
import 'animate.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCloudUploadFill } from 'react-icons/bs';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdAddToPhotos } from 'react-icons/md';
import { BiUpload } from 'react-icons/bi';
import { toast } from 'react-toastify';

const Upload = () => {
  const [caption, setCaption] = useState('');
  const [topic, setTopic] = useState<String>(topics[0].name);
  const [savingPost, setSavingPost] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false);
  const userProfile: any = useAuthStore((state) => state.userProfile);
  const router = useRouter();
  const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

  useEffect(() => {
    if (!userProfile) router.push('/');
  }, [userProfile, router]);

  /**
   * This function checks if the selected file is of a valid type and uploads it if it is.
   * @param {any} e - The parameter "e" is an event object that is passed to the function when it is
   * triggered by an event, such as a user selecting a files.
   */
  const checkingVideo = async (e: any) => {
    const selectedFile = e.target.files[0];

    if (fileTypes.includes(selectedFile.type)) {
      setWrongFileType(false);
      setIsLoading(true);

      uploadVideo(selectedFile);
    } else {
      setIsLoading(false);
      setWrongFileType(true);
      setTimeout(() => {
        setWrongFileType(false);
      }, 3000);
    }
  };

  /**
   * This function uploads a selected video file to a client's assets and sets the video asset data while
   * also setting the loading state to false.
   * @param {any} selectedFile - The selectedFile parameter is an object that represents the video file
   * that the user has selected to upload. It contains information such as the file type, name, and
   * content.
   */
  const uploadVideo = (selectedFile: any) => {
    client.assets
      .upload('file', selectedFile, {
        contentType: selectedFile.type,
        filename: selectedFile.name,
      })
      .then((data) => {
        setVideoAsset(data);
        setIsLoading(false);
      });
  };

  /**
   * This function handles the creation of a new post by sending a POST request to a server with the
   * post data.
   */
  const handlePost = async () => {
    if (caption && videoAsset?._id && topic) {
      setSavingPost(true);

      const doc = {
        _type: 'post',
        caption,
        video: {
          _type: 'file ',
          asset: {
            _type: 'reference',
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id,
        },
        topic,
      };

      const { data }: any = await axios.post(`${BASE_URL}/api/post`, doc);
      toast.success(data);
      router.push('/');
    }
  };

  /**
   * The function `handleDiscard` resets various state variables.
   */
  const handleDiscard = () => {
    setSavingPost(false);
    setVideoAsset(undefined);
    setCaption('');
    setTopic('');
  };

  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
      <div className="bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-center items-center p-10 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload video</p>
            <p className="text-md text-gray-400 mt-1">
              Post a video to your account
            </p>
          </div>
          <div
            className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center 
          items-center outline-none mt-10 w-[300px] h-[460px] p-10 cursor-pointer hover:border-red-300 
          hover:bg-gray-100"
          >
            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="animate__animated animate__fadeIn animate__infinite font-bold text-xl">
                  <BsCloudUploadFill className="text-gray-300 text-6xl" />
                </div>
                <p className="text-xl font-semibold">Uploading...</p>
              </div>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className="rounded-xl h-[450px] bg-black"
                    ></video>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-xl font-semibold">Upload video</p>
                      </div>
                      <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                        MP4 or WebM or ogg <br />
                        720x1280 or higher <br />
                        Up to 10 minutes <br />
                        Less than 2GB
                      </p>
                      <p
                        className="bg-[#F51997] text-center mt-10 text-white 
                      text-md font-medium p-2 w-52 outline-none rounded-md"
                      >
                        Select File
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      onChange={checkingVideo}
                      className="w-0 h-0"
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className="text-center text-lg text-red-400 font-semibold mt-4 w-[250px] flex items-center">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 inline w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Please select a video file
              </p>
            )}
          </div>
        </div>
        <div className=" flex flex-col gap-3 pb-10">
          <label htmlFor="caption" className="text-md font-medium">
            Caption
          </label>
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2"
          />
          <label className="text-md font-medium ">Choose a topic</label>
          <select
            onChange={(e) => {
              setTopic(e.target.value);
            }}
            className="outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
          >
            {topics.map(({ name }) => (
              <option
                key={name}
                className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                value={name}
              >
                {name}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-10">
            <button
              onClick={handleDiscard}
              type="button"
              className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none hover:bg-gray-300"
            >
              <div className="flex gap-2 md:gap-4 justify-center">
                <p>Discard</p>
                <AiOutlineDelete className="text-black text-2xl" />
              </div>
            </button>
            <button
              disabled={videoAsset?.url ? false : true}
              onClick={handlePost}
              type="button"
              className="bg-[#F51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none
              hover:bg-[#e30583]
              "
            >
              {savingPost ? (
                <div className="flex gap-2 md:gap-4 justify-center">
                  <p>Posting...</p>
                  <BiUpload className="text-white text-2xl animate__animated animate__fadeIn animate__infinite" />
                </div>
              ) : (
                <div className="flex gap-2 md:gap-4 justify-center">
                  <p>Upload</p>
                  <MdAddToPhotos className="text-white text-2xl" />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
