import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import moment from "moment";
import ReactPlayer from "react-player";
import { IconContext } from "react-icons/lib";
import {
  FaBackward,
  FaFastBackward,
  FaFastForward,
  FaForward,
  FaPause,
  FaPlay,
  FaStepBackward,
  FaStepForward,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import { RiFullscreenFill } from "react-icons/ri";
import Slider from "rc-slider";
import "static/assets/styles/components/Layout/rc-slider.scss";
import { IoMdSkipForward } from "react-icons/io";
import { useSelector } from "react-redux";
const PlayerControls = forwardRef((props, ref) => {
  const programReducer = useSelector((state) => state.programReducer);
  const {
    id,
    title,
    description,
    video,
    picture,
    views,
    created,
  } = props.video;
  const {
    onPlayPause,
    onRewind,
    onFastForward,
    onMute,
    onVolumeChange,
    onVolumeSeekUp,
    onToggleFullScreen,
    onSeek,
    onSeekMouseDown,
    onSeekMouseUp,
    playing,
    muted,
    volume,
    played,
    elapsedTime,
    totalDuration,
    goNext,
    goPrevious,
    isPlaylist,
    color,
  } = props;
  return (
    <ControlsWrapper ref={ref} color={color}>
      <div
        className="click-zone"
        onClick={onPlayPause}
        onDoubleClick={onToggleFullScreen}
      ></div>
      <div className="video-title">{title}</div>
      <div className="middle-controls">
        {/* <IconContext.Provider
          value={{
            size: 20,
            color: "#a1a1a1",
            className: "cursor-pointer press-icon",
          }}
        >
          <FaBackward onClick={onRewind} />
        </IconContext.Provider>
        {playing ? (
          <IconContext.Provider
            value={{
              size: 20,
              color: "#a1a1a1",
              className: "mx-5 cursor-pointer press-icon",
            }}
          >
            <FaPause onClick={onPlayPause} />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider
            value={{
              size: 20,
              color: "#a1a1a1",
              className: "mx-5 cursor-pointer press-icon",
            }}
          >
            <FaPlay onClick={onPlayPause} />
          </IconContext.Provider>
        )}

        <IconContext.Provider
          value={{
            size: 20,
            color: "#a1a1a1",
            className: "cursor-pointer press-icon",
          }}
        >
          <FaForward onClick={onFastForward} />
        </IconContext.Provider> */}
      </div>
      <div>
        <Slider
          className="mb-2"
          value={played * 100}
          onChange={onSeek}
          onMouseDown={onSeekMouseDown}
          onAfterChange={onSeekMouseUp}
        />

        <div className="controls-bar">
          <div className="d-flex justify-content-center align-items-center">
            {playing ? (
              <IconContext.Provider
                value={{
                  size: 15,
                  color: "#a1a1a1",
                  className: "cursor-pointer press-icon",
                }}
              >
                <FaPause onClick={onPlayPause} />
              </IconContext.Provider>
            ) : (
              <IconContext.Provider
                value={{
                  size: 15,
                  color: "#a1a1a1",
                  className: "cursor-pointer press-icon",
                }}
              >
                <FaPlay onClick={onPlayPause} />
              </IconContext.Provider>
            )}
            <div className="volume-wrapper ml-5 mr-3">
              {muted ? (
                <IconContext.Provider
                  value={{
                    size: 20,
                    color: "#a1a1a1",
                    className: "cursor-pointer press-icon",
                  }}
                >
                  <FaVolumeMute onClick={onMute} />
                </IconContext.Provider>
              ) : (
                <IconContext.Provider
                  value={{
                    size: 20,
                    color: "#a1a1a1",
                    className: "cursor-pointer press-icon",
                  }}
                >
                  <FaVolumeUp onClick={onMute} />
                </IconContext.Provider>
              )}
              <Slider
                value={volume * 100}
                onChange={onVolumeChange}
                onAfterChange={onVolumeSeekUp}
              />
            </div>
            <span className="text-white d-none d-sm-block">
              {elapsedTime}/{totalDuration}
            </span>
            {isPlaylist && (
              <>
                <IconContext.Provider
                  value={{
                    size: 15,
                    color: "#a1a1a1",
                    className: "cursor-pointer press-icon ml-4",
                  }}
                >
                  <FaStepBackward onClick={goPrevious} />
                </IconContext.Provider>
                <IconContext.Provider
                  value={{
                    size: 15,
                    color: "#a1a1a1",
                    className: "cursor-pointer press-icon ml-3",
                  }}
                >
                  <FaStepForward onClick={goNext} />
                </IconContext.Provider>
              </>
            )}
          </div>
          <IconContext.Provider
            value={{
              size: 20,
              color: "#a1a1a1",
              className: "cursor-pointer press-icon",
            }}
          >
            <RiFullscreenFill onClick={onToggleFullScreen} />
          </IconContext.Provider>
        </div>
      </div>
    </ControlsWrapper>
  );
});
const ControlsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.6)
  );
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;
  padding: 1rem 1.6rem;
  .click-zone {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1;
    height: calc(100% - 5rem);
    padding: 1rem 1.6rem;
  }
  .video-title {
    color: #fff;
    z-index: 3;
  }
  .controls-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 3;
  }
  .controls-bar .volume-wrapper {
    display: grid;
    grid-template-columns: 4rem 10rem;
    align-items: center;
    z-index: 3;
  }
  .middle-controls {
    display: flex;
    color: #fff;
    align-items: center;
    z-index: 3;

    justify-content: center;
  }
  .press-icon:hover {
    color: #fff !important;
    z-index: 3;
  }
  .rc-slider-track {
    background-color: ${(props) => (props.color ? props.color : "#fff")};
  }
`;

export default PlayerControls;
