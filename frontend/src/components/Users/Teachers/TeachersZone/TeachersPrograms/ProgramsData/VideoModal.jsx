import React, { useRef, useState, useEffect, useContext } from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap'
import { VideosContext } from "src/context/ProgramContext/VideosContext"
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';
import { AppContext } from "src/context/AppContext"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Select from 'react-select'

const VideoModal = () => {
    const inputFileVideoVideo = useRef(null);
    const inputFileImgVideo = useRef(null);
    const videosContext = useContext(VideosContext);
    const cropperVideo = useRef(null);
    const appContext = useContext(AppContext);
    const MySwal = withReactContent(Swal)

    const [cropResult, setCropResult] = useState(
        videosContext.videoState.picture ?
            videosContext.videoState.picture :
            '/media/utils/no-foto.png'
    );

    useEffect(() => {

        setCropResult(videosContext.videoState.picture ?
            videosContext.videoState.picture :
            '/media/utils/no-foto.png')
    }, [videosContext.show]);
    // useEffect(() => {
    //     if (videosContext.srcImage) {

    //         setCropResult(videosContext.srcImage)
    //     }
    // }, [videosContext.srcImage]);

    const selectStyles = { menu: styles => ({ ...styles, zIndex: 999 }) };

    const [show, setShow] = useState(false);
    const handleClose = () => {
        inputFileImgVideo.current.value = ""
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
            videosContext.setSrcImage(reader.result);

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

        if (typeof cropperVideo.current.getCroppedCanvas() === "undefined") {
            return;
        }

        setCropResult(cropperVideo.current.getCroppedCanvas().toDataURL());

        var file = dataURLtoFile(cropperVideo.current.getCroppedCanvas().toDataURL(), appContext.userProfile.user.id + Math.random().toString(36) + '.jpeg');
        if (file.size < 2000000) {

            videosContext.setSrcImageValue(file);

        } else {
            alert('Esta imágen no puede ser mayor a 2MB')
        }


        handleClose()
    }
    const handleUploadVideo = (e) => {
        e.preventDefault()

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();

        reader.onload = () => {
            videosContext.setSrcVideo(reader.result);

        };

        if (files[0].type != 'video/mp4') {
            alert('El formato tiene que ser .mp4');

        } else {

            reader.readAsDataURL(files[0]);

            videosContext.setSrcVideoValue(files[0]);
        }

    }
    const handleDeleteVideo = () => {
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

                videosContext.deleteVideo()

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
                    <Modal show={videosContext.show} onHide={videosContext.handleClose} size="lg" centered>
                        <Modal.Header closeButton className="border-0">
                            <span className="text-grey">Creación del video</span>
                        </Modal.Header>
                        <Modal.Body className="bg-white text-grey">

                            <Row className="video-upload mb-4">
                                <Col lg={{ span: 4 }} className="mb-3 text-center d-lg-flex justify-content-end align-items-center">
                                    <span className="h5 m-0 font-weight-normal">Titulo del video</span>

                                </Col>

                                <Col lg={{ offset: 1, span: 6 }}>
                                    <Form.Group controlId="formGroupName">
                                        <Form.Control
                                            value={videosContext.videoState.title}
                                            onChange={(e) => {
                                                videosContext.setVideoState({ ...videosContext.videoState, title: e.target.value });
                                            }}
                                            type="text"
                                            placeholder="Titulo"
                                        />
                                    </Form.Group>
                                </Col>


                                <Col lg={{ span: 4 }} className="mb-3 text-center d-lg-flex justify-content-end align-items-center">
                                    <span className="h5 m-0 font-weight-normal">Descripción</span>

                                </Col>


                                <Col lg={{ offset: 1, span: 6 }}>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Control
                                            as="textarea"
                                            rows="3"
                                            value={videosContext.videoState.description}
                                            onChange={(e) => {
                                                videosContext.setVideoState({ ...videosContext.videoState, description: e.target.value });
                                            }}
                                            placeholder="Pon una descripción" />
                                    </Form.Group>
                                </Col>
                                <Col lg={{ span: 4 }} className="mb-3 text-center d-lg-flex justify-content-end align-items-center">
                                    <span className="h5 m-0 font-weight-normal">Tema</span>

                                </Col>


                                <Col lg={{ offset: 1, span: 6 }}>
                                    <Form>
                                        <Form.Group controlId="exampleForm.SelectCustom">
                                            <Select
                                                styles={selectStyles}
                                                value={videosContext.videoState.topic}
                                                options={[...videosContext.topicsState.topics.results]}
                                                getOptionLabel={(option) => option.title}
                                                getOptionValue={(option) => option.id}
                                                placeholder={<div>Selecciona el tema</div>}
                                                onChange={(e) => {
                                                    videosContext.setVideoState({ ...videosContext.videoState, topic: e });
                                                }}
                                                theme={(theme) => ({
                                                    ...theme,
                                                    colors: {
                                                        ...theme.colors,
                                                        text: 'orangered',
                                                        primary25: '#45948930',
                                                        primary50: '#45948952',
                                                        primary: '#459489',
                                                    },
                                                })}></Select>

                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col lg={{ span: 4 }} className="text-center d-lg-flex justify-content-end align-items-center">
                                    <span className="h5 m-0 font-weight-normal">Miniatura</span>
                                </Col>
                                <Col lg={{ offset: 1, span: 6 }}>
                                    <label htmlFor="img-upload-video" className="cursor-pointer w-100">

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
                                    <label htmlFor="img-upload-video" className="bg-gradient-green p-2 rounded text-white cursor-pointer w-100 text-center rounded-pill">Subir imágen</label>
                                    <input type="file" id="img-upload-video" className="d-none" ref={inputFileImgVideo} placeholder="Imagen" onChange={handleUploadImage} />

                                </Col>




                                <Col lg={{ span: 4 }} className="text-center d-lg-flex justify-content-end align-items-center">
                                    <span className="h5 m-0 font-weight-normal">Video</span>
                                </Col>
                                <Col lg={{ offset: 1, span: 6 }}>
                                    <label htmlFor="video-upload-video" className="cursor-pointer w-100">

                                        {videosContext.srcVideo == null ?
                                            <>
                                                {videosContext.isEditVideo ?
                                                    <video
                                                        controls
                                                        style={{
                                                            width: "100%",
                                                            padding: "5px"
                                                        }}
                                                        src={videosContext.videoState.video}
                                                        alt=""
                                                        className="my-3 border rounded"
                                                    />
                                                    :
                                                    <img
                                                        controls
                                                        style={{
                                                            width: "100%",
                                                            padding: "5px"
                                                        }}

                                                        src={'../../../../../../static/assets/img/video-icon.png'}
                                                        alt=""
                                                        className="my-3 border rounded"
                                                    />
                                                }
                                            </>


                                            :
                                            <video
                                                controls
                                                style={{
                                                    width: "100%",
                                                    padding: "5px"
                                                }}
                                                src={videosContext.srcVideo}
                                                alt=""
                                                className="my-3 border rounded"
                                            />


                                        }
                                    </label>
                                    <label htmlFor="video-upload-video" className="bg-gradient-green p-2 rounded text-white cursor-pointer w-100 text-center rounded-pill">Subir video</label>
                                    <input type="file" id="video-upload-video" className="d-none" ref={inputFileVideoVideo} onChange={handleUploadVideo} />

                                </Col>

                            </Row>
                        </Modal.Body>
                        <Modal.Footer className={videosContext.isEditVideo ? "border-0 justify-content-between" : 'border-0'}>
                            {videosContext.isEditVideo ?
                                <>


                                    <button className="btn-red py-2 px-3 text-white"
                                        onClick={handleDeleteVideo}>
                                        Borrar
                                    </button>
                                    <button className="btn-green py-2 px-3 text-white"
                                        onClick={videosContext.editVideo}>
                                        Actualizar
                                    </button>
                                </>
                                :
                                <button className="btn-green py-2 px-3 text-white"
                                    onClick={videosContext.handeCreateVideo}>
                                    Añadir video
                                </button>
                            }

                        </Modal.Footer>
                    </Modal>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton className="border-0">
                        </Modal.Header>
                        <Modal.Body className="p-0">

                            <Cropper
                                ref={cropperVideo}
                                src={videosContext.srcImage}
                                style={{ height: 400, width: '100%' }}
                                // Cropper.js options
                                viewMode={1}
                                aspectRatio={16 / 9}
                                guides={false}

                            />

                        </Modal.Body>
                        <Modal.Footer className="border-0">
                            <Button className="btn-gradient-green bg-gradient-green border-0" onClick={cropImage}>
                                Subir
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
