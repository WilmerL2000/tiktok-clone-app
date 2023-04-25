import { useEffect, useState } from 'react';

export const useVideo = (ref: any) => {

    const [isPlaying, setIsPlaying] = useState(false);

    /**
     * The function toggles the play/pause state of a video element.
     */
    const onVideoPress = () => {
        if (isPlaying) {
            ref?.current?.pause();
            setIsPlaying(false);
        } else {
            ref?.current?.play();
            setIsPlaying(true);
        }
    };

    /**
     * The function plays a video if the reference to the video element exists.
     */
    const playVideo = () => {
        if (ref?.current) {
            ref?.current.play();
        }
    };

    /**
     * The function resets a video by pausing it and setting its current time to 0.
     */
    const resetVideo = () => {
        if (ref?.current) {
            ref?.current.pause();
            ref.current.currentTime = 0;
        }
    };

    return { onVideoPress, isPlaying, playVideo, resetVideo }
}
