import React, { createContext, useState, useEffect, useContext } from 'react'
export const MyProgramContext = createContext()
import moment from 'moment'
import { AppContext } from "src/context/AppContext"
import { useHistory } from "react-router-dom";

import axios from 'axios'
export const MyProgramProvider = ({ children, id }) => {
    const history = useHistory();

    const appContext = useContext(AppContext)
    const [myProgramState, setMyProgramState] = useState({
        id: '',
        loaded: false,
        actived: false,
        title: '',
        subtitle: '',
        description: '',
        benefits: [],
        meetups: false,
        events: [],
        program_price: null,
        picture: '',
        video_presentation: '',
        program_language: null
    })
    const [isSaved, setIsSaved] = useState(true)
    const [count, setCount] = useState(0)
    useEffect(() => {

        if (count > 0) {
            console.log('entraafwe');

            setIsSaved(false)
            console.log(myProgramState);
        }
        if (myProgramState.loaded && count == 0) {
            setCount(count + 1)

        }

    }, [myProgramState]);

    useEffect(() => {
        async function fetchData() {
            await axios
                .get(`/api/programs/${id}/`, appContext.tokenConfig(appContext.userProfile))
                .then(res => {

                    setMyProgramState({ ...res.data, loaded: true })
                    console.log(myProgramState);

                })
                .catch(err => {
                    console.log(err.response)
                });
        }
        if (appContext.userProfile.is_authenticated) {
            // User Loading
            console.log('entra');
            fetchData();

        }
    }, []);

    const saveProgram = () => {

        async function fetchData() {
            const data = {
                title: myProgramState.title,
                subtitle: myProgramState.subtitle,
                description: myProgramState.description,
                benefits: myProgramState.benefits,
                events: myProgramState.events,
                price: myProgramState.program_price,
                language: myProgramState.program_language,
                meetups: myProgramState.meetups
            }
            console.log(data);


            await axios
                .patch(`/api/programs/${id}/`, data, appContext.tokenConfig(appContext.userProfile))
                .then(res => {
                    setIsSaved(true)
                    console.log(res.data);

                    appContext.updateProgram(res.data)
                })
                .catch(err => {
                    console.log(err.response)
                });
        }

        fetchData();

    }
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isSaved) {
                saveProgram()
            }
        }, 10000);
        return () => clearInterval(interval);
    }, []);
    const handleSaveImage = (data) => {
        async function fetchData() {
            const fd = new FormData()
            fd.append('picture', data, data.name)
            await axios
                .patch(`/api/programs/${id}/`, fd, appContext.tokenConfig(appContext.userProfile))
                .then(res => {

                    setMyProgramState({ ...myProgramState, picture: res.data.picture })


                    appContext.updateProgram(res.data)
                })
                .catch(err => {
                    console.log(err.response)
                });
        }
        if (myProgramState.loaded) {
            // User Loading
            fetchData();

        }
    }
    const handleSaveVideo = (data) => {
        async function fetchData() {
            console.log(myProgramState);
            const fd = new FormData()
            fd.append('video_presentation', data, data.name)
            await axios
                .patch(`/api/programs/${id}/`, fd, appContext.tokenConfig(appContext.userProfile))
                .then(res => {

                    console.log(myProgramState);
                    setMyProgramState({ ...myProgramState, video_presentation: res.data.video_presentation })

                    appContext.updateProgram(res.data)
                })
                .catch(err => {
                    console.log(err.response)
                });
        }
        if (myProgramState.loaded) {
            // User Loading
            fetchData();

        }
    }
    const activeProgram = () => {

        async function fetchData() {

            await axios
                .patch(`/api/programs/${id}/active/`, {}, appContext.tokenConfig(appContext.userProfile))
                .then(res => {
                    console.log('entra active program ', res.data);

                    setIsSaved(true)
                    console.log(myProgramState);
                    setMyProgramState({ ...myProgramState, actived: true })

                    appContext.updateProgram(res.data)
                })
                .catch(err => {
                    console.log(err.response)
                });
        }
        if (myProgramState.loaded) {
            // User Loading
            console.log('enfewtra');
            fetchData();

        }
    }
    const deactiveProgram = () => {
        async function fetchData() {

            await axios
                .patch(`/api/programs/${id}/`, { actived: false }, appContext.tokenConfig(appContext.userProfile))
                .then(res => {
                    setIsSaved(true)
                    console.log(myProgramState);
                    setMyProgramState({ ...myProgramState, actived: false })

                    appContext.updateProgram(res.data)
                })
                .catch(err => {
                    console.log(err.response)
                });
        }
        if (myProgramState.loaded) {
            // User Loading
            console.log('entra');
            fetchData();

        }
    }
    const deleteProgram = () => {
        async function fetchData() {

            await axios
                .delete(`/api/programs/${id}/`, appContext.tokenConfig(appContext.userProfile))
                .then(res => {
                    console.log(res.data)


                })
                .catch(err => {
                    console.log(err.response)
                });
        }
        if (myProgramState.loaded) {
            // User Loading
            console.log('entra');
            fetchData();

        }
    }

    const [isEditing, setIsEditing] = useState(false)

    const [show, setShow] = useState(false);

    const handleClose = () => {

        setShow(false)
    };
    const handleShow = () => setShow(true);

    const addEvent = (event) => {
        console.log(event);
        console.log({
            ...myProgramState,
            events: [...myProgramState.events, event]
        });

        setMyProgramState({
            ...myProgramState,
            events: [...myProgramState.events, event]
        })
    }
    const updateEvent = (event) => {

        setMyProgramState({
            ...myProgramState,
            events: myProgramState.events.map(e => {
                if (e.id == event.id) {
                    return { ...e, ...event }
                }
                return e
            })
        })

    }
    const deleteEvent = (event) => {
        const newArray = myProgramState.events.filter(e => e.id !== event.id);
        setMyProgramState({
            ...myProgramState,
            events: newArray
        })
    }

    const changePrice = (event) => {
        setMyProgramState({
            ...myProgramState,
            program_price: event
        })
    }



    return (
        <MyProgramContext.Provider value={{
            myProgramState,
            setMyProgramState,
            isEditing,
            setIsEditing,
            show,
            handleClose,
            handleShow,
            addEvent,
            updateEvent,
            deleteEvent,
            saveProgram,
            changePrice,
            activeProgram,
            deactiveProgram,
            deleteProgram,
            handleSaveImage,
            handleSaveVideo,
            isSaved,
        }}>
            {children}
        </MyProgramContext.Provider>
    )
}