import React, { useState, useEffect } from "react";

import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";
import { Tab, Nav, Col, Row } from "react-bootstrap";
import styled from "@emotion/styled";
import { ButtonCustom } from "src/components/ui/ButtonCustom";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  fetchCourse,
  saveCourse,
  resetCoursesErrors,
} from "src/redux/actions/courses/course";
import { fetchBlocks } from "src/redux/actions/courses/blocks";
import { Formik, Form } from "formik";
import MainCourseInfo from "../../components/CourseAcademy/MainCourseInfo";
import CourseBenefitsForm from "../../components/CourseAcademy/CourseBenefitsForm";
import CoursePresentation from "../../components/CourseAcademy/CoursePresentation";
import CourseConfiguration from "../../components/CourseAcademy/CourseConfiguration";
import BlocksCourse from "../../components/CourseAcademy/BlocksCourse";
import CourseStudentsList from "./course/CourseStudentsList";

const ConfigurationCourse = (props) => {
  const [key, setKey] = useState(0);
  const dispatch = useDispatch();
  const courseReducer = useSelector((state) => state.courseReducer);
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
  useEffect(() => {
    if (!courseReducer.isLoading && courseReducer.course) {
      const dispatchFetchBlocks = () => dispatch(fetchBlocks());
      dispatchFetchBlocks();
    }
  }, [courseReducer.isLoading]);
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

    color: null,
  });
  useEffect(() => {
    if (!courseReducer.isLoading && courseReducer.course) {
      setCourseState({
        id: courseReducer.course.id,
        code: courseReducer.course.code,
        title: courseReducer.course.title ? courseReducer.course.title : "",
        subtitle: courseReducer.course.subtitle
          ? courseReducer.course.subtitle
          : "",
        description: courseReducer.course.description
          ? courseReducer.course.description
          : "",
        benefits: courseReducer.course.benefits,
        students: courseReducer.course.students,
        course_price: courseReducer.course.course_price,
        course_language: courseReducer.course.course_language,
        instructor: courseReducer.course.instructor,
        published: courseReducer.course.published,
        color: courseReducer.course.color,
      });
    }
  }, [!courseReducer.isLoading, courseReducer.course]);

  return (
    <Main padding>
      <Filters
        title={courseReducer.course?.title}
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
                        <Nav.Item>
                          <Nav.Link eventKey={3} className="text-grey">
                            <span>ALUMNOS</span>
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
                          <BlocksCourse
                            values={props.values}
                            setFieldValue={props.setFieldValue}
                          />
                        </Tab.Pane>
                        <Tab.Pane eventKey={3} className="text-grey">
                         <CourseStudentsList/>
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
