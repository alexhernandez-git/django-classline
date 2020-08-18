import React, { createContext, useState, useEffect, useContext } from 'react'
export const VideosContext = createContext()
import moment from 'moment'
import { AppContext } from "src/context/AppContext"


import axios from 'axios'
export const VideosProvider = ({ children, id }) => {

    const appContext = useContext(AppContext)


    const [showTopicModal, setShowTopicModal] = useState(false);

    const handleCloseTopicModal = () => {
        setSrcImageTopic(null)
        setSrcImageTopicValue(null)
        setTopicState({
            id: '',
            picture: '',
            title: '',
        })
        setIsEditTopic(false)
        setSrcImageTopicValue(null)
        setShowTopicModal(false);
    }
    const handleShowTopicModal = () => setShowTopicModal(true)
    const [srcImageTopic, setSrcImageTopic] = useState(null);
    const [srcImageTopicValue, setSrcImageTopicValue] = useState(null);

    const [topicsState, setTopicsState] = useState({
        loaded: false,
        topics: {
            count: 0,
            next: null,
            previous: null,
            results: []
        }
    })
    const [topicState, setTopicState] = useState(
        {
            id: '',
            picture: '',
            title: '',
        }
    )

    const handleCreateTopic = async () => {
        if (topicState.title != '' && srcImageTopic != null) {

            handleCloseTopicModal()

            const fd = new FormData()
            fd.append('title', topicState.title)
            fd.append('picture', srcImageTopic, srcImageTopic.name)
            await axios
                .post(`/api/programs/${id}/topics/`, fd, appContext.tokenConfig(appContext.userProfile))
                .then(res => {
                    fetchTopics(id)
                    setTopicState({
                        id: '',
                        picture: '',
                        title: '',
                    })
                    setSrcImageTopic(null)
                    setSrcImageTopicValue(null)

                })
                .catch(err => {
                    console.log(err.response)
                });
        }
    }
    const [isEditTopic, setIsEditTopic] = useState(false)

    const handleEditTopic = (topic) => {
        setIsEditTopic(true)

        setTopicState(topic)
        handleShowTopicModal()
    }
    const editTopic = async () => {
        handleCloseTopicModal()

        const fd = new FormData()
        fd.append('title', topicState.title)


        if (srcImageTopic != null) {
            fd.append('picture', srcImageTopic, srcImageTopic.name)
        }

        await axios
            .patch(`/api/programs/${id}/topics/${topicState.id}/`, fd, appContext.tokenConfig(appContext.userProfile))
            .then(res => {
                fetchTopics(id)
                setTopicState({
                    id: '',
                    picture: '',
                    title: '',
                })
            })
            .catch(err => {
                console.log(err.response)
            });

    }
    const deleteTopic = async () => {
        handleCloseTopicModal()
        await axios
            .delete(`/api/programs/${id}/topics/${topicState.id}/`, appContext.tokenConfig(appContext.userProfile))
            .then(res => {
                fetchTopics(id)
                fetchVideos(id)

                setTopicState({
                    id: '',
                    picture: '',
                    title: '',
                })
            })
            .catch(err => {
                console.log(err.response)
            });

    }
    const [show, setShow] = useState(false);

    const handleClose = () => {
        if (isEditVideo) {
            setVideoState({
                id: '',
                video: '',
                picture: '',
                title: '',
                topic: null,
                description: '',

            })
            setIsEditVideo(false)
        }
        setShow(false);
    }
    const [srcVideo, setSrcVideo] = useState(null);
    const [srcVideoValue, setSrcVideoValue] = useState(null);
    const [srcImage, setSrcImage] = useState(null);
    const [srcImageValue, setSrcImageValue] = useState(null);
    const handleShow = () => {
        setSrcVideoValue(null)
        setSrcImageValue(null)
        setSrcImage(null)
        setSrcVideo(null)
        setShow(true);
        console.log('videoContext.videoState', videoState);

    }

    const [videosState, setVideosState] = useState({
        loaded: false,
        videos: {
            count: 0,
            next: null,
            previous: null,
            results: []
        }
    })


    const [videoState, setVideoState] = useState(
        {
            id: '',
            video: '',
            picture: '',
            title: '',
            topic: null,
            description: '',

        }
    )

    useEffect(() => {
        if (id) {
            fetchVideos(id);
            fetchTopics(id);
        }
    }, [id]);


    async function fetchVideos(id) {
        await axios
            .get(`/api/programs/${id}/videos/`, appContext.tokenConfig(appContext.userProfile))
            .then(res => {
                setVideosState({
                    loaded: true,
                    videos: res.data
                })

            })
            .catch(err => {
                console.log(err.response)
            });
    }
    async function fetchTopics(id) {

        await axios
            .get(`/api/programs/${id}/topics/`, appContext.tokenConfig(appContext.userProfile))
            .then(res => {
                setTopicsState({
                    loaded: true,
                    topics: res.data
                })

            })
            .catch(err => {
                console.log(err.response)
            });
    }
    const handeCreateVideo = async () => {
        handleClose()

        const fd = new FormData()
        fd.append('title', videoState.title)
        fd.append('description', videoState.description)
        fd.append('picture', srcImageValue, srcImageValue.name)
        fd.append('video', srcVideoValue, srcVideoValue.name)
        if (videoState.topic) {
            fd.append('topic', videoState.topic.id)
        }
        await axios
            .post(`/api/programs/${id}/videos/`, fd, appContext.tokenConfig(appContext.userProfile))
            .then(res => {
                fetchVideos(id)
                setVideoState({
                    id: '',
                    video: '',
                    picture: '',
                    title: '',
                    topic: '',
                    description: '',
                })
            })
            .catch(err => {
                console.log(err.response)
            });
    }
    const [isEditVideo, setIsEditVideo] = useState(false)
    const handleEditVideo = (video) => {
        setIsEditVideo(true)

        setVideoState(video)
        handleShow()
    }
    const editVideo = async () => {
        handleClose()

        const fd = new FormData()
        fd.append('title', videoState.title)
        fd.append('description', videoState.description)
        fd.append('topic', videoState.topic.id)

        if (srcImageValue != null) {
            fd.append('picture', srcImageValue, srcImageValue.name)
        }
        if (srcVideoValue != null) {
            fd.append('video', srcVideoValue, srcVideoValue.name)
        }
        await axios
            .patch(`/api/programs/${id}/videos/${videoState.id}/`, fd, appContext.tokenConfig(appContext.userProfile))
            .then(res => {
                fetchVideos(id)
                setVideoState({
                    id: '',
                    video: '',
                    picture: '',
                    title: '',
                    topic: '',
                    description: '',
                })
            })
            .catch(err => {
                console.log(err.response)
            });

    }
    const deleteVideo = async () => {
        handleClose()


        await axios
            .delete(`/api/programs/${id}/videos/${videoState.id}/`, appContext.tokenConfig(appContext.userProfile))
            .then(res => {
                fetchVideos(id)
                setVideoState({
                    id: '',
                    video: '',
                    picture: '',
                    title: '',
                    topic: '',
                    description: '',
                })
            })
            .catch(err => {
                console.log(err.response)
            });

    }
    useEffect(() => {
        console.log(topicState);

    }, [topicState]);

    return (
        <VideosContext.Provider value={{
            videosState,
            setVideosState,
            videoState,
            setVideoState,
            show,
            handleClose,
            handleShow,
            srcVideo,
            setSrcVideo,
            srcImage,
            setSrcImage,
            setSrcImageValue,
            topicsState,
            setTopicsState,
            topicState,
            setTopicState,
            srcImageTopic,
            setSrcImageTopic,
            showTopicModal,
            handleCloseTopicModal,
            handleShowTopicModal,
            handeCreateVideo,
            setSrcVideoValue,
            handleCreateTopic,
            handleEditVideo,
            isEditVideo,
            editVideo,
            deleteVideo,
            handleEditTopic,
            isEditTopic,
            editTopic,
            deleteTopic,
            srcImageTopicValue,
            setSrcImageTopicValue
        }}>
            {children}
        </VideosContext.Provider>
    )
}