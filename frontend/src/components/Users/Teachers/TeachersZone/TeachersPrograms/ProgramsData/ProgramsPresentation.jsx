import React, { useRef, useState, useEffect, useContext } from 'react';
import { AppContext } from "src/context/AppContext"
import 'cropperjs/dist/cropper.css';
import { Form, Row, Col, Modal, Button } from 'react-bootstrap'
import Cropper from 'react-cropper';
const TeachersProfilePresentation = props => {
    const { setFieldValue, values } = props

    const cropper = useRef(null);
    const inputFileVideo = useRef(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [srcImage, setSrcImage] = useState(null);

    const [cropResult, setCropResult] = useState('../../../../../../static/assets/img/no-foto.png');

    const [fileName, setFileName] = useState('')
    const inputFileImg = useRef(null);
    const handleUploadImage = (e) => {
        e.preventDefault()
        handleShow()

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        setFileName(files[0].name);

        const reader = new FileReader();

        reader.onload = () => {
            setSrcImage(reader.result);

        };
        reader.readAsDataURL(files[0]);
    }
    const cropImage = () => {

        if (typeof cropper.current.getCroppedCanvas() === "undefined") {
            return;
        }
        setCropResult(cropper.current.getCroppedCanvas().toDataURL());

        var file = dataURLtoFile(cropper.current.getCroppedCanvas().toDataURL(),
            Math.random().toString(36) + fileName)
        if (file.size < 2000000) {

            setFieldValue("picture", file)
        } else {
            alert('Esta imágen no puede ser mayor a 2MB')
        }

        handleClose()
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

    const [srcVideo, setSrcVideo] = useState(null);

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
            setSrcVideo(reader.result)

        };

        if (files[0].size > 500000000) {
            alert('El tamaño del video es muy grande');
        } else if (files[0].type != 'video/mp4') {
            alert('El htmlFormato tiene que ser .mp4');

        } else {

            reader.readAsDataURL(files[0]);
            setFieldValue("video_presentation", files[0])
        }

    }

    return (
        <div className="bg-white shadow p-3 rounded my-4">
            <span className="d-none d-md-block">Presentación</span>

            <Row className="video-upload mb-4">

                <Col lg={{ span: 4 }} className="text-center d-lg-flex justify-content-end align-items-center">
                    <span className="h5 m-0 font-weight-normal">Imagen</span>
                </Col>
                <Col lg={{ offset: 1, span: 6 }}>
                    <label htmlFor="img-upload" className="cursor-pointer w-100">

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
                    <label htmlFor="img-upload" className="bg-gradient-green p-2 rounded text-white cursor-pointer w-100 text-center rounded-pill">Subir imágen</label>
                    <input type="file" id="img-upload" className="d-none" ref={inputFileImg} placeholder="Imagen" onChange={handleUploadImage} />

                </Col>

            </Row>
            <Row className="video-upload">

                <Col lg={{ span: 4 }} className="text-center d-lg-flex justify-content-end align-items-center">
                    <span className="h5 m-0 font-weight-normal">Video de presentación</span>
                </Col>
                <Col lg={{ offset: 1, span: 6 }}>
                    <label htmlFor="video-upload" className="cursor-pointer w-100">

                        {srcVideo == null ?
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

                            :
                            <video
                                controls
                                style={{
                                    width: "100%",
                                    padding: "5px"
                                }}
                                src={srcVideo}
                                alt=""
                                className="my-3 border rounded"
                            />


                        }
                    </label>
                    <label htmlFor="video-upload" className="bg-gradient-green p-2 rounded text-white cursor-pointer w-100 text-center rounded-pill">Subir video</label>
                    <input type="file" id="video-upload" className="d-none" ref={inputFileVideo} placeholder="Imagen" onChange={handleUploadVideo} />

                </Col>

            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="border-0">
                </Modal.Header>
                <Modal.Body className="p-0">

                    <Cropper
                        ref={cropper}
                        src={srcImage}
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


        </div >
    );
}

export default TeachersProfilePresentation;
