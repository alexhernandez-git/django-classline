import React, { useRef, useState, useEffect, useContext } from 'react';
import 'cropperjs/dist/cropper.css';
import { Form, Row, Col } from 'react-bootstrap'
import { MyProgramContext } from "src/context/ProgramContext/MyProgramContext"
import { AppContext } from "src/context/AppContext"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useHistory } from "react-router-dom";
const ProgramsConfiguration = () => {
    const programContext = useContext(MyProgramContext);
    const appContext = useContext(AppContext);
    const MySwal = withReactContent(Swal)
    const history = useHistory();
    const handleDeactivate = () => {
        MySwal.fire({
            title: 'Estas seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Desactivar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {

                programContext.deactiveProgram()

                return Swal.fire({
                    icon: 'success',
                    title: 'Desactivado',
                })
            }
        })
    }
    const handleDelete = () => {
        MySwal.fire({
            title: 'Estas seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                programContext.deleteProgram()
                appContext.deleteProgram(programContext.myProgramState.id)
                history.push("/myzone/instructor/programs");
                return Swal.fire({
                    icon: 'success',
                    title: 'Borrado',
                })
            }
        })
    }
    const handlePublishProgram = () => {
        if (programContext.isSaved) {
            MySwal.fire({
                title: 'Estas seguro?',
                text: 'Al publicar el programa ya no podrás cambiar el precio de la subscripción',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Publicar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {


                    programContext.activeProgram()

                    return Swal.fire({
                        icon: 'success',
                        title: 'Felicidades! Tu programa esta publicado',
                    })
                }
            })
        } else {

            MySwal.fire({
                icon: 'error',
                title: 'Antes de publicar guarda los cambios',
            })
        }

    }
    return (
        <MyProgramContext.Consumer>
            {programContext => (
                <>
                    <div className="bg-white shadow p-3 rounded my-2">
                        <span className="d-none d-md-block">Configuración del curso</span>
                        <Row>
                            <Col lg={{ span: 4 }} className="mb-3 text-center d-lg-flex justify-content-end align-items-center">
                                <span className="h5 m-0 font-weight-normal">Publicación del curso</span>

                            </Col>

                            <Col lg={{ offset: 1, span: 6 }}>
                                <Form.Group controlId="formGroupName">

                                    {programContext.myProgramState.actived ?

                                        <button
                                            className="btn-outline-green py-2 px-3 bg-white btn-sm-block cursor-no-pointer"
                                        >
                                            Programa publicado
                                </button>
                                        :

                                        <button
                                            className="btn-green py-2 px-3  text-white btn-sm-block"
                                            onClick={handlePublishProgram}
                                        >
                                            Publicar programa
                                        </button>
                                    }
                                </Form.Group>

                            </Col>

                            <Col lg={{ span: 4 }} className="mb-3 text-center d-lg-flex justify-content-end align-items-center">
                                <span className="h5 m-0 font-weight-normal">Borrar el programa</span>
                            </Col>

                            <Col lg={{ offset: 1, span: 6 }}>
                                <Form.Group controlId="formGroupName">
                                    <button
                                        className="btn-red py-2 px-3 text-white btn-sm-block"
                                        onClick={handleDelete}
                                    >
                                        Borrar programa
                                    </button>

                                </Form.Group>

                            </Col>

                        </Row>
                    </div >
                </>
            )}
        </MyProgramContext.Consumer>
    );
}

export default ProgramsConfiguration;
