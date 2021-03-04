import React from 'react'
import Card from 'react-bootstrap/Card'
import 'static/assets/styles/components/Courses/Course.scss'
import { FaRegStar, FaStar } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { ProgramContext } from "src/context/ProgramContext/ProgramContext"

import { IconContext } from "react-icons";
import { Link } from "react-router-dom"
import StarRating from '../../Layout/StarRatings';
export default function MainInfoCourse() {
    return (
        <ProgramContext.Consumer>
            {programContext => (
                <div className="w-100 p-4 rounded">
                    <div className="h2">
                        {programContext.programState.program.title}
                    </div>
                    <div className="h4 font-weight-normal">
                        {programContext.programState.program.subtitle}

                    </div>
                    <div className="font-weight-normal">
                        {programContext.programState.program.students} estudiantes

                    </div>
                    <div className="mt-3">

                            <div className="punctuation">
                            <StarRating rating={programContext.programState.program.rating}/>
                                <small className="font-weight-light ml-1 mt-1 d-block">({programContext.programState.program.ratings})</small>
                            </div>

                    </div>
                    <div className="mt-2">
                        <Link to={`/instructor/${programContext.programState.program.instructor.code}`}>
                            <span className="text-white">Creado por{' '}
                                {programContext.programState.program.instructor.profile.is_enterprise ?
                                    programContext.programState.program.instructor.profile.company_name
                                    :
                                    <>
                                        {programContext.programState.program.instructor.first_name}{' '}
                                        {programContext.programState.program.instructor.last_name}
                                    </>
                                }
                            </span>
                        </Link>
                    </div>
                    {programContext.programState.program.program_language ?
                        <div className="mt-2">
                            <IconContext.Provider
                                value={{
                                    className: "text-white mr-1",
                                    size: '20px'
                                }}>
                                <FiMessageCircle />

                            </IconContext.Provider>

                            <span>{programContext.programState.program.program_language.nativeName}</span>
                        </div>
                        :
                        ''

                    }
                    {/* <div className="mt-5">
                        <Link className="btn-green text-white py-2 px-3 h5"to={`/demo/academy/${programContext.programState.program.code}/home`} target="_blank">
                            <span>Ver demo</span>
                        </Link>
                    </div> */}

                </div>
            )
            }
        </ProgramContext.Consumer >
    )
}
