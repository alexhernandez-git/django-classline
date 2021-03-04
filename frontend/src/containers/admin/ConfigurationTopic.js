import React, { useState, useEffect } from "react";

import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";
import { Tab, Nav, Col, Row } from "react-bootstrap";
import styled from "@emotion/styled";
import MainTopicInfo from "src/components/TopicAcademy/MainTopicInfo";
import TopicPresentation from "src/components/TopicAcademy/TopicPresentation";
import TopicConfiguration from "src/components/TopicAcademy/TopicConfiguration";
import { ButtonCustom } from "src/components/ui/ButtonCustom";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


import { Formik, Form } from "formik";
import VideosTopic from "./topic/VideosTopic";
import PlaylistsTopic from "./topic/PlaylistsTopic";
import PodcastsTopic from "./topic/PodcastsTopic";
import { fetchTopic, saveTopic,resetTopicsErrors } from "../../redux/actions/topics/topic";

const ConfigurationTopic = (props) => {
  const [key, setKey] = useState(0);
  const dispatch = useDispatch();
  const topicReducer = useSelector((state) => state.topicReducer);
  const programReducer = useSelector((state) => state.programReducer);
  const { id } = useParams();

  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program && id) {
      const dispatchFetchTopics = (id) => dispatch(fetchTopic(id));
      dispatchFetchTopics(id);
      const dispatchResetTopicsErrors = () => dispatch(resetTopicsErrors())
      dispatchResetTopicsErrors()
    }
  }, [programReducer.isLoading]);

  const [topicState, setTopicState] = useState({
    id: null,
    code: null,
    name: "",
    videos: null,
    playlists: null,
    podcasts: null,
    color: null,
  });
  useEffect(() => {
    if (!topicReducer.isLoading && topicReducer.topic) {
      setTopicState({
        id: topicReducer.topic.id,
        code: topicReducer.topic.code,
        name: topicReducer.topic.name ? topicReducer.topic.name : "",
        are_videos: topicReducer.topic.are_videos,
        videos: topicReducer.topic.videos,
        podcasts: topicReducer.topic.podcasts,
        playlists: topicReducer.topic.playlists,
        color: topicReducer.topic.color
      });
    }
  }, [topicReducer.isLoading, topicReducer.topic]);
  return (
    <Main padding>
      <Filters 
        name={topicReducer.topic?.name}  
        back="Volver"
      
      />
      <ContainerTabs className="container">
        <Formik
          enableReinitialize={true}
          initialValues={topicState}
          onSubmit={(values) => {
            const dispatchSaveTopic = (topic) =>
              dispatch(saveTopic(topic));
            dispatchSaveTopic(values);
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
                            <span>VIDEOS</span>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey={3} className="text-grey">
                            <span>PLAYLISTS</span>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey={4} className="text-grey">
                            <span>PODCASTS</span>
                          </Nav.Link>
                        </Nav.Item>
        
                      </Nav>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pl-3 pr-3 pb-5">
                      <Tab.Content>
                        <Tab.Pane eventKey={0} className="text-grey">
                          <MainTopicInfo
                            values={props.values}
                            setFieldValue={props.setFieldValue}
                          />
                          <TopicPresentation />
                        </Tab.Pane>

                        <Tab.Pane eventKey={1} className="text-grey">
                          <TopicConfiguration
                            values={props.values}
                            setFieldValue={props.setFieldValue}
                          />
                        </Tab.Pane>
                        
                        <Tab.Pane eventKey={2} className="text-grey">
                          <VideosTopic
                            values={props.values}
                            setFieldValue={props.setFieldValue}
                          />
                        </Tab.Pane>
                        <Tab.Pane eventKey={3} className="text-grey">
                          <PlaylistsTopic
                            values={props.values}
                            setFieldValue={props.setFieldValue}
                          />
                        </Tab.Pane>
                        <Tab.Pane eventKey={4} className="text-grey">
                          <PodcastsTopic
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
export default ConfigurationTopic;
