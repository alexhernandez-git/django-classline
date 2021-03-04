import React, { useState, useContext } from 'react'
import { Tab, Nav, Col, Row } from 'react-bootstrap'
import "static/assets/styles/components/Layout/TabMenu.scss"

import { MyProgramProvider, MyProgramContext } from "src/context/ProgramContext/MyProgramContext"
import ProgramsPresentation from 'src/components/Users/Teachers/TeachersZone/TeachersPrograms/ProgramsData/ProgramsPresentation'
import ProgramsMainInfo from 'src/components/Users/Teachers/TeachersZone/TeachersPrograms/ProgramsData/ProgramsMainInfo'
import ProgramsBenefits from 'src/components/Users/Teachers/TeachersZone/TeachersPrograms/ProgramsData/ProgramsBenefits'
import ProgramsPricing from 'src/components/Users/Teachers/TeachersZone/TeachersPrograms/ProgramsData/ProgramsPricing'
import ProgramsConfiguration from 'src/components/Users/Teachers/TeachersZone/TeachersPrograms/ProgramsData/ProgramsConfiguration'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ProgramsTimetable from 'src/components/Users/Teachers/TeachersZone/TeachersPrograms/ProgramsData/ProgramsTimetable'
// import ProgramsMeetup from 'src/components/Users/Teachers/TeachersZone/TeachersPrograms/ProgramsData/ProgramsMeetup'
import ProgramsVideos from 'src/components/Users/Teachers/TeachersZone/TeachersPrograms/ProgramsData/ProgramsVideos'
const ProgramsData = (props) => {
    const MySwal = withReactContent(Swal)
    const { match } = props;
    let { id } = match.params;
    const [key, setKey] = useState(0)

    return (
        <MyProgramProvider id={id}>
            <MyProgramContext.Consumer>
                {programContext => (
                    <>

                        {true ?
                            <>
                                <div className="border-bottom d-sm-flex justify-content-between p-2">
                                    <div className="d-block d-sm-none m-2"></div>

                                    <Link to="/myzone/instructor/programs" className="btn-green py-2 px-3 text-white">
                                        Volver
                                        </Link>
                                    <div className="d-block d-sm-none m-4"></div>
                                    <span className="d-block d-sm-flex align-items-center h4 mb-0 text-grey  text-center">
                                        {programContext.myProgramState.title == '' ?
                                            <>Nombre de la academia</>
                                            :
                                            <>
                                                {programContext.myProgramState.title.length > 18 ?
                                                    programContext.myProgramState.title.substring(0, 18) + '...'
                                                    :
                                                    programContext.myProgramState.title

                                                }
                                            </>
                                        }

                                    </span>
                                    <div className="d-block d-sm-none m-2"></div>
                                    {programContext.isSaved ?

                                        <button className="btn-green btn-green-disabled py-2 px-3 text-white btn-sm-block">
                                            Guardado
                                        </button>
                                        :

                                        <button className="btn-green py-2 px-3 text-white btn-sm-block beat" onClick={programContext.saveProgram}>
                                            Guardar
                                        </button>
                                    }
                                </div>

                            </>
                            :
                            ''
                        }
                        <div className="container teacher-my-course pt-5 text-grey">

                            <div className="d-sm-flex justify-content-start">
                                <div className="tab-menu w-100">
                                    <div className="d-sm-flex justify-content-between">
                                        <span className="h3 d-block mb-0 text-dark">Programa</span>
                                        <div className="m-3 d-none d-sm-block"></div>

                                        {/* <button className="d-none d-sm-block btn-outline-green py-2 px-3 bg-white btn-sm-block">
                                            Activar el programa
                                        </button> */}
                                        {programContext.myProgramState.actived ?

                                            <button
                                                className="d-none d-sm-block btn-outline-green py-2 px-3 bg-white btn-sm-block cursor-no-pointer"

                                            >
                                                Academia publicado
</button>
                                            :

                                            <button
                                                className="d-none d-sm-block btn-outline-green py-2 px-3 bg-white btn-sm-block cursor-no-pointer"
                                            >
                                                Academia no publicado
</button>
                                        }

                                    </div>
                                    <span>Planifica tu programa</span>
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
                                                        <Nav.Link eventKey={0} className="text-grey">
                                                            <span className="font-weight-bold">INFORMACIÓN PRINCIPAL</span>

                                                        </Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey={1} className="text-grey">
                                                            <span className="font-weight-bold">VIDEOS</span>

                                                        </Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey={2} className="text-grey">
                                                            <span className="font-weight-bold">MEETUPS</span>

                                                        </Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey={3} className="text-grey">
                                                            <span className="font-weight-bold">PRECIO</span>

                                                        </Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey={4} className="text-grey">
                                                            <span className="font-weight-bold">CONFIGURACIÓN</span>

                                                        </Nav.Link>
                                                    </Nav.Item>




                                                </Nav>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="pl-3 pr-3">

                                                <Tab.Content>
                                                    <Tab.Pane eventKey={0} className="text-grey">
                                                        <ProgramsMainInfo />
                                                        <ProgramsBenefits />
                                                        <ProgramsPresentation />

                                                    </Tab.Pane>
                                                    {/* <Tab.Pane eventKey={1} className="text-grey">
                                                        <ProgramsVideos />

                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey={2} className="text-grey">
                                                        <ProgramsMeetup />
                                                        {programContext.myProgramState.meetups ?
                                                            <ProgramsTimetable />
                                                            :
                                                            ''
                                                        }

                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey={3} className="text-grey">
                                                        <ProgramsPricing />
                                                    </Tab.Pane>

                                                    <Tab.Pane eventKey={4} className="text-grey">
                                                        <ProgramsConfiguration />
                                                    </Tab.Pane> */}

                                                </Tab.Content>
                                            </Col>
                                        </Row>
                                    </Tab.Container>
                                </div>
                            </div>
                            <div className="pt-3">



                            </div>
                        </div>
                    </>
                )}
            </MyProgramContext.Consumer>
        </MyProgramProvider >
    );
}

export default ProgramsData;
