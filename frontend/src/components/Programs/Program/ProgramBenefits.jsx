import React, { useState, useContext } from 'react';
import "static/assets/styles/components/Users/Teachers/TeachersProfile/TeacherTeach.scss"
import { IconContext } from "react-icons";
import { IoMdCheckmark } from 'react-icons/io';
import { TeachersProfileContext } from "src/context/TeachersProfileContext/TeachersProfileContext"
import { ProgramContext } from "src/context/ProgramContext/ProgramContext"

const CourseBenefits = () => {
    const teacherContext = useContext(TeachersProfileContext);

    const [isOpen, setIsOpen] = useState(false)
    return (
        <ProgramContext.Consumer>
            {programContext => (
                <div className="teacher-teach w-100 p-4 rounded border mb-3 bg-light text-dark">

                    <span className="d-block h4 font-weight-normal text-primary">Beneficios</span>
                    <div className="row pr-3 pl-3 mt-3">
                        {programContext.programState.program.benefits.map(benefit => (
                            <div className="col-md-6 text-break">
                                <div className="subject p-2 position-relative">

                                    <IconContext.Provider value={{
                                        className: "mr-2 text-primary position-absolute",
                                        size: '20px',

                                    }}>
                                        <IoMdCheckmark style={{ top: '9px', left: '-12px' }} />{' '}
                                        {benefit.name}
                                    </IconContext.Provider>
                                </div>


                            </div>
                        ))
                        }
                    </div>


                </div >
            )
            }
        </ProgramContext.Consumer >
    )
}

export default CourseBenefits;
