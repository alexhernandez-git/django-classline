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
  publishCourse,
  cancelPublishedCourse,
  publishCourseProgram,
  cancelPublishedProgramCourse,
  removeCourse,
} from "src/redux/actions/courses/course";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link, useHistory, useParams } from "react-router-dom";
import Prices from "static/data/prices/eur_prices_course";
import SelectPrice from "./SelectPrice";
import { Field } from "formik";
import useOutsideClick from "../../hooks/useOutsideClick";
import styled from "@emotion/styled";
import { SketchPicker } from "react-color";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

const CourseConfiguration = (props) => {
  const { color, offer_persentage } = props.values;
  const { setFieldValue } = props;

  const MySwal = withReactContent(Swal);
  const { program } = useParams();
  const dispatch = useDispatch();
  const courseReducer = useSelector((state) => state.courseReducer);
  const authReducer = useSelector((state) => state.authReducer);
  const history = useHistory();
  const handlePublishCourse = () => {
    const dispatchPublishCourse = () => dispatch(publishCourse());
    dispatchPublishCourse();
  };

  const handleCancelPublishedCourse = () => {
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
        const dispatchCancelPublishedCourse = () =>
          dispatch(cancelPublishedCourse());
        dispatchCancelPublishedCourse();
      }
    });
  };
  const handleRemoveCourse = () => {
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
        const dispatchRemoveCourse = (history) =>
          dispatch(removeCourse(history));
        dispatchRemoveCourse(history);
      }
    });
  };
  const handlePublishProgramCourse = () => {
    const dispatchPublishProgram = () => dispatch(publishCourseProgram());
    dispatchPublishProgram();
  };
  const handleCancelPublishProgramCourse = () => {
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
        const dispatchCancelPublishedProgramCourse = () =>
          dispatch(cancelPublishedProgramCourse());
        dispatchCancelPublishedProgramCourse();
      }
    });
  };
  const handleChangeComplete = (color) => {
    setFieldValue("color", color.hex);
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
  const handleChangeSlider = (value) => {
    setFieldValue("offer_persentage", value);
  };
  return (
    <>
      {/* <div className="bg-white border p-3 rounded my-2 mb-4 pb-5">
        <span className="d-none d-md-block">Configuración del course</span>

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

      </div> */}
      <div className="bg-white border p-3 rounded my-2 mb-4">
        <span className="d-none d-md-block">Ponle un color a tu curso</span>

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
                  style={{ background: color ? color : "#14171c" }}
                ></div>
              </DemoColor>
              <div ref={colorRef}>
                {showColor && (
                  <div className="color-picker-div">
                    <SketchPicker
                      color={{ hex: color ? color : "#14171c" }}
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
        <span className="d-none d-md-block">Ponle un precio a tu curso</span>

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
      {!courseReducer.isLoading && courseReducer.course.course_price && (
        <div className="bg-white border p-3 rounded my-2 mb-4">
          <span className="d-none d-md-block">Pon el curso en oferta</span>

          <Row className="">
            <Col
              lg={{ span: 4 }}
              className="text-center d-lg-flex justify-content-end align-items-center"
            >
              <span className="m-0 font-weight-normal">Descuento en %</span>
            </Col>

            <Col lg={{ offset: 1, span: 6 }}>
              <span className="mb-2 d-block text-right">
                {offer_persentage}%
              </span>
              <div className="mb-2">
                <Slider
                  value={offer_persentage}
                  onChange={handleChangeSlider}
                  max={90}
                  handleStyle={{ background: "#000" }}
                  trackStyle={{ background: "#000" }}
                />
              </div>
              <span>
                Precio final:{" "}
                {(
                  courseReducer.course.course_price.value -
                  (courseReducer.course.course_price.value / 100) *
                    offer_persentage
                ).toFixed(2)}
                €
              </span>
            </Col>
          </Row>
        </div>
      )}
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
            <span className="m-0 font-weight-normal">
              Publicar en la academia
            </span>
          </Col>

          <Col sm={{ offset: 1, span: 6 }}>
            {courseReducer.course &&
            courseReducer.course.published_in_program ? (
              <div className="d-sm-flex justify-content-between">
                <span className="text-secondary mr-3 font-weight-bold text-center d-block d-sm-inline">
                  Publicar
                </span>
                <ButtonCustomError
                  type="button"
                  onClick={handleCancelPublishProgramCourse}
                >
                  Despublicar
                </ButtonCustomError>
              </div>
            ) : (
              <ButtonCustomSuccess
                type="button"
                onClick={handlePublishProgramCourse}
              >
                Publicar
              </ButtonCustomSuccess>
            )}
            {courseReducer.publish_program_error &&
              courseReducer.publish_program_error.data.non_field_errors &&
              courseReducer.publish_program_error.data.non_field_errors.map(
                (error) => <small className="d-block text-red">{error}</small>
              )}
            {courseReducer.canceling_published_error &&
              courseReducer.canceling_published_error.data.non_field_errors &&
              courseReducer.canceling_published_error.data.non_field_errors.map(
                (error) => <small className="d-block text-red">{error}</small>
              )}
          </Col>
        </Row>

        <Row className="mb-4">
          <Col
            sm={{ span: 4 }}
            className="text-center d-sm-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">
              Publicar en el marketplace
            </span>
          </Col>

          <Col sm={{ offset: 1, span: 6 }}>
            {courseReducer.course && courseReducer.course.published ? (
              <div className="d-sm-flex justify-content-between d-block">
                <span className="text-secondary mr-3 font-weight-bold text-center d-block d-sm-inline">
                  Publicada
                </span>
                <ButtonCustomError
                  type="button"
                  onClick={handleCancelPublishedCourse}
                >
                  Despublicar
                </ButtonCustomError>
              </div>
            ) : (
              <ButtonCustomSuccess type="button" onClick={handlePublishCourse}>
                Publicar
              </ButtonCustomSuccess>
            )}
            {courseReducer.publish_error &&
              courseReducer.publish_error.data.non_field_errors &&
              courseReducer.publish_error.data.non_field_errors.map((error) => (
                <small className="d-block text-red">{error}</small>
              ))}
            {courseReducer.canceling_published_error &&
              courseReducer.canceling_published_error.data.non_field_errors &&
              courseReducer.canceling_published_error.data.non_field_errors.map(
                (error) => <small className="d-block text-red">{error}</small>
              )}
          </Col>
        </Row>
        <Row className="mb-4">
          <Col
            sm={{ span: 4 }}
            className="text-center d-sm-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Eliminar el curso</span>
          </Col>

          <Col sm={{ offset: 1, span: 6 }}>
            <ButtonCustomError type="button" onClick={handleRemoveCourse}>
              Eliminar
            </ButtonCustomError>

            {courseReducer.removing_course_error &&
              courseReducer.removing_course_error.data.message && (
                <small className="d-block text-red">
                  {courseReducer.removing_course_error.data.message}
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
export default CourseConfiguration;
