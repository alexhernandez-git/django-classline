import React from "react";
import styled from "@emotion/styled";
import moment from "moment";
import ReactPlayer from "react-player";

import Slider, { Range } from "rc-slider";
import "static/assets/styles/components/Layout/rc-slider.scss";
import PlayerControls from "./PlayerControls";
import { useState, useRef, useEffect } from "react";
import screenfull from "screenfull";

const format = (seconds) => {
  if (isNaN(seconds)) {
    return "00:00";
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};
let count = 0;

const VideoPlayer = (props) => {
  const { title, description, video, created } = props.video;
  const { goNext, goPrevious, isPlaylist, isCourse } = props;
  const playerContainerRef = useRef();
  const playerRef = useRef();
  const controlsRef = useRef();
  const [state, setState] = useState({
    playing: true,
    muted: false,
    volume: 1.0,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
  });

  const { playing, muted, volume, playbackRate, played, seeking } = state;

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };
  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };
  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };
  const handleMute = () => {
    setState({ ...state, muted: !state.muted });
  };
  const handleVolumeChange = (newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };
  const handleVolumeSeekUp = (newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };
  const toggleFullScreen = () => {
    screenfull.toggle(playerContainerRef.current);
  };
  useEffect(() => {
    controlsRef.current.style.visibility = "hidden";
  }, []);
  const handleProgress = (changeState) => {
    if (count > 1) {
      controlsRef.current.style.visibility = "hidden";
      count = 0;
    }
    if (controlsRef.current.style.visibility == "visible") {
      count += 1;
    }
    if (!seeking) {
      setState({ ...state, ...changeState });
    }
  };
  const handleSeekChange = (newValue) => {
    setState({ ...state, played: parseFloat(newValue / 100) });
  };
  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };
  const handleSeekMouseUp = (newValue) => {
    setState({ ...state, seeking: false });
    playerRef.current.seekTo(newValue / 100);
  };

  const handleMouseMove = () => {
    controlsRef.current.style.visibility = "visible";
    count = 0;
  };

  const currentTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00:00";
  const duration = playerRef.current
    ? playerRef.current.getDuration()
    : "00:00";
  const elapsedTime = format(currentTime);
  const totalDuration = format(duration);
  const [url, setUrl] = useState(null);
  useEffect(() => {
    const handleCreateBlob = async () => {
      if (video) {
        let blob = await fetch(video).then((r) => r.blob());
        const url = URL.createObjectURL(blob);

        setUrl(url);
      }
    };
    handleCreateBlob();
  }, [video]);
  useEffect(() => {
    console.log("Elapsed time", elapsedTime);
    console.log("totalDuration", totalDuration);
    console.log("isCourse", isCourse);
    console.log(totalDuration > 0 && (isCourse || isPlaylist));
    if (totalDuration > 0 && (isCourse || isPlaylist)) {
      console.log("entra");
      if (elapsedTime == totalDuration) {
        console.log("entra2");

        goNext();
      }
    }
  }, [elapsedTime]);
  return (
    <>
      <PlayerWrapper
        ref={playerContainerRef}
        onMouseMove={handleMouseMove}
        // onDoubleClick={toggleFullScreen}
      >
        <ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          style={{ display: "flex", alignItems: "center" }}
          playing={playing}
          config={{
            file: {
              attributes: {
                onContextMenu: (e) => e.preventDefault(),
                controlsList: "nodownload",
              },
            },
          }}
          muted={muted}
          volume={volume}
          playbackRate={playbackRate}
          onProgress={handleProgress}
          // controls
        />
        <PlayerControls
          ref={controlsRef}
          onPlayPause={handlePlayPause}
          {...props}
          {...state}
          onRewind={handleRewind}
          onFastForward={handleFastForward}
          onMute={handleMute}
          onVolumeChange={handleVolumeChange}
          onVolumeSeekUp={handleVolumeSeekUp}
          onToggleFullScreen={toggleFullScreen}
          onSeek={handleSeekChange}
          onSeekMouseDown={handleSeekMouseDown}
          onSeekMouseUp={handleSeekMouseUp}
          played={played}
          elapsedTime={elapsedTime}
          totalDuration={totalDuration}
          goNext={goNext}
          goPrevious={goPrevious}
          isPlaylist={isPlaylist}
        />
      </PlayerWrapper>
    </>
  );
};
const PlayerWrapper = styled.div`
  width: 100%;
  height: max-content;
  position: relative;
`;

export default VideoPlayer;
