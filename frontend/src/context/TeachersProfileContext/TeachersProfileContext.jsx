import React, { createContext, useState, useEffect, useReducer, useContext } from 'react'
export const TeachersProfileContext = createContext()
import moment from 'moment'
import { AppContext } from "src/context/AppContext"

import {
    teacherStateReducer,
} from './reducers/teacherStateReducer'

export const TeachersProfileProvider = ({ children, id }) => {


    const appContext = useContext(AppContext);
    //State de show modal scheduleClass
    const [showScheduleClass, setShowScheduleClass] = useState(false);


    const initialState = {
        loading: true,
        error: '',
        user: null,
        classes: [],
        selected_classes: 0,
        temporary_classes: [],
        classes_assigned_left: [],
        classes_buyed: 0,
        event_classes_left: []
    }

    const [teacherState, dispatch] = useReducer(teacherStateReducer, initialState)

    useEffect(() => {

        dispatch({
            type: 'FETCH_SUCCESS', payload: {
                user: {
                    id: 'efwafaewafew',
                    name: 'Alex',
                    surname: 'Hernandez',
                    email: 'alex@gmail.com',
                    phone_number: '543534543',
                    profile: {
                        picture: '../../../static/assets/img/profile-blank.png'
                    },
                    teacher: {
                        rating: 4.7,
                        class_price: {
                            label: "24.99$ por clase",
                            value: 24.99,
                            type: "usd"
                        },
                        presentation: 'Hola me llamo Alex Hernandez y soy programador fullstack con amplios conocimientos de HTML, CSS, JavaScript, React, PHP, Python, Django, MySQL, Postgresql, Ubuntu, etc...',
                        video_presentation: 'https://www.youtube.com/embed/l0s6ZLkV-U0',
                        teaches: [
                            {
                                id: Math.random().toString(36).substr(2),
                                subjectValue: 'Desarrollo con Swift'
                            },
                            {
                                id: Math.random().toString(36).substr(2),
                                subjectValue: 'Desarrollo con React'
                            },
                            {
                                id: Math.random().toString(36).substr(2),
                                subjectValue: 'Desarrollo con Angular'
                            },
                        ],
                        languages: [
                            {
                                id: "wcppkede79c",
                                languageValue: "hr",
                                languageLabel: "Croatian",
                                levelValue: "b1",
                                levelLabel: "B1, Usuario independiente",
                            },
                            {
                                id: "ar44m6450dl",
                                languageValue: "es",
                                languageLabel: "Spanish; Castilian",
                                levelValue: "b1",
                                levelLabel: "B1, Usuario independiente",
                            }
                        ],
                        skills: [
                            {
                                id: Math.random().toString(36).substr(2),
                                skillValue: 'HTML',
                                levelValue: 100
                            },
                            {
                                id: Math.random().toString(36).substr(2),
                                skillValue: 'CSS',
                                levelValue: 95
                            },
                            {
                                id: Math.random().toString(36).substr(2),
                                skillValue: 'JavaScript',
                                levelValue: 70
                            },
                            {
                                id: Math.random().toString(36).substr(2),
                                skillValue: 'PHP',
                                levelValue: 95
                            },
                            {
                                id: Math.random().toString(36).substr(2),
                                skillValue: 'MySQL',
                                levelValue: 32
                            }
                        ],
                        work_experience: [
                            {
                                id: "uljz5zio2fj",
                                title: "Programador frontend",
                                company: "Microsoft",
                                currentWorking: true,
                                startDate: new Date(),
                                endDate: false,
                                description: "En ese trabajo cumplía las funciónes de programador frontend",
                            },
                            {
                                id: "gx6s2r3urlv",
                                title: "Programador backend",
                                company: "Apple",
                                currentWorking: false,
                                startDate: new Date(),
                                endDate: new Date(),
                                description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor inventore natus est hic earum adipisci architecto explicabo harum, fuga necessitatibus ab voluptatibus illo voluptatem ratione, exercitationem voluptate, perspiciatis velit repudiandae."
                            }
                        ],
                        academic_experience: [
                            {
                                id: "px41nfl2vhh",
                                title: "Grado Superior de administración de sistemas",
                                school: "CESF",
                                currentStudiesing: true,
                                startDate: moment('Wed Jan 03 2018 00:00:00 GMT+0100'),
                                endDate: false,
                                description: "En esta escuela aprendi todo lo relacionado con la administración de sistemas informaticos"
                            },
                            {
                                id: "mwcr7atzbca",
                                title: "Grado Medio de administración de sistemas",
                                school: "CESF",
                                currentStudiesing: false,
                                startDate: moment('Wed Sep 21 2016 00:00:00 GMT+0200'),
                                endDate: moment('Thu Jun 21 2018 00:00:00 GMT+0200'),
                                description: "En esta escuela aprendi todo lo relacionado con la administración de sistemas informaticos",
                            }
                        ],
                        ratings: [
                            {
                                id: Math.random().toString(36).substr(2),
                                user: {
                                    name: 'Paco',
                                    surname: 'De la Cruz'
                                },
                                rating: 4.3,
                                comment: 'Un buen tipo',
                                date: new Date()
                            },
                            {
                                id: Math.random().toString(36).substr(2),
                                user: {
                                    name: 'Paco',
                                    surname: 'De la Cruz'
                                },
                                rating: 1,
                                comment: 'Un buen tipo',
                                date: new Date()
                            },
                            {
                                id: Math.random().toString(36).substr(2),
                                user: {
                                    name: 'Paco',
                                    surname: 'De la Cruz'
                                },
                                rating: 1,
                                comment: 'Un buen tipo',
                                date: new Date()
                            },
                            {
                                id: Math.random().toString(36).substr(2),
                                user: {
                                    name: 'Paco',
                                    surname: 'De la Cruz'
                                },
                                rating: 1,
                                comment: 'Un buen tipo',
                                date: new Date()
                            },
                            {
                                id: Math.random().toString(36).substr(2),
                                user: {
                                    name: 'Paco',
                                    surname: 'De la Cruz'
                                },
                                rating: 1,
                                comment: 'Un buen tipo',
                                date: new Date()
                            },
                            {
                                id: Math.random().toString(36).substr(2),
                                user: {
                                    name: 'Paco',
                                    surname: 'De la Cruz'
                                },
                                rating: 1,
                                comment: 'Un buen tipo',
                                date: new Date()
                            },
                            {
                                id: Math.random().toString(36).substr(2),
                                user: {
                                    name: 'Paco',
                                    surname: 'De la Cruz'
                                },
                                rating: 1,
                                comment: 'Un buen tipo',
                                date: new Date()
                            },
                            {
                                id: Math.random().toString(36).substr(2),
                                user: {
                                    name: 'Paco',
                                    surname: 'De la Cruz'
                                },
                                rating: 3.7,
                                comment: 'Un buen tipo',
                                date: new Date()
                            },
                            {
                                id: Math.random().toString(36).substr(2),
                                user: {
                                    name: 'Paco',
                                    surname: 'De la Cruz'
                                },
                                rating: 5,
                                comment: 'Un buen tipo',
                                date: new Date()
                            },
                            {
                                id: Math.random().toString(36).substr(2),
                                user: {
                                    name: 'Paco',
                                    surname: 'De la Cruz'
                                },
                                rating: 5,
                                comment: 'Un buen tipo',
                                date: new Date()
                            },

                        ],
                        business_hours: [
                            {
                                daysOfWeek: [1, 2, 3], // Monday, Tuesday, Wednesday
                                startTime: '08:00', // 8am
                                endTime: '18:00' // 6pm
                            },
                            {
                                daysOfWeek: [4, 5], // Thursday, Friday
                                startTime: '10:00', // 10am
                                endTime: '16:00' // 4pm
                            }
                        ],

                    },
                },
                classes: [
                    {
                        id: 'fudhnl6tja5',
                        title: null,
                        start: new Date(),
                        end: null,
                        constraint: 'businessHours',
                        owner: {
                            id: "alex1234h",
                            name: "Alex",
                            surname: "Hernandez"
                        },
                        description: 'Esta es una clase aceptada',
                        students: [
                            {
                                user: {
                                    id: "alex1234h",
                                    name: "DOMINGO",
                                    surname: "CAYUELA",
                                },
                                is_admin: true,
                                is_invited: false,
                                is_accepted: false
                            },

                        ],
                        invitations: [
                            {
                                code: 'fefewfewafwe',
                                user: {
                                    id: "alex1efwa234h",
                                    name: "DOMIfeawNGO",
                                    surname: "CAYUewELA",
                                },
                                is_admin: false,
                                is_invited: true,
                                is_accepted: false
                            },
                            {
                                code: 'fefewfewafwe',
                                user: {
                                    id: "alex1few234h",
                                    name: "DOMIfewNGO",
                                    surname: "CAYUfewELA",

                                },
                                is_admin: false,
                                is_invited: true,
                                is_accepted: false
                            },
                        ]

                    },
                ],
                classes_buyed: 5
            }
        })



    }, [appContext.userProfile.loading]);
    useEffect(() => {
        if (appContext.userProfile.is_authenticated && !teacherState.loading) {
            if (appContext.userProfile.user.id) {
                dispatch({
                    type: 'SET_EVENT_CLASSES_LEFT', payload: {
                        user_id: appContext.userProfile.user.id,
                    }
                })

            }
        }
    }, [appContext.userProfile.loading, teacherState.loading, appContext.userProfile.is_authenticated]);

    const [key, setKey] = useState(0);
    useEffect(() => {

        if (key == 0) {
            console.log('entra');

            dispatch({ type: 'RESET_TEMPORARY_CLASS' })
            dispatch({ type: 'SET_SELECTED_CLASSES', payload: 0 })
            dispatch({ type: 'RESET_ASSIGNED_CLASS' })
        }
    }, [key])
    const handleNext = () => {
        document.querySelector('.modal').scrollTop = 0

        if (key <= 1) {
            if (teacherState.selected_classes > 0) {
                setKey(parseInt(key) + 1)

            }
        }
    }
    const handlePrevious = () => {

        document.querySelector('.modal').scrollTop = 0

        if (teacherState.selected_classes > 0) {
            setKey(parseInt(key) - 1)

        }
    }
    const handleClose = () => {
        if (key > 0) {
            handleHideDetailsClassForm()
            setKey(0)
            setShowScheduleClass(false)
        } else {
            handleHideDetailsClassForm()
            setKey(0)
            setShowScheduleClass(false)
        }

    };
    const handleShow = () => {
        handleHideDetailsClassForm()
        setKey(0)
        setShowScheduleClass(true)
    };



    const selectClasses = (classesSelected) => {

        dispatch({ type: 'SET_SELECTED_CLASSES', payload: classesSelected })

        dispatch({ type: 'SET_ASSIGNED_CLASS', payload: classesSelected })
    }

    const handleBuy = () => {
        dispatch({ type: 'BUY_CLASSES' })

        handleClose()
        document.querySelector('.teacher-calendar').scrollTop = 0
    }
    const [showDetailsClassForm, setShowDetailsClassForm] = useState(false)
    const handleShowDetailsClassForm = () => {

        setShowDetailsClassForm(true)
        if (showScheduleClass) {
            document.querySelector('.modal').scrollTop = 0
        }
    }
    const handleHideDetailsClassForm = () => {
        setIsMyClass(false)
        setIsEdit(false)
        setInviteStudentsState(false)
        setIsEdit(false)
        setShowDetailsClassForm(false)

    }
    const [isEdit, setIsEdit] = useState(false)
    const [isMyClass, setIsMyClass] = useState(false)
    const [onlyShow, setOnlyShow] = useState(false)
    const [inviteStudentsState, setInviteStudentsState] = useState(false)

    const handleClickInviteStudents = () => {
        if (inviteStudentsState) {
            setInviteStudentsState(false)
        } else {
            setInviteStudentsState(true)
        }
    }

    const addClass = (classData) => {
        setIsMyClass(false)
        setIsEdit(false)
        dispatch({
            type: 'ADD_CLASSES',
            payload: classData
        })
        dispatch({
            type: 'ADD_CLASS',
        })
    }
    const addTemporaryClassEvent = (classData) => {

        dispatch({ type: 'REMOVE_ASSIGNED_CLASS' })
        dispatch({
            type: 'ADD_TEMPORARY_CLASS',
            payload: classData
        })
        handleHideDetailsClassForm()
    }

    const updateTemporaryClassEvent = (classData) => {


        dispatch({
            type: 'UPDATE_TEMPORARY_CLASS',
            payload: classData
        })
        handleHideDetailsClassForm()
    }

    const updateClass = (classData) => {

        setIsMyClass(false)
        setIsEdit(false)
        dispatch({
            type: 'UPDATE_CLASSES',
            payload: classData
        })
        handleHideDetailsClassForm()
    }
    const removeClass = (classData) => {
        setIsMyClass(false)
        setIsEdit(false)
        dispatch({ type: 'REMOVE_CLASS' })
        dispatch({
            type: 'DELETE_CLASSES',
            payload: classData
        })
        handleHideDetailsClassForm()
    }
    const removeTemporaryClassEvent = (classData) => {
        dispatch({ type: 'ADD_ASSIGNED_CLASS' })
        dispatch({
            type: 'DELETE_TEMPORARY_CLASS',
            payload: classData
        })
        handleHideDetailsClassForm()

    }

    const [editableClassData, setEditableClassData] = useState(false)

    const handleInviteUser = (user, classData) => {
        dispatch({
            type: 'ADD_INVITATION',
            payload: {
                classData,
                user
            }
        })
    }

    return (
        <TeachersProfileContext.Provider value={{
            teacherState,
            showScheduleClass,
            key,
            setKey,
            handleClose,
            handleShow,
            handleNext,
            handlePrevious,
            selectClasses,
            handleBuy,
            showDetailsClassForm,
            handleShowDetailsClassForm,
            handleHideDetailsClassForm,
            isEdit,
            setIsEdit,
            isMyClass,
            setIsMyClass,
            onlyShow,
            setOnlyShow,
            inviteStudentsState,
            setInviteStudentsState,
            handleClickInviteStudents,
            addTemporaryClassEvent,
            updateTemporaryClassEvent,
            removeTemporaryClassEvent,
            editableClassData,
            setEditableClassData,
            addClass,
            updateClass,
            removeClass,
            handleInviteUser
        }}>
            {children}
        </TeachersProfileContext.Provider>
    )
}