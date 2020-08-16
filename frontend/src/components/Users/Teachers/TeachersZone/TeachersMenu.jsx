import React from 'react'
import { FaChalkboardTeacher, FaUserEdit, FaChalkboard, FaUserGraduate } from 'react-icons/fa';
import { MdMessage, MdSchool } from 'react-icons/md';
import { IoMdPricetag } from 'react-icons/io';
import { GiTeacher } from 'react-icons/gi';

import { IconContext } from "react-icons";
import { Link } from 'react-router-dom';
import { AppContext } from 'src/context/AppContext'
export default function TeachersMenu() {
    return (
        <AppContext.Consumer>
            {appContext => (
                <>
                    <div className="teachers-menu zone-sidebar shadow bg-gradient-green">

                        <Link to="/myzone/instructor">
                            <div className="m-2 d-none d-md-block"></div>
                            <div className="seccion">



                                <div className={/^\/myzone\/instructor\/?$/.test(location.pathname) ?
                                    "div-icon-rol bg-white rounded-circle"
                                    :
                                    "div-icon bg-white rounded-circle"}

                                >

                                    <IconContext.Provider
                                        value={{
                                            className: "global-class-name text-primary",
                                            size: '20px'
                                        }}>
                                        <FaUserEdit />
                                    </IconContext.Provider>
                                </div>

                                <small className="text-white">
                                    Perfil
                    </small>
                            </div>
                        </Link>
                        {
                            // appContext.userProfile.user.profile.is_teacher ?
                            true ?
                                <>
                                    <Link to="/myzone/instructor/programs">
                                        <div className="seccion">
                                            <div className={/^\/myzone\/instructor\/program*/.test(location.pathname) ?
                                                "div-icon-rol bg-white rounded-circle"
                                                :
                                                "div-icon bg-white rounded-circle"}

                                            >

                                                <IconContext.Provider
                                                    value={{
                                                        className: "global-class-name text-primary",
                                                        size: '20px'
                                                    }}>
                                                    <FaChalkboardTeacher />
                                                </IconContext.Provider>
                                            </div>

                                            <small className="text-white">
                                                Academias
                                         </small>
                                        </div>
                                    </Link>
                                    {/* 
                                    <Link to="/myzone/instructor/courses">
                                        <div className="seccion">
                                            <div className="div-icon bg-white rounded-circle">

                                                <IconContext.Provider
                                                    value={{
                                                        className: "global-class-name text-primary",
                                                        size: '20px'
                                                    }}>
                                                    <MdSchool />
                                                </IconContext.Provider>
                                            </div>

                                            <small className="text-white">
                                                Cursos
                                         </small>
                                        </div>
                                    </Link> */}
                                    {/* <Link to="/myzone/instructor/classes">
                                        <div className="seccion">
                                            <div className={/^\/myzone\/instructor\/classes\/?$/.test(location.pathname) ?
                                                "div-icon-rol bg-white rounded-circle"
                                                :
                                                "div-icon bg-white rounded-circle"}

                                            >
                                                <IconContext.Provider
                                                    value={{
                                                        className: "global-class-name text-primary",
                                                        size: '20px'
                                                    }}>
                                                    <FaChalkboard />
                                                </IconContext.Provider>
                                            </div>

                                            <small className="text-white">
                                                Tutor
                                                     </small>
                                        </div>
                                    </Link> */}





                                    {/* 
                                    <Link to="/myzone/instructor/messages">
                                        <div className="seccion">
                                            <div className="div-icon bg-white rounded-circle">

                                                <IconContext.Provider
                                                    value={{
                                                        className: "global-class-name text-primary",
                                                        size: '20px'
                                                    }}>
                                                    <MdMessage />
                                                </IconContext.Provider>
                                            </div>

                                            <small className="text-white">
                                                Mensajes
                                            </small>
                                        </div>
                                    </Link> */}

                                </>
                                :
                                ''
                        }
                        {/* <Link to="/myzone/student">
                            <div className="seccion">
                                <div className="div-icon bg-white rounded-circle">

                                    <IconContext.Provider
                                        value={{
                                            className: "global-class-name text-primary",
                                            size: '20px'
                                        }}>
                                        <FaUserGraduate />
                                    </IconContext.Provider>
                                </div>
                                <small className="text-white">
                                    Alumno
                                        </small>
                            </div>
                        </Link> */}
                        {/* <Link to="/myzone/teacher/calendar">
                <div className="seccion">
                    <div className="div-icon bg-gradient-green rounded-circle">

                        <IconContext.Provider
                            value={{
                                className: "global-class-name text-white",
                                size: '20px'
                            }}>
                            <FaRegCalendarAlt />
                        </IconContext.Provider>
                    </div>

                    <small>
                        Calendario
                    </small>
                </div>
            </Link> */}
                        {/* <Link to="/myzone/messages">
                <div className="seccion">
                    <div className="div-icon bg-gradient-green rounded-circle">

                        <IconContext.Provider
                            value={{
                                className: "global-class-name text-white",
                                size: '20px'
                            }}>
                            <MdMessage />
                        </IconContext.Provider>
                    </div>

                    <small className="">
                        Mensajes
                    </small>
                </div>
            </Link> */}

                    </div>
                </>
            )
            }
        </AppContext.Consumer >
    )
}