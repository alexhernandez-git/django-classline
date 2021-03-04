import React, { useState, useContext } from 'react';
import "static/assets/styles/components/Users/Teachers/TeachersProfile/TeacherTeach.scss"
import { IconContext } from "react-icons";
import { IoMdCheckmark } from 'react-icons/io';
import { TeachersProfileContext } from "src/context/TeachersProfileContext/TeachersProfileContext"
import { ProgramContext } from "src/context/ProgramContext/ProgramContext"

const CourseTeaches = () => {
    const teacherContext = useContext(TeachersProfileContext);

    const [isOpen, setIsOpen] = useState(false)
    return (
        <ProgramContext.Consumer>
            {programContext => (
                < div className="teacher-teach border bg-light w-100 p-4 rounded mb-3 text-dark">
                    <span className="d-block h4 font-weight-normal text-primary">Descripción</span>
                    <div className="row pr-3 pl-3 mt-3 new-line">
                        {programContext.programState.program.description}
                    </div>
                </div>
            )
            }
        </ProgramContext.Consumer >
    )
}

export default CourseTeaches;
