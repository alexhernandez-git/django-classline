import React, { useState, useContext } from 'react'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import "static/assets/styles/components/Users/Teachers/TeachersZone/Courses/TeachersCourses.scss"
import { Link } from 'react-router-dom'
import ProgramCard from 'src/components/Layout/ProgramCard'
import { AppContext } from 'src/context/AppContext'
import { IconContext } from "react-icons";
import axios from "axios"
const TeachersPrograms = () => {
    const [key, setKey] = useState(0)
    const appContext = useContext(AppContext);
    
        // async function createProgram() {
        //     const data = {
        //         title: '',
        //         subtitle: '',
        //         description: '',
        //         benefits: [],
        //         events: [],
        //         program_price: null,
        //         program_language: null
        //     }
        //     await axios
        //         .post(`/api/programs/`, data, appContext.tokenConfig(appContext.userProfile))
        //         .then(res => {
        //             console.log(res)
        //             appContext.newProgram(res.data)
        //         })
        //         .catch(err => {
        //             console.log(err.response)

        //         });
        // }

    return (
        <AppContext.Consumer>
            {appContext => (

                <div className="container teacher-my-course pt-5 text-grey">

                    <div className="d-sm-flex justify-content-start">
                        <div>
                            <span className="h3 d-block mb-0 text-dark">Tus academias</span>
                            <span>Gestiona tus academias</span>

                        </div>
                    </div>
                    <div className="pt-3">
                        <div className="d-sm-flex justify-content-between">
                            <div>

                            </div>
                            <div>
                                <Link 
                                    to={"/myzone/instructor/new/program"}
                                    className="btn-green text-white px-3 py-2">
                                    Nueva academia
                                </Link>
                            </div>
                        </div>
                        <div className="mt-3">
                            {appContext.userProfile.user.teacher.programs.length > 0 ?
                                <>
                                    {appContext.userProfile.user.teacher.programs.map((program) => (
                                        <ProgramCard program={true} data={program} key={program.id} />
                                    ))}
                                </>
                                :
                                <span>No tienes academias</span>
                            }

                        </div>
                    </div>
                </div>
            )
            }
        </AppContext.Consumer >
    );
}

export default TeachersPrograms;
