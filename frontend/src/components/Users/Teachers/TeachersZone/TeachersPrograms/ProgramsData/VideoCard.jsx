import React from 'react';
import 'static/assets/styles/components/Layout/ProgramCard.scss'
import { VideosContext } from "src/context/ProgramContext/VideosContext"

const VideoCard = (props) => {
    const { video } = props

    return (
        <VideosContext.Consumer>
            {videosContext => (
                <>
                    <div onClick={() => videosContext.handleEditVideo(video)}>
                        <div className="my-course mt-4 d-flex justify-content-between rounded bg-white shadow cursor-pointer"
                            style={{
                                height: '120px'

                            }}>
                            <img
                                className="h-100 rounded-left"
                                style={{
                                    width: '100px',
                                    objectFit: 'cover'
                                }}
                                variant="top"
                                src={video.picture}
                            />

                            <div className="my-course d-flex justify-content-between w-100 p-4">

                                <div className="title-div d-flex flex-column justify-content-between  text-break">
                                    <div className=" text-break">
                                        <span className="font-weight-bold text-break"
                                            style={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: '2',
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                            {video.title}
                                        </span>
                                        <span className="text-break"
                                            style={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: '2',
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                            {video.topic.title}
                                        </span>
                                    </div>
                                    <small style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: '1',
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {video.date}
                                    </small>
                                </div>
                                <div className="d-none d-xl-flex align-items-center justify-content-center flex-column">
                                    <span className="h5 m-0 font-weight-normal">{video.views}</span>
                                    <small>Visitas</small>
                                </div>


                            </div>

                        </div>
                    </div>
                </>
            )
            }
        </VideosContext.Consumer>
    );
}

export default VideoCard;
