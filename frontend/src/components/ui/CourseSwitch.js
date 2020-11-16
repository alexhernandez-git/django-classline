import styled from "@emotion/styled";
import React, { useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { textEllipsis } from "src/components/ui/TextEllipsis";
import QuestionsLecture from "./QuestionsLecture";

const CourseSwitch = ({ itemPlaying }) => {
  const [key, setKey] = useState(0);
  const playingCourseReducer = useSelector(
    (state) => state.playingCourseReducer
  );
  const course = playingCourseReducer.course;
  return (
    <ContainerTabs className="mt-3">
      <Tab.Container
        id="left-tabs-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        defaultActiveKey="first"
        className=""
      >
        <div className="mb-3">
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
              <Nav.Link eventKey={0}>
                <span>PREGUNTAS Y RESPUESTAS</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={1}>
                <span>ACERCA DEL CURSO</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <div>
          <Tab.Content>
            <Tab.Pane eventKey={0}>
              <QuestionsLecture itemPlaying={itemPlaying} />
            </Tab.Pane>
            <Tab.Pane eventKey={1}>
              <AboutContainer>
                <div className="img-container">
                  <img src={course.picture} alt="" />
                </div>
                <div className="info-container">
                  <div>{course.title}</div>
                  <hr />
                  <div>
                    <small>{course.subtitle}</small>
                  </div>
                  <br />
                  {course.description && (
                    <div>
                      <small>{course.description}</small>
                    </div>
                  )}
                </div>
              </AboutContainer>
            </Tab.Pane>
          </Tab.Content>
        </div>
      </Tab.Container>
    </ContainerTabs>
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
const AboutContainer = styled.div`
  word-break: break-all;
  overflow: hidden;
  max-width: 60rem;
  margin: 3rem auto;

  .img-container {
    max-width: 20rem;
    img {
      border-radius: 1rem;
      width: 100%;
    }
  }
  .info-container {
    white-space: pre-line;
    width: 100%;
  }
  @media only screen and (min-width: 480px) {
    display: grid;
    grid-template-columns: 20rem 1fr;
    .info-container {
      margin-left: 1rem;
    }
  }
`;

export default CourseSwitch;
