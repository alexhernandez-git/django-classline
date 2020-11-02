import React, { useState, useEffect } from "react";

import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";
import { Tab, Nav, Col, Row } from "react-bootstrap";
import styled from "@emotion/styled";
import { ButtonCustom } from "src/components/ui/ButtonCustom";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchCourse,
  saveCourse,
  resetCoursesErrors,
} from "src/redux/actions/courses/course";

import { Formik, Form } from "formik";
import MainCourseInfo from "../../components/CourseAcademy/MainCourseInfo";
import CourseBenefitsForm from "../../components/CourseAcademy/CourseBenefitsForm";
import CoursePresentation from "../../components/CourseAcademy/CoursePresentation";
import CourseConfiguration from "../../components/CourseAcademy/CourseConfiguration";
import BlocksCourse from "../../components/CourseAcademy/BlocksCourse";
import BlocksCourseRoutes from "../../components/CourseAcademy/BlocksCourseRoutes";

const ConfigurationCourse = (props) => {
  const [key, setKey] = useState(0);
  const dispatch = useDispatch();
  const courseObject = useSelector((state) => state.courseReducer.course);
  const programReducer = useSelector((state) => state.programReducer);

  const { program, course } = useParams();

  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program && course) {
      const dispatchFetchCourses = (course) => dispatch(fetchCourse(course));
      dispatchFetchCourses(course);
      const dispatchResetCoursesErrors = () => dispatch(resetCoursesErrors());
      dispatchResetCoursesErrors();
    }
  }, [programReducer.isLoading]);
  const [courseState, setCourseState] = useState({
    id: null,
    code: null,
    title: "",
    subtitle: "",
    description: "",
    benefits: [],
    students: null,
    course_price: null,
    course_language: "",
    instructor: {},
    published: false,

    brand_color: null,
  });
  useEffect(() => {
    if (courseObject) {
      setCourseState({
        id: courseObject.id,
        code: courseObject.code,
        title: courseObject.title,
        subtitle: courseObject.subtitle,
        description: courseObject.description,
        benefits: courseObject.benefits,
        students: courseObject.students,
        course_price: courseObject.course_price,
        course_language: courseObject.course_language,
        instructor: courseObject.instructor,
        published: courseObject.published,
        brand_color: courseObject.brand_color,
      });
    }
  }, [courseObject]);
  return (
    <Main padding>
      <Filters
        title={courseObject?.title}
        back="Volver"
        to={`/academy/${program}/admin/courses`}
      />
      <ContainerTabs className="container">
        <Formik
          enableReinitialize={true}
          initialValues={courseState}
          onSubmit={(values) => {
            const dispatchSaveCourse = (course) => dispatch(saveCourse(course));
            dispatchSaveCourse(values);
          }}
        >
          {(props) => {
            return (
              <Form>
                <div className="d-flex justify-content-end">
                  <ButtonCustom type="submit">Guardar</ButtonCustom>
                </div>
                <div className="d-block d-lg-none m-4"></div>

                <Tab.Container
                  id="left-tabs-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  defaultActiveKey="first"
                  className="p-3"
                >
                  <Row className="mb-3">
                    <Col sm={12}>
                      <Nav
                        style={{
                          whiteSpace: "nowrap",
                          position: "relative",
                          overflowX: "auto",
                          overflowY: "hidden",
                          width: "100%",
                          flexWrap: "nowrap",
                        }}
                      >
                        <Nav.Item>
                          <Nav.Link eventKey={0} className="text-grey">
                            <span>INFORMACIÓN PRINCIPAL</span>
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link eventKey={1} className="text-grey">
                            <span>CONFIGURACIÓN</span>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey={2} className="text-grey">
                            <span>CONTENIDO</span>
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pl-3 pr-3 pb-5">
                      <Tab.Content>
                        <Tab.Pane eventKey={0} className="text-grey">
                          <MainCourseInfo
                            values={props.values}
                            setFieldValue={props.setFieldValue}
                          />
                          <CourseBenefitsForm values={props.values} />
                          <CoursePresentation />
                        </Tab.Pane>

                        <Tab.Pane eventKey={1} className="text-grey">
                          <CourseConfiguration
                            values={props.values}
                            setFieldValue={props.setFieldValue}
                          />
                        </Tab.Pane>

                        <Tab.Pane eventKey={2} className="text-grey">
                          <BlocksCourseRoutes
                            values={props.values}
                            setFieldValue={props.setFieldValue}
                          />
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
              </Form>
            );
          }}
        </Formik>
      </ContainerTabs>
    </Main>
  );
};
const ContainerTabs = styled.div`
  .nav-link.active {
    border-bottom: 1px solid #212529;
    color: #212529 !important;
  }
  .nav-link:hover {
    color: #212529 !important;
  }
  .nav-link {
    color: #212529 !important;
    padding: 0rem;
    margin-left: 15px;
  }

  .nav > .nav-item:first-of-type > .nav-link {
    margin-left: 0;
  }
  @media only screen and (min-width: 768px) {
    .nav-link {
      padding: 0.2rem;
      margin-left: 20px;
    }
  }
`;
export default ConfigurationCourse;
