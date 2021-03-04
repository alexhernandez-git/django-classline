import React, { createContext, useState, useEffect, useContext } from 'react'
export const ClassRoomContext = createContext()
import moment from 'moment'
import { AppContext } from "src/context/AppContext"
import axios from 'axios'

export const ClassRoomProvider = ({ children, id }) => {
    const appContext = useContext(AppContext)
    const [classRoomState, setClassRoomState] = useState(
        {
            id: id,
            loaded: false,
            program: null
        }
    );
    const [classRoomVideos, setClassRoomVideos] = useState({
        loaded: false,
        videos: {
            count: 0,
            next: null,
            previous: null,
            results: []
        }
    })
    const [classRoomTopics, setClassRoomTopics] = useState({
        loaded: false,
        topics: {
            count: 0,
            next: null,
            previous: null,
            results: []
        }
    })
    const [videoState, setVideoState] = useState({
        loaded: false,
        video: null
    })


    useEffect(() => {
        if (id) {
            fetchProgram(id);
            fetchVideos(id);
            fetchTopics(id);
        }
    }, [id]);
    async function fetchProgram(id) {
        await axios
            .get(`/api/programs/${id}/`, appContext.tokenConfig(appContext.userProfile))
            .then(res => {
                setClassRoomState({
                    ...classRoomState,
                    loaded: true,
                    program: res.data
                })
            })
            .catch(err => {
            });
    }
    async function fetchVideos(id) {
        await axios
            .get(`/api/programs/${id}/videos/`, appContext.tokenConfig(appContext.userProfile))
            .then(res => {
                setClassRoomVideos({
                    loaded: true,
                    videos: res.data
                })
            })
            .catch(err => {
            });
    }
    async function fetchVideosTopic(id, topic = '') {
        await axios
            .get(`/api/programs/${id}/videos/topic/${topic}/`, appContext.tokenConfig(appContext.userProfile))
            .then(res => {
                setClassRoomVideos({
                    loaded: true,
                    videos: res.data
                })
            })
            .catch(err => {
            });
    }
    async function fetchTopics(id) {
        await axios
            .get(`/api/programs/${id}/topics/`, appContext.tokenConfig(appContext.userProfile))
            .then(res => {
                setClassRoomTopics({
                    loaded: true,
                    topics: res.data
                })
            })
            .catch(err => {
            });
    }
    async function fetchVideo(id, video) {
        await axios
            .get(`/api/programs/${id}/videos/${video}`, appContext.tokenConfig(appContext.userProfile))
            .then(res => {
                setVideoState({
                    loaded: true,
                    video: res.data
                })
            })
            .catch(err => {
            });
    }
    return (
        <ClassRoomContext.Provider value={{
            classRoomState,
            classRoomVideos,
            fetchVideos,
            fetchVideosTopic,
            fetchVideo,
            videoState,
            classRoomTopics
        }}>
            {children}
        </ClassRoomContext.Provider>
    )
}