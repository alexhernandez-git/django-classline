import React, { useRef, useState, useEffect, useContext } from "react";

import { Form, Row, Col } from "react-bootstrap";

import Select from "react-select";
import Lenguages from "static/data/languages";
import {
  ButtonStyle,
  ButtonCustom,
  ButtonCustomSuccess,
  ButtonCustomError,
} from "../../containers/admin/packs/node_modules/src/components/ui/ButtonCustom";
import Checkbox from "src/components/ui/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import {

  publishPack,
  cancelPublishedPack,
  removePack,
} from "src/redux/actions/pack";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link, useHistory, useParams } from "react-router-dom";
import Prices from "static/data/prices/eur_prices_pack";
import SelectPrice from "./SelectPrice";
import { Field } from "formik";

const CourseConfiguration = (props) => {
  const MySwal = withReactContent(Swal);
  const { program } = useParams();
  const dispatch = useDispatch();
  const packReducer = useSelector((state) => state.packReducer);
  const authReducer = useSelector((state) => state.authReducer);
  const history = useHistory()
  const handlePublishPack = () => {
    const dispatchPublishPack = () => dispatch(publishPack());
    dispatchPublishPack();
  };

  const handleCancelPublishedPack = () => {
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
        const dispatchCancelPublishedPack = () =>
          dispatch(cancelPublishedPack());
        dispatchCancelPublishedPack();
      }
    });
  };
  const handleRemovePack = () => {
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
        const dispatchRemovePack = (history) => dispatch(removePack(history));
        dispatchRemovePack(history);
      }
    });
  };
  return (
    <>
      <div className="bg-white border p-3 rounded my-2 mb-4 pb-5">
        <span className="d-none d-md-block">Configuración del pack</span>

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
{/* 
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
        </Row> */}

        <Row className="">
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
{/*      
        <Row className="">
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
        </Row> */}
      </div>
      <div className="bg-white border p-3 rounded my-2 mb-4">
      <span className="d-none d-md-block">Ponle un precio a tu pack</span>

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
        <span className="d-none d-md-block">Acciones</span>

        
        <Row className="mb-4">
          <Col
            sm={{ span: 4 }}
            className="text-center d-sm-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Publicar el pack</span>
          </Col>

          <Col sm={{ offset: 1, span: 6 }}>
            {packReducer.pack && packReducer.pack.published ? (
              <div className="d-sm-flex justify-content-between d-block">
                <span className="text-secondary mr-3 font-weight-bold text-center d-block d-sm-inline">
                  Publicada
                </span>
                <ButtonCustomError
                  type="button"
                  onClick={handleCancelPublishedPack}
                >
                  Despublicar
                </ButtonCustomError>
              </div>
            ) : (
              <ButtonCustomSuccess type="button" onClick={handlePublishPack}>
                Publicar
              </ButtonCustomSuccess>
            )}
            {packReducer.publish_error &&
              packReducer.publish_error.data.non_field_errors &&
              packReducer.publish_error.data.non_field_errors.map(
                (error) => <small className="d-block text-red">{error}</small>
              )}
            {packReducer.canceling_published_error &&
              packReducer.canceling_published_error.data.non_field_errors &&
              packReducer.canceling_published_error.data.non_field_errors.map(
                (error) => <small className="d-block text-red">{error}</small>
              )}
          </Col>
        </Row>
        <Row className="mb-4">
          <Col
            sm={{ span: 4 }}
            className="text-center d-sm-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Eliminar el pack</span>
          </Col>

          <Col sm={{ offset: 1, span: 6 }}>
            <ButtonCustomError type="button" onClick={handleRemovePack}>
              Eliminar
            </ButtonCustomError>

            {packReducer.removing_pack_error &&
              packReducer.removing_pack_error.data.message && (
                <small className="d-block text-red">
                  {packReducer.removing_pack_error.data.message}
                </small>
              )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CourseConfiguration;