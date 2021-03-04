import React, { useState } from "react";
import styled from "@emotion/styled";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit, MdInfo } from "react-icons/md";
import { IconContext } from "react-icons";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const EventsCard = (props) => {
  const MySwal = withReactContent(Swal);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCancelEvent = () => {
    MySwal.fire({
      title:
        "Puedes cancelar la clase hasta una hora antes de que empiece, y se te devolverá tu dinero",
      text: "¿Estás seguro de que deseas cancelar la clase?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cancelar",
      cancelButtonText: "Atras",
    }).then((result) => {
      if (result.value) {
      }
    });
  };
  return (
    <>
      <EventItem
        className="my-course d-flex justify-content-between rounded bg-white p-3 shadow cursor-pointer"
        style={{
          height: "120px",
        }}
        onClick={handleShow}
      >
        <div className="my-course d-flex justify-content-between w-100">
          <TitleDiv className="d-flex flex-column justify-content-between  text-break">
            <div className=" text-break">
              <span
                className="font-weight-bold text-break"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Clase de Yoga
              </span>
              <small
                className="text-break"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Ratione commodi, delectus nam quaerat quod error eos enim
                consequatur unde officia? Neque doloribus labore veritatis
                reprehenderit voluptas reiciendis earum ipsa hic.
              </small>
            </div>
            <small
              style={{
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <span className="font-weight-bold">Fecha de inicio:</span>{" "}
              29/9/2020 10:00:00
            </small>
            <small
              style={{
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <span className="font-weight-bold">Fecha de fin:</span> 29/9/2020
              02:00:00
            </small>
          </TitleDiv>
          {/* <div className="d-none d-xl-flex align-items-center justify-content-center flex-column mx-4">
          <span className="h5 m-0 font-weight-normal">{views}</span>
          <small>Visitas</small>
        </div> */}
          <div className="d-flex align-items-center justify-content-center ml-3">
            <IconContext.Provider
              value={{
                size: 23,
                className: "cursor-pointer",
              }}
            >
              <MdInfo />
            </IconContext.Provider>
          </div>
        </div>
      </EventItem>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">Nuevo evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <div className="h5 text-dark">Descripción</div>
            <span className="text-grey">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione
              commodi, delectus nam quaerat quod error eos enim consequatur unde
              officia? Neque doloribus labore veritatis reprehenderit voluptas
              reiciendis earum ipsa hic.
            </span>
          </div>
          <div>
            <span className=" text-dark d-block h6 font-weight-bolder">
              Fecha de inicio
            </span>
            <span className="text-grey">29/9/2020 10:00:00</span>
          </div>
          <div className="d-none d-sm-block m-2"></div>
          <div>
            <span className="text-dark d-block h6 font-weight-bolder">
              Fecha de fin
            </span>
            <span className="text-grey">29/9/2020 02:00:00</span>
          </div>
          <div className="d-none d-sm-block m-2"></div>
          <div>
            <small
              className="text-grey cursor-pointer"
              onClick={handleCancelEvent}
            >
              <u>Quiero cancelar la clase</u>
            </small>
          </div>
          <div className="d-none d-sm-block m-3"></div>
          <div>
            <small className="text-secondary">
              El enlace se desbloqueará una hora antes del inicio
            </small>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <a
            href="#"
            className="btn btn-sm btn-green text-white px-3 py-2 btn-gradient-green btn-green-disabled"
          >
            Ir a la clase online
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
};
const EventItem = styled.div`
  border-bottom: 1px solid #ccc;
  &:last-of-type {
    border: 0;
  }
`;
const TitleDiv = styled.div`
  width: 100%;
`;
export default EventsCard;
