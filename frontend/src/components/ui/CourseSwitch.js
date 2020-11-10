import React, { useState } from "react";
import { Tab, Nav, Col, Row } from "react-bootstrap";

const CourseSwitch = () => {
  const [key, setKey] = useState(0);

  return (
    <div>
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
              <Tab.Pane eventKey={0} className="text-grey"></Tab.Pane>

              <Tab.Pane eventKey={1} className="text-grey"></Tab.Pane>

              <Tab.Pane eventKey={2} className="text-grey"></Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default CourseSwitch;
