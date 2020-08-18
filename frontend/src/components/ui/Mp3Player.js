import React from "react";
import AudioPlayer from "react-h5-audio-player";
const Mp3Player = (props) => {
  const { audio } = props.podcast;
  return (
    <AudioPlayer
      autoPlay
      src={audio}
      // onPlay={e => console.log("onPlay")}
      // other props here
    />
  );
};

export default Mp3Player;
