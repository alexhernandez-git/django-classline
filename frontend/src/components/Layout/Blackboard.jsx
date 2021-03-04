import React, { useState } from 'react';
import "../../../static/assets/styles/components/Layout/Blackboard.scss"
import { FaPlay } from 'react-icons/fa';
import { IconContext } from "react-icons";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
const Blackboard = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <div className="blackboard border-warning position-relative cursor-pointer shadow" onClick={handleShow}>
                <div className="letters text-light text-center d-flex justify-content-center align-items-center">
                    <span className="font-weight-light mt-3">¿Como funciona ClassLine?</span>
                    <IconContext.Provider value={{
                        className: "position-absolute beat",
                        style: {
                            left: '0',
                            right: '0',
                            top: '0',
                            bottom: '0',
                            margin: 'auto'
                        }
                    }}>
                        <div>
                            <FaPlay />
                        </div>
                    </IconContext.Provider>
                </div>
                <div className="whiteboard position-absolute"></div>
                <div className="whiteboard w-1 position-absolute"></div>
                <div className="whiteboard w-2 position-absolute"></div>
                <div className="whiteboard w-3 position-absolute"></div>
                <div className="whiteboard w-4 position-absolute"></div>
                <div className="draft position-absolute"></div>
            </div>

            <Modal show={show} onHide={handleClose} size="xl" centered>
                <Modal.Body className="p-0">
                    <div style={{ width: 'auto', height: 'auto' }}>
                        <ResponsiveEmbed aspectRatio="16by9">
                            <iframe width="1280" height="720" src="https://www.youtube.com/embed/l0s6ZLkV-U0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </ResponsiveEmbed>
                    </div>
                </Modal.Body>

            </Modal>
        </div >

    );
}

export default Blackboard;
