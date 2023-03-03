import { useEffect, useState } from "react";

export default () => {
    // Return Dummy Data before Browser loads
    if (typeof Audio === "undefined") return { playing: false, toggle: () => null}
    
    const [audio] = useState(new Audio(undefined));
    const [playing, setPlaying] = useState(false);

    const toggle = (url: string | null) => {
        if (!url) return;
        if (audio.src !== url) audio.src = url;
        setPlaying(!playing);
    };

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing, audio]);

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, [audio]);

    return { playing, toggle };
};
