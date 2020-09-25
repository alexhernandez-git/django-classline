import React, { useRef, useState, useEffect, useContext } from "react";

import { Form, Row, Col } from "react-bootstrap";

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
import { Link } from "react-router-dom";
const ProgramConfiguration = (props) => {
  const MySwal = withReactContent(Swal);

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
            <span className="m-0 font-weight-normal">Cursos</span>
          </Col>

          <Col
            lg={{ offset: 1, span: 6 }}
            className="d-flex justify-content-center d-lg-block"
          >
            <Checkbox name="are_playlists" />
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
            <span className="m-0 font-weight-normal">Clases online</span>
          </Col>

          <Col
            lg={{ offset: 1, span: 6 }}
            className="d-flex justify-content-center d-lg-block"
          >
            <Checkbox name="are_meetups" />
          </Col>
        </Row>
        <Row className="">
          <Col
            lg={{ span: 4 }}
            className="text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Documentos</span>
          </Col>

          <Col
            lg={{ offset: 1, span: 6 }}
            className="d-flex justify-content-center d-lg-block"
          >
            <Checkbox name="are_docs" />
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

export default ProgramConfiguration;
