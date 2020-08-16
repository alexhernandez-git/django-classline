import React, { useRef, useState, useEffect, useContext } from 'react';

import 'cropperjs/dist/cropper.css';
import { Row, Col, ListGroup } from 'react-bootstrap'
import { MyProgramContext } from "src/context/ProgramContext/MyProgramContext"
import { VideosProvider, VideosContext } from "src/context/ProgramContext/VideosContext"

import { MdAdd } from 'react-icons/md';
import { IconContext } from "react-icons";
import VideoCard from 'src/components/Users/Teachers/TeachersZone/TeachersPrograms/ProgramsData/VideoCard'
import { Link } from 'react-router-dom'
import VideoModal from 'src/components/Users/Teachers/TeachersZone/TeachersPrograms/ProgramsData/VideoModal'
import VideoTopicModal from 'src/components/Users/Teachers/TeachersZone/TeachersPrograms/ProgramsData/VideoTopicModal'
const TeachersProfilePresentation = () => {

    return (
        <>
            <MyProgramContext.Consumer>
                {programContext => (
                    <VideosProvider id={programContext.myProgramState.id}>
                        <VideosContext.Consumer>
                            {videosContext => (
                                <>

                                    <Row className="pr-3 pl-3">
                                        <Col md={6} lg={7} className="bg-white shadow p-3 rounded my-2" style={{ height: 'max-content' }}>
                                            <div className="d-flex justify-content-between border-bottom pb-3">
                                                <span className="">Videos</span>
                                                <button className="btn-green text-white d-flex align-items-center pl-3"
                                                    onClick={videosContext.handleShow}>
                                                    Añadir
                                <IconContext.Provider
                                                        value={{
                                                            className: "text-white",
                                                            size: '20px'
                                                        }}>
                                                        <MdAdd />

                                                    </IconContext.Provider>
                                                </button>
                                            </div>
                                            <div className="mt-3">
                                                {videosContext.videosState.loaded ?
                                                    <>

                                                        {videosContext.videosState.videos.count > 0 ?
                                                            <>
                                                                {videosContext.videosState.videos.results.map(video => (
                                                                    <>
                                                                        <VideoCard video={video} key={video.id} />
                                                                    </>
                                                                ))}
                                                            </>
                                                            :
                                                            'No hay videos'

                                                        }
                                                    </>

                                                    :
                                                    'Cargando...'
                                                }

                                            </div>
                                        </Col>

                                        <Col md={5} lg={4} md={{ offset: 1 }} lg={{ offset: 1 }} style={{ height: 'max-content' }} className="bg-white shadow p-3 rounded my-2">
                                            <div className="d-flex justify-content-between border-bottom pb-3">

                                                <span className="">Temas</span>
                                                <button className="btn-green text-white d-flex align-items-center pl-3"
                                                    onClick={videosContext.handleShowTopicModal}>
                                                    Añadir
                                <IconContext.Provider
                                                        value={{
                                                            className: "text-white",
                                                            size: '20px'
                                                        }}>
                                                        <MdAdd />

                                                    </IconContext.Provider>
                                                </button>
                                            </div>

                                            <div className="mt-3">
                                                <ListGroup variant="flush">
                                                    {videosContext.topicsState.loaded ?

                                                        <>
                                                            {videosContext.topicsState.topics.count > 0 ?
                                                                <>
                                                                    {videosContext.topicsState.topics.results.map(topic => (
                                                                        <>
                                                                            <ListGroup.Item key={topic.id} onClick={() => videosContext.handleEditTopic(topic)}>
                                                                                <Link>
                                                                                    {topic.title != '' ? topic.title : 'No hay titulo'}
                                                                                </Link>
                                                                            </ListGroup.Item>
                                                                        </>
                                                                    ))}
                                                                </>
                                                                :
                                                                'No hay temas'}
                                                        </>
                                                        :
                                                        'Cargando...'
                                                    }


                                                </ListGroup>
                                            </div>

                                        </Col>
                                    </Row>
                                    <VideoModal />
                                    <VideoTopicModal />
                                </>
                            )
                            }
                        </VideosContext.Consumer>
                    </VideosProvider>
                )
                }
            </MyProgramContext.Consumer >
        </>
    );
}

export default TeachersProfilePresentation;
