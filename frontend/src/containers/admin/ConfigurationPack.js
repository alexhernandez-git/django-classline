import React, { useState, useEffect } from "react";

import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";
import { Tab, Nav, Col, Row } from "react-bootstrap";
import styled from "@emotion/styled";
import MainProgramInfo from "src/components/PackAcademy/MainProgramInfo";
import ProgramBenefitsForm from "src/components/PackAcademy/ProgramBenefitsForm";
import ProgramPresentation from "src/components/PackAcademy/ProgramPresentation";
import ProgramConfiguration from "src/components/PackAcademy/ProgramConfiguration";
import { ButtonCustom } from "src/components/ui/ButtonCustom";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


import { Formik, Form } from "formik";
import VideosPack from "./pack/VideosAdminPack";
import PodcastsPack from "./pack/PodcastsAdminPack";
import { fetchPack, savePack,resetPacksErrors } from "../../redux/actions/pack";

const ConfigurationPack = (props) => {
  const [key, setKey] = useState(0);
  const dispatch = useDispatch();
  const packReducer = useSelector((state) => state.packReducer);
  const programReducer = useSelector((state) => state.programReducer);
  const {  id } = useParams();

  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program && id) {
      const dispatchFetchPacks = (id) => dispatch(fetchPack(id));
      dispatchFetchPacks(id);
      const dispatchResetPacksErrors = () => dispatch(resetPacksErrors())
      dispatchResetPacksErrors()
    }
  }, [programReducer.isLoading]);

  const [packState, setPackState] = useState({
    id: null,
    title: "",
    description: "",
    are_videos: false,
    videos: null,
    are_podcasts: false,
    podcasts: null,
    students: null,
    pack_price: null,
    pack_language: null,
    instructor: {},
    is_published: false,
  });
  useEffect(() => {
    if (!packReducer.isLoading && packReducer.pack) {
      console.log(packReducer.pack);
      setPackState({
        id: packReducer.pack.id,
        title: packReducer.pack.title ? packReducer.pack.title : "",
        description: packReducer.pack.description ? packReducer.pack.description : "",
        are_videos: packReducer.pack.are_videos,
        videos: packReducer.pack.videos,
        are_podcasts: packReducer.pack.are_podcasts,
        podcasts: packReducer.pack.podcasts,
        students: packReducer.pack.students,
        pack_price: packReducer.pack.pack_price,
        pack_language: packReducer.pack.pack_language,
        instructor: packReducer.pack.instructor,
        is_published: packReducer.pack.is_published,
        event_booking: packReducer.pack.event_booking,
        event_booking_calendar: packReducer.pack.event_booking_calendar,
      });
    }
  }, [packReducer.isLoading, packReducer.pack]);
  return (
    <Main padding>
      <Filters 
        title={packReducer.pack?.title}  
        back="Volver"
      
      />
      <ContainerTabs className="container">
        <Formik
          enableReinitialize={true}
          initialValues={packState}
          onSubmit={(values) => {
            const dispatchSavePack = (pack) =>
              dispatch(savePack(pack));
            dispatchSavePack(values);
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
                            <span>PODCASTS</span>
                          </Nav.Link>
                        </Nav.Item>
                        {/* <Nav.Item>
                          <Nav.Link eventKey={3} className="text-grey">
                            <span>PLAYLISTS</span>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey={5} className="text-grey">
                            <span>RECURSOS</span>
                          </Nav.Link>
                        </Nav.Item> */}
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
                          <ProgramPresentation />
                        </Tab.Pane>

                        <Tab.Pane eventKey={1} className="text-grey">
                          <ProgramConfiguration
                            values={props.values}
                            setFieldValue={props.setFieldValue}
                          />
                        </Tab.Pane>
                        
                        <Tab.Pane eventKey={2} className="text-grey">
                          <VideosPack
                            values={props.values}
                            setFieldValue={props.setFieldValue}
                          />
                        </Tab.Pane>
                        <Tab.Pane eventKey={3} className="text-grey">
                          <PodcastsPack
                            values={props.values}
                            setFieldValue={props.setFieldValue}

                          />
                        </Tab.Pane>
                        {/* <Tab.Pane eventKey={3} className="text-grey">
                          <PlaylistsPack
                            values={props.values}
                            setFieldValue={props.setFieldValue}
                          />
                        </Tab.Pane>
                        <Tab.Pane eventKey={5} className="text-grey">
                          <ResourcesPack
                            values={props.values}
                            setFieldValue={props.setFieldValue}
                          />
                        </Tab.Pane> */}
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
export default ConfigurationPack;
