import React, { useRef, useContext, useState, useEffect } from 'react';
import { VideosContext } from "src/context/ProgramContext/VideosContext"
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { AppContext } from "src/context/AppContext"
import { Form, Row, Col, Modal, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const VideoModal = () => {
    const appContext = useContext(AppContext);
    const videosContext = useContext(VideosContext);
    const MySwal = withReactContent(Swal)

    const inputFileImgTopic = useRef(null);
    const cropper = useRef(null);
    const inputFile = useRef(null);
    const [cropResult, setCropResult] = useState(
        videosContext.topicState.picture ?
            videosContext.topicState.picture :
            '/media/utils/no-foto.png'
    );
    useEffect(() => {

        setCropResult(videosContext.topicState.picture ?
            videosContext.topicState.picture :
            '/media/utils/no-foto.png')
    }, [videosContext.showTopicModal]);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        inputFileImgTopic.current.value = ""
        setShow(false)

    };
    const handleShow = () => setShow(true);
    const handleUploadImage = (e) => {
        e.preventDefault()
        handleShow()

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();

        reader.onload = () => {
            videosContext.setSrcImageTopicValue(reader.result);

        };
        reader.readAsDataURL(files[0]);
    }
    function dataURLtoFile(dataurl, filename) {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    const cropImage = () => {

        if (typeof cropper.current.getCroppedCanvas() === "undefined") {
            return;
        }
        setCropResult(cropper.current.getCroppedCanvas().toDataURL());

        var file = dataURLtoFile(cropper.current.getCroppedCanvas().toDataURL(), appContext.userProfile.user.id + Math.random().toString(36) + '.jpeg');
        videosContext.setSrcImageTopic(file);
        handleClose()
    }
    const handleDeleteTopic = () => {
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

                videosContext.deleteTopic()

                return Swal.fire({
                    icon: 'success',
                    title: 'Borrado',
                })
            }
        })
    }
    return (
        <VideosContext.Consumer>
            {videosContext => (
                <>
                    <Modal show={videosContext.showTopicModal} onHide={videosContext.handleCloseTopicModal} size="lg" centered>
                        <Modal.Header closeButton className="border-0">
                            <span className="text-grey">Creación del tema</span>
                        </Modal.Header>
                        <Modal.Body className="bg-white text-grey">

                            <Row className="video-upload">
                                <Col lg={{ span: 4 }} className="mb-3 text-center d-lg-flex justify-content-end align-items-center">
                                    <span className="h5 m-0 font-weight-normal">Titulo del tema</span>

                                </Col>

                                <Col lg={{ offset: 1, span: 6 }}>
                                    <Form.Group controlId="formGroupName">
                                        <Form.Control
                                            value={videosContext.topicState.title}
                                            onChange={(e) => {
                                                videosContext.setTopicState({ ...videosContext.topicState, title: e.target.value });
                                            }}
                                            type="text"
                                            placeholder="Titulo"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col lg={{ span: 4 }} className="text-center d-lg-flex justify-content-end align-items-center">
                                    <span className="h5 m-0 font-weight-normal">Imagen</span>
                                </Col>
                                <Col lg={{ offset: 1, span: 6 }}>

                                    <label htmlFor="img-upload-video-topic" className="cursor-pointer w-100">

                                        <img
                                            controls
                                            style={{
                                                width: "100%",
                                                padding: "5px"
                                            }}
                                            src={cropResult}
                                            alt=""
                                            className="my-3 border rounded"
                                        />


                                    </label>
                                    <label htmlFor="img-upload-video-topic" className="bg-gradient-green p-2 rounded text-white cursor-pointer w-100 text-center rounded-pill">Subir imágen</label>
                                    <input type="file" id="img-upload-video-topic" className="d-none" ref={inputFileImgTopic} placeholder="Imagen" onChange={handleUploadImage} />

                                </Col>

                            </Row>
                        </Modal.Body>
                        <Modal.Footer className={videosContext.isEditTopic ? "border-0 justify-content-between" : 'border-0'}>
                            {videosContext.isEditTopic ?
                                <>


                                    <button className="btn-red py-2 px-3 text-white"
                                        onClick={handleDeleteTopic}>
                                        Borrar
                                    </button>
                                    <button className="btn-green py-2 px-3 text-white"
                                        onClick={videosContext.editTopic}>
                                        Actualizar
                                    </button>
                                </>
                                :
                                <button className="btn-green py-2 px-3 text-white"
                                    onClick={videosContext.handleCreateTopic}>
                                    Añadir tema
                                </button>
                            }
                        </Modal.Footer>
                    </Modal>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton className="border-0">
                        </Modal.Header>
                        <Modal.Body className="p-0">

                            <Cropper
                                ref={cropper}
                                src={videosContext.srcImageTopicValue}
                                style={{ height: 400, width: '100%' }}
                                // Cropper.js options
                                viewMode={1}
                                aspectRatio={1}
                                guides={false}

                            />

                        </Modal.Body>
                        <Modal.Footer className="border-0">
                            <Button className="btn-gradient-green bg-gradient-green border-0" onClick={cropImage}>
                                Guardar
                              </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )
            }
        </VideosContext.Consumer >
    );
}

export default VideoModal;
