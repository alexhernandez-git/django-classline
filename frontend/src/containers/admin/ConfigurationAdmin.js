import React, { useState, useEffect } from "react";

import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";
import { Tab, Nav, Col, Row } from "react-bootstrap";
import styled from "@emotion/styled";
import MainProgramInfo from "src/components/AdminAcademy/MainProgramInfo";
import ProgramBenefitsForm from "src/components/AdminAcademy/ProgramBenefitsForm";
import ProgramPresentation from "src/components/AdminAcademy/ProgramPresentation";
import ProgramPricing from "src/components/AdminAcademy/ProgramPricing";
import ProgramConfiguration from "src/components/AdminAcademy/ProgramConfiguration";
import { ButtonCustom } from "src/components/ui/ButtonCustom";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProgram, saveProgram } from "src/redux/actions/program";

import { Formik, Form } from "formik";
import { connectStripe } from "../../redux/actions/auth";

const index = (props) => {
  const [key, setKey] = useState(0);
  const dispatch = useDispatch();
  const program = useSelector((state) => state.programReducer.program);

  const router = useParams();

  const [programState, setProgramState] = useState({
    id: null,
    title: "",
    subtitle: "",
    description: "",
    benefits: [],
    are_meetups: false,
    meetups: null,
    are_videos: false,
    videos: null,
    are_courses: false,
    courses: null,
    are_podcasts: false,
    podcasts: null,
    students: null,
    program_price: null,
    program_language: "",
    instructor: {},
    is_published: false,
  });
  useEffect(() => {
    if (program) {
      setProgramState({
        id: program.id,
        title: program.title,
        subtitle: program.subtitle,
        description: program.description,
        benefits: program.benefits,
        are_meetups: program.are_meetups,
        meetups: program.meetups,
        are_videos: program.are_videos,
        videos: program.videos,
        are_courses: program.are_courses,
        courses: program.courses,
        are_podcasts: program.are_podcasts,
        podcasts: program.podcasts,
        students: program.students,
        program_price: program.program_price,
        program_language: program.program_language,
        instructor: program.instructor,
        is_published: program.is_published,
      });
    }
  }, [program]);
  return (
    <Main padding>
      <Filters title="Academia" />
      <ContainerTabs className="container">
        <Formik
          enableReinitialize={true}
          initialValues={programState}
          onSubmit={(values) => {
            const dispatchSaveProgram = (program) =>
              dispatch(saveProgram(program));
            dispatchSaveProgram(values);
          }}
        >
          {(props) => {
            return (
              <Form>
                <div className="d-flex justify-content-end">
                  <ButtonCustom type="submit">Guardar</ButtonCustom>
                </div>
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
                            <span>PRECIO</span>
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link eventKey={2} className="text-grey">
                            <span>CONFIGURACIÓN</span>
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pl-3 pr-3 pb-5">
                      <Tab.Content>
                        <Tab.Pane eventKey={0} className="text-grey">
                          <MainProgramInfo
                            values={props.values}
                            setFieldValue={props.setFieldValue}
                          />
                          <ProgramBenefitsForm values={props.values} />
                          <ProgramPresentation />
                        </Tab.Pane>
                        <Tab.Pane eventKey={1} className="text-grey">
                          <ProgramPricing values={props.values} />
                        </Tab.Pane>

                        <Tab.Pane eventKey={2} className="text-grey">
                          <ProgramConfiguration
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
export default index;
