import React, { useState, useContext } from 'react';
import "static/assets/styles/components/Users/Teachers/TeachersProfile/TeacherTeach.scss"
import { IconContext } from "react-icons";
import { FaStar, FaUser, FaChalkboardTeacher, FaUniversity } from 'react-icons/fa';
import { BsFillChatFill } from 'react-icons/bs';
import { TeachersProfileContext } from "src/context/TeachersProfileContext/TeachersProfileContext"
import { ProgramContext } from "src/context/ProgramContext/ProgramContext"

const CourseTeacher = () => {
    const teacherContext = useContext(TeachersProfileContext);

    const [isOpen, setIsOpen] = useState(false)
    return (
        <ProgramContext.Consumer>
            {programContext => (
                <div className="teacher-teach w-100 p-4 rounded bg-white text-grey">
                    <div className="row pr-3 pl-3">
                        <div className="col-sm-4 d-flex d-sm-block">

                            <div className="mb-2">

                                <img
                                    src={'/media/static/img/profile-blank.png'}
                                    alt=""
                                    className="rounded-circle"
                                    style={{
                                        height: '50px',
                                        width: '50px'
                                    }} />
                            </div>
                            <div className="d-block d-sm-none ml-3"></div>
                            <div>
                                <div className="d-flex align-items-center">
                                    <IconContext.Provider value={{
                                        className: "text-dark cursor-ponter",
                                        size: '15px'
                                    }}>

                                        <FaStar />
                                    </IconContext.Provider>
                                    <small className="text-grey ml-1">Calificacion: {programContext.programState.program.user.teacher.rating}</small>

                                </div>
                                <div className="d-flex align-items-center">
                                    <IconContext.Provider value={{
                                        className: "text-dark cursor-ponter",
                                        size: '15px'
                                    }}>

                                        <BsFillChatFill />
                                    </IconContext.Provider>
                                    <small className="text-grey ml-1">{programContext.programState.program.user.teacher.ratings} reseñas</small>

                                </div>
                                <div className="d-flex align-items-center">
                                    <IconContext.Provider value={{
                                        className: "text-dark cursor-ponter",
                                        size: '15px'
                                    }}>

                                        <FaUser />
                                    </IconContext.Provider>
                                    <small className="text-grey ml-1">147.486 estudiantes</small>

                                </div>
                                <div className="d-flex align-items-center">
                                    <IconContext.Provider value={{
                                        className: "text-dark cursor-ponter",
                                        size: '15px'
                                    }}>

                                        <FaUniversity />
                                    </IconContext.Provider>
                                    <small className="text-grey ml-1">3 cursos impartidos</small>

                                </div>
                                <div className="d-flex align-items-center">
                                    <IconContext.Provider value={{
                                        className: "text-dark cursor-ponter",
                                        size: '15px'
                                    }}>

                                        <FaChalkboardTeacher />
                                    </IconContext.Provider>
                                    <small className="text-grey ml-1">423 clases impartidas</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="d-block my-3 d-sm-none"></div>
                            <span className="d-block h4 text-primary">{programContext.programState.program.user.first_name} {programContext.programState.program.user.last_name}</span>
                            <span className="d-block h6 text-grey">Instructor de Muay Thai</span>
                            <small>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque impedit, magnam ad amet eveniet in sequi nulla, doloribus nihil placeat sed fugiat aut ducimus saepe necessitatibus, corporis optio excepturi officia.</small>
                        </div>
                    </div>
                </div>
            )
            }
        </ProgramContext.Consumer >
    )
}

export default CourseTeacher;
