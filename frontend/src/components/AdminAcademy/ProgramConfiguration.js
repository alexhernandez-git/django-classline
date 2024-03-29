import React, { useRef, useState, useEffect, useContext } from "react";

import { Form, Row, Col, Modal } from "react-bootstrap";

import Select from "react-select";
import Lenguages from "static/data/languages";
import {
  ButtonStyle,
  ButtonCustom,
  ButtonCustomSuccess,
  ButtonCustomError,
} from "src/components/ui/ButtonCustom";
import Checkbox from "src/components/ui/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  activeProgram,
  cancelActivedProgram,
  publishProgram,
  cancelPublishedProgram,
  removeProgram,
} from "src/redux/actions/program";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link, useParams } from "react-router-dom";
import {
  activeBookingProgram,
  cancelBookingProgram,
} from "../../redux/actions/program";
import Prices from "static/data/prices/eur_prices_program";
import { Field } from "formik";
import SelectPrice from "./SelectPrice";
import { SketchPicker } from "react-color";
import styled from "@emotion/styled";
import useOutsideClick from "../../hooks/useOutsideClick";

const ProgramConfiguration = (props) => {
  const { brand_color } = props.values;
  const { setFieldValue } = props;
  const MySwal = withReactContent(Swal);
  const { program } = useParams();
  const dispatch = useDispatch();
  const programReducer = useSelector((state) => state.programReducer);
  const authReducer = useSelector((state) => state.authReducer);
  const handleActiveProgram = () => {
    const dispatchActiveProgram = () => dispatch(activeProgram());
    dispatchActiveProgram();
  };
  const handleCancelActivedProgram = () => {
    MySwal.fire({
      title: "Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Desactivar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        const dispatchCancelActivedProgram = () =>
          dispatch(cancelActivedProgram());
        dispatchCancelActivedProgram();
      }
    });
  };
  const handlePublishProgram = () => {
    const dispatchPublishProgram = () => dispatch(publishProgram());
    dispatchPublishProgram();
  };
  const handleActiveBooking = () => {
    const dispatchActiveBooking = () => dispatch(activeBookingProgram());
    dispatchActiveBooking();
  };
  const handleCancelPublishedProgram = () => {
    MySwal.fire({
      title: "Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Despublicar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        const dispatchCancelPublishedProgram = () =>
          dispatch(cancelPublishedProgram());
        dispatchCancelPublishedProgram();
      }
    });
  };
  const handleCancelBooking = () => {
    MySwal.fire({
      title: "Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Desactivar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        const dispatchCancelBooking = () => dispatch(cancelBookingProgram());
        dispatchCancelBooking();
      }
    });
  };
  const handleRemoveProgram = () => {
    MySwal.fire({
      title: "Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        const dispatchRemoveProgram = () => dispatch(removeProgram());
        dispatchRemoveProgram();
      }
    });
  };

  const handleChangeComplete = (color) => {
    setFieldValue("brand_color", color.hex);
  };
  const [showColor, setShowColor] = useState(false);
  const handleCloseColor = () => {
    setShowColor(false);
  };
  const handleShowColor = () => {
    setShowColor(true);
  };
  const colorRef = useRef();

  useOutsideClick(colorRef, () => {
    if (showColor) {
      handleCloseColor(false);
    }
  });
  return (
    <>
      <div className="bg-white border p-3 rounded my-2 mb-4 pb-5">
        <span className="d-none d-md-block">Configuración de la academia</span>

        <Row className="mb-5">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Videos</span>
          </Col>

          <Col
            lg={{ offset: 1, span: 6 }}
            className="d-flex justify-content-center d-lg-block"
          >
            <Checkbox name="are_videos" />
          </Col>
        </Row>

        <Row className="mb-5">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Playlists</span>
          </Col>

          <Col
            lg={{ offset: 1, span: 6 }}
            className="d-flex justify-content-center d-lg-block"
          >
            <Checkbox name="are_admin_playlists" />
          </Col>
        </Row>

        <Row className="mb-5">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Podcasts</span>
          </Col>

          <Col
            lg={{ offset: 1, span: 6 }}
            className="d-flex justify-content-center d-lg-block"
          >
            <Checkbox name="are_podcasts" />
          </Col>
        </Row>
        <Row className="mb-5">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Eventos</span>
          </Col>

          <Col
            lg={{ offset: 1, span: 6 }}
            className="d-flex justify-content-center d-lg-block"
          >
            <Checkbox name="are_meetups" />
          </Col>
        </Row>
        <Row className="mb-5">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Recursos</span>
          </Col>

          <Col
            lg={{ offset: 1, span: 6 }}
            className="d-flex justify-content-center d-lg-block"
          >
            <Checkbox name="are_docs" />
          </Col>
        </Row>
        <Row className="">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Foro</span>
          </Col>

          <Col
            lg={{ offset: 1, span: 6 }}
            className="d-flex justify-content-center d-lg-block"
          >
            <Checkbox name="are_forum" />
          </Col>
        </Row>
        {/* <Row className="mb-5">
                    <Col sm={{ span: 4 }} className="text-center d-sm-flex justify-content-end align-items-center">
                        <span className="m-0 font-weight-normal">Comunidad</span>
                    </Col>

                    <Col sm={{ offset: 1, span: 6 }}>
                        <Checkbox active={false} />

                    </Col>
                </Row> */}
      </div>
      <div className="bg-white border p-3 rounded my-2 mb-4">
        <span className="d-none d-md-block">Ponle un color a tu programa</span>

        <Row className="">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Color</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            <ColorPickerDiv>
              <DemoColor onClick={handleShowColor}>
                <div
                  className="color-div"
                  style={{ background: brand_color ? brand_color : "#323840" }}
                ></div>
              </DemoColor>
              <div ref={colorRef}>
                {showColor && (
                  <div className="color-picker-div">
                    <SketchPicker
                      color={{ hex: brand_color ? brand_color : "#323840" }}
                      onChange={handleChangeComplete}
                    />
                  </div>
                )}
              </div>
            </ColorPickerDiv>
          </Col>
        </Row>
      </div>
      <div className="bg-white border p-3 rounded my-2 mb-4">
        <span className="d-none d-md-block">Ponle un precio a tu programa</span>

        <Row className="">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Precio</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            <Form.Group controlId="formGroupName">
              <Field name="lang" options={Prices} component={SelectPrice} />
            </Form.Group>
          </Col>
        </Row>
      </div>
      <div className="bg-white border p-3 rounded my-2 mb-4">
        <span className="d-none d-md-block">Conectar con stripe</span>

        <Row className="mb-4">
          <Col
            sm={{ span: 4 }}
            className="text-center d-sm-flex justify-content-end align-items-center"
          >
            {authReducer.user.profile.stripe_account_id == null ||
            authReducer.user.profile.stripe_account_id == undefined ? (
              <>
                <span className="m-0 font-weight-normal">
                  Conectar con Stripe
                </span>
              </>
            ) : (
              <>
                <span className="m-0 font-weight-normal">
                  Panel de control de pagos
                </span>
              </>
            )}
          </Col>

          <Col sm={{ offset: 1, span: 6 }}>
            {authReducer.user.profile.stripe_account_id == null ||
            authReducer.user.profile.stripe_account_id == undefined ? (
              <>
                <Link
                  to={`/myzone/instructor`}
                  target="_blank"
                  className="connect-button"
                >
                  {/* prod */}
                  {/* ca_HmRkLTjyLDqt32B5GRlzOhlqeH4ry79e */}
                  {/* dev */}
                  {/* ca_HmRky5LBHShFfC92Xzjsz0Mj82piwIiy */}
                  <ButtonCustom type="button">
                    Ve a la configuración de instructor
                  </ButtonCustom>
                </Link>
              </>
            ) : (
              <>
                {" "}
                <a
                  href={authReducer.user.profile.stripe_dashboard_url}
                  target="_blank"
                >
                  <ButtonCustom type="button">
                    Ver Panel de Control
                  </ButtonCustom>
                </a>
              </>
            )}
          </Col>
        </Row>
      </div>
      <div className="bg-white border p-3 rounded my-2 mb-4">
        <span className="d-none d-md-block">Reserva de eventos</span>
        <Row className="mb-4">
          <Col
            sm={{ span: 4 }}
            className="text-center d-sm-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">
              Activar la reserva de eventos
            </span>
          </Col>

          <Col sm={{ offset: 1, span: 6 }}>
            {programReducer.program && programReducer.program.event_booking ? (
              <div className="d-sm-flex justify-content-between d-block">
                <span className="text-secondary mr-3 font-weight-bold text-center d-block d-sm-inline">
                  Activada
                </span>
                <ButtonCustomError type="button" onClick={handleCancelBooking}>
                  Desactivar
                </ButtonCustomError>
              </div>
            ) : (
              <ButtonCustomSuccess type="button" onClick={handleActiveBooking}>
                Activar
              </ButtonCustomSuccess>
            )}
            {programReducer.active_booking_error &&
              programReducer.active_booking_error.data.non_field_errors &&
              programReducer.active_booking_error.data.non_field_errors.map(
                (error) => <small className="d-block text-red">{error}</small>
              )}
            {programReducer.canceling_booking_error &&
              programReducer.canceling_booking_error.data.non_field_errors &&
              programReducer.canceling_booking_error.data.non_field_errors.map(
                (error) => <small className="d-block text-red">{error}</small>
              )}
          </Col>
        </Row>
        {programReducer.program && programReducer.program.event_booking && (
          <>
            <Row className="mb-4">
              <Col
                sm={{ span: 4 }}
                className="text-center d-sm-flex justify-content-end align-items-center"
              >
                <span className="m-0 font-weight-normal">Enlace</span>
              </Col>

              <Col sm={{ offset: 1, span: 6 }} className="text-break">
                <a target="_blank" href={`/academy/${program}/book-class/`}>
                  https://classlineacademy.com/academy/{program}/book-class/
                </a>
              </Col>
            </Row>
            <Row className="mb-5">
              <Col
                lg={{ span: 4 }}
                className="text-center d-lg-flex justify-content-end align-items-center"
              >
                <span className="m-0 font-weight-normal">
                  Mostrar calendario en la pagina de acceso
                </span>
              </Col>

              <Col
                lg={{ offset: 1, span: 6 }}
                className="d-flex justify-content-center d-lg-block"
              >
                <Checkbox name="event_booking_calendar" />
              </Col>
            </Row>
          </>
        )}
      </div>
      <div className="bg-white border p-3 rounded my-2 mb-4">
        <span className="d-none d-md-block">Venta de Packs</span>

        <Row className="mb-4">
          <Col
            sm={{ span: 4 }}
            className="text-center d-sm-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Enlace</span>
          </Col>

          <Col sm={{ offset: 1, span: 6 }} className="text-break">
            <a target="_blank" href={`/academy/${program}/packs/`}>
              https://classlineacademy.com/academy/{program}/packs/
            </a>
          </Col>
        </Row>
      </div>
      <div className="bg-white border p-3 rounded my-2 mb-4">
        <span className="d-none d-md-block">Venta de Cursos</span>

        <Row className="mb-4">
          <Col
            sm={{ span: 4 }}
            className="text-center d-sm-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Enlace</span>
          </Col>

          <Col sm={{ offset: 1, span: 6 }} className="text-break">
            <a target="_blank" href={`/academy/${program}/courses-list/`}>
              https://classlineacademy.com/academy/{program}/courses-list
            </a>
          </Col>
        </Row>
      </div>
      <div className="bg-white border p-3 rounded my-2 mb-4">
        <span className="d-none d-md-block">Acciones</span>

        <Row className="mb-4">
          <Col
            sm={{ span: 4 }}
            className="text-center d-sm-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Activar la academia</span>
          </Col>

          <Col sm={{ offset: 1, span: 6 }}>
            {programReducer.program && programReducer.program.actived ? (
              <div className="d-sm-flex justify-content-between">
                <span className="text-secondary mr-3 font-weight-bold text-center d-block d-sm-inline">
                  Activada
                </span>
                <ButtonCustomError
                  type="button"
                  onClick={handleCancelActivedProgram}
                >
                  Desactivar
                </ButtonCustomError>
              </div>
            ) : (
              <ButtonCustomSuccess type="button" onClick={handleActiveProgram}>
                Activar
              </ButtonCustomSuccess>
            )}
            {programReducer.active_error &&
              programReducer.active_error.data.non_field_errors &&
              programReducer.active_error.data.non_field_errors.map((error) => (
                <small className="d-block text-red">{error}</small>
              ))}
            {programReducer.canceling_actived_error &&
              programReducer.canceling_actived_error.data.non_field_errors &&
              programReducer.canceling_actived_error.data.non_field_errors.map(
                (error) => <small className="d-block text-red">{error}</small>
              )}
          </Col>
        </Row>
        <Row className="mb-4">
          <Col
            sm={{ span: 4 }}
            className="text-center d-sm-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Publicar la academia</span>
          </Col>

          <Col sm={{ offset: 1, span: 6 }}>
            {programReducer.program && programReducer.program.published ? (
              <div className="d-sm-flex justify-content-between d-block">
                <span className="text-secondary mr-3 font-weight-bold text-center d-block d-sm-inline">
                  Publicada
                </span>
                <ButtonCustomError
                  type="button"
                  onClick={handleCancelPublishedProgram}
                >
                  Despublicar
                </ButtonCustomError>
              </div>
            ) : (
              <ButtonCustomSuccess type="button" onClick={handlePublishProgram}>
                Publicar
              </ButtonCustomSuccess>
            )}
            {programReducer.publish_error &&
              programReducer.publish_error.data.non_field_errors &&
              programReducer.publish_error.data.non_field_errors.map(
                (error) => <small className="d-block text-red">{error}</small>
              )}
            {programReducer.canceling_published_error &&
              programReducer.canceling_published_error.data.non_field_errors &&
              programReducer.canceling_published_error.data.non_field_errors.map(
                (error) => <small className="d-block text-red">{error}</small>
              )}
          </Col>
        </Row>
        <Row className="mb-4">
          <Col
            sm={{ span: 4 }}
            className="text-center d-sm-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Eliminar la academia</span>
          </Col>

          <Col sm={{ offset: 1, span: 6 }}>
            <ButtonCustomError type="button" onClick={handleRemoveProgram}>
              Eliminar
            </ButtonCustomError>

            {programReducer.removing_program_error &&
              programReducer.removing_program_error.data.message && (
                <small className="d-block text-red">
                  {programReducer.removing_program_error.data.message}
                </small>
              )}
          </Col>
        </Row>
      </div>
    </>
  );
};

const DemoColor = styled.div`
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  padding: 1rem;
  max-width: 5rem;
  border-radius: 1rem;
  cursor: pointer;
  .color-div {
    padding: 1rem;
  }
  @media screen and (max-width: 991px) {
    margin: auto;
  }
`;
const ColorPickerDiv = styled.div`
  position: relative;
  z-index: 50;
  .color-picker-div {
    position: absolute;
    @media screen and (max-width: 991px) {
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
`;

export default ProgramConfiguration;
