import React, { useState, useContext } from 'react'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import "static/assets/styles/components/Users/Teachers/TeachersZone/Profile/TeachersClasses.scss"

import TeachersProfilePresentation from "src/components/Users/Teachers/TeachersZone/TeachersProfileEdit/TeachersProfilePresentation"
import TeachersProfileLanguages from "src/components/Users/Teachers/TeachersZone/TeachersProfileEdit/TeachersProfileLanguages"
import TeachersProfileTeach from "src/components/Users/Teachers/TeachersZone/TeachersProfileEdit/TeachersProfileTeach"
import TeachersProfileWork from "src/components/Users/Teachers/TeachersZone/TeachersProfileEdit/TeachersProfileWork"
import TeachersProfileStudies from "src/components/Users/Teachers/TeachersZone/TeachersProfileEdit/TeachersProfileStudies"
import TeachersProfilePricing from "src/components/Users/Teachers/TeachersZone/TeachersProfileEdit/TeachersProfilePricing"
import ScheduleBusinessHours from "src/components/Users/Teachers/TeachersZone/TeachersProfileEdit/ScheduleBusinessHours"
import { AppContext } from "src/context/AppContext"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import TeachersProfileSkills from 'src/components/Users/Teachers/TeachersZone/TeachersProfileEdit/TeachersProfileSkills'
import { Route, Redirect, Link } from 'react-router-dom';
const TeachersActive = () => {
    const MySwal = withReactContent(Swal)
    const [key, setKey] = useState(1)
    const appContext = useContext(AppContext)
    const handleActivateTeacher = () => {
        const result = appContext.handleActivateTutor()

        if (result.result) {
            MySwal.fire({
                icon: 'success',
                title: result.message,
            })
        } else {
            MySwal.fire({
                icon: 'error',
                title: result.message,
            })
        }

    }
    const handleLogout = () => {
        appContext.logout()
    }
    return appContext.userProfile.user.profile.is_tutor ? <Redirect to="/myzone/teacher" /> : (
        <AppContext.Consumer>
            {appContext => (
                <>
                    <div className="container teachers-profile-edit pt-5 text-grey">
                        <div className="d-sm-flex justify-content-between">
                            <div>
                                <span className="h3 d-block mb-0 text-dark">¿Quieres dar clases particulares?</span>

                                <span>Rellena el formulario</span>
                            </div>
                            {!appContext.userProfile.user.profile.is_tutor ?
                                <>
                                    <div className="d-block my-2 d-sm-none"></div>
                                    <div>
                                        <button className="btn btn-green rounded-pill text-white py-2 px-4"
                                            onClick={handleActivateTeacher}
                                        >Activar cuenta del tutor</button>
                                    </div>

                                </>
                                :
                                ''
                            }
                        </div>
                        <Tab.Container id="left-tabs-example" activeKey={key} onSelect={k => setKey(k)} defaultActiveKey="first" className="p-3">

                            <Row className="mb-3 mt-4">
                                <Col sm={12}>
                                    <Nav style={{
                                        whiteSpace: 'nowrap',
                                        position: 'relative',
                                        overflowX: 'auto',
                                        overflowY: 'hidden',
                                        width: '100%',
                                        flexWrap: 'nowrap'
                                    }}>



                                        <Nav.Item>
                                            <Nav.Link eventKey={1} className="text-grey">
                                                <span className="font-weight-bold">PERFIL DEL PROFESOR</span>

                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item className="d-none d-md-block">
                                            <Nav.Link eventKey={2} className="text-grey">
                                                <span className="font-weight-bold">HORAS DISPONIBLES</span>

                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey={3} className="text-grey">
                                                <span className="font-weight-bold">PRICING</span>
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                            </Row>

                            <Row>
                                <Col className="pl-3 pr-3">

                                    <Tab.Content>
                                        <Tab.Pane eventKey={1} className="text-grey">
                                            <TeachersProfilePresentation />
                                            <TeachersProfileTeach />
                                            <TeachersProfileLanguages />
                                            <TeachersProfileSkills />
                                            <TeachersProfileWork />
                                            <TeachersProfileStudies />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={2} className="text-grey">
                                            <div className="d-none d-md-block">
                                                <ScheduleBusinessHours />
                                            </div>
                                            <div className="d-block d-md-none">
                                                <span>Solo puedes acceder al calendario en la vista de escritorio</span>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={3} className="text-grey">
                                            <TeachersProfilePricing />
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </div>
                </>
            )
            }
        </AppContext.Consumer >
    );
}

export default TeachersActive;
