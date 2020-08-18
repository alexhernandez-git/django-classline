import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from 'src/context/AppContext'
import ProgramsPresentation from 'src/components/Users/Teachers/TeachersZone/TeachersPrograms/ProgramsData/ProgramsPresentation'
import ProgramsMainInfo from 'src/components/Users/Teachers/TeachersZone/TeachersPrograms/ProgramsData/ProgramsMainInfo'
import ProgramsBenefits from 'src/components/Users/Teachers/TeachersZone/TeachersPrograms/ProgramsData/ProgramsBenefits'
import axios from 'axios'
import { Formik, Form } from 'formik';
import {useHistory} from 'react-router-dom'
export default function ProgramsCreate() {
    const history = useHistory()
    const appContext = useContext(AppContext);
    const [created, setCreated] = useState(false)
    const [error, setError] = useState({
        title: null,
        description: null
    })

    const createProgram = (values) => {
        async function postData(values) {
            const fd = new FormData()
            fd.append('title', values.title)
            fd.append('subtitle', values.subtitle)
            fd.append('description', values.description)
            fd.append('program_language', values.program_language)
            // fd.append('benefits', values.benefits)
            // fd.append('picture', values.picture, values.picture.name)
            // fd.append('video_presentation', values.video_presentation, values.video_presentation.name)


            await axios
                .post(`/api/programs/`, fd, appContext.tokenConfig(appContext.userProfile))
                .then(res => {
                    appContext.newProgram(res.data)
                    setError({
                        title: null,
                        description: null
                    })
                    history.push('/myzone/instructor/programs')
                })
                .catch(err => {
                    setError(err.response.data)

                });
        }
        postData(values)
    }

    return (
        <>
               <Formik
            initialValues={{
                title: '',
                subtitle: '',
                description: '',
                benefits: [],
                program_language: {},
                picture: null,
                video_presentation: null
            }}
            onSubmit={(values, actions) => {
                createProgram(values)
            }}
            >
            {(props) => (
                <>
           <Form>

            <div className="border-bottom d-sm-flex justify-content-between p-2">
            <div className="d-block d-sm-none m-2"></div>

            <Link to="/myzone/instructor/programs" className="btn-green py-2 px-3 text-white">
                Volver
                </Link>
            <div className="d-block d-sm-none m-4"></div>
            <span className="d-block d-sm-flex align-items-center h4 mb-0 text-grey  text-center">
                    <>Nombre de la academia</>
            </span>
            <div className="d-block d-sm-none m-2"></div>
        
                <button type="submit" className="btn-green py-2 px-3 text-white btn-sm-block beat">
                    Crear
                </button>
        </div>

        <div className="container text-grey">

                <ProgramsMainInfo error={error} />
                {/* <ProgramsBenefits values={props.values} />
                <ProgramsPresentation 
                    values={props.values} 
                    setFieldValue={props.setFieldValue}
                /> */}

        </div>
           </Form>
        </>
        )}
        </Formik>
        </>
    )
}
