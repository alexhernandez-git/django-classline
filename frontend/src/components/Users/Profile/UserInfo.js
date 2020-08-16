import React, { useContext, useState } from "react";
import { AppContext } from "src/context/AppContext";
import { Form, Row, Col } from "react-bootstrap";
const TeachersProfileInfo = () => {
  const appContext = useContext(AppContext);
  const [info, setInfo] = useState({
    first_name: appContext.userProfile.user.first_name,
    last_name: appContext.userProfile.user.last_name,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [infoErrors, setInfoErrors] = useState({
    first_name: null,
    last_name: null,
  });
  const handleSave = async () => {
    const result = await appContext.saveUserInformation(info);
    if (result.status == 200 || result.status == 201) {
      setIsEditing(false);

      setInfoErrors({
        first_name: null,
        last_name: null,
      });
    } else {
      setInfoErrors(result.data);
    }
  };
  return (
    <div className="bg-white shadow p-3 rounded my-4">
      <span className="d-none d-md-block">Información principal</span>
      <Form onSubmit={handleSave}>
        <Row>
          <Col
            lg={{ span: 4 }}
            className="mb-3 text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="h5 m-0 font-weight-normal">Nombre</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            <Form.Group controlId="formGroupName">
              <Form.Control
                value={info.first_name}
                onChange={(e) => {
                  setInfo({ ...info, first_name: e.target.value });
                  setIsEditing(true);
                }}
                type="text"
                placeholder="Tu nombre"
              />
              {infoErrors.first_name &&
                infoErrors.first_name.map((error) => (
                  <small className="d-block text-red">{error}</small>
                ))}
            </Form.Group>
          </Col>

          <Col
            lg={{ span: 4 }}
            className="mb-3 text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="h5 m-0 font-weight-normal">Apellidos</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            <Form.Group controlId="formGroupName">
              <Form.Control
                value={info.last_name}
                onChange={(e) => {
                  setInfo({ ...info, last_name: e.target.value });
                  setIsEditing(true);
                }}
                type="text"
                placeholder="Tus apellidos"
              />
              {infoErrors.last_name &&
                infoErrors.last_name.map((error) => (
                  <small className="d-block text-red">{error}</small>
                ))}
            </Form.Group>
          </Col>
        </Row>
        {/* <Row>

                    <Col lg={{ span: 4 }} className="mb-3text-center d-lg-flex justify-content-end align-items-center">
                        <span className="h5 m-0 font-weight-normal">Pais</span>
                    </Col>

                    <Col lg={{ offset: 1, span: 6 }}>
                        <Select
                            options={Countries}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    text: 'orangered',
                                    primary25: '#45948930',
                                    primary50: '#45948952',
                                    primary: '#459489',
                                },
                            })} />
                    </Col>
                </Row> */}
        <div className="d-flex justify-content-center align-items-center mt-2">
          {isEditing ? (
            <span
              className="btn btn-green rounded-pill text-white py-2 px-4"
              onClick={handleSave}
            >
              Guardar
            </span>
          ) : (
            <span className="btn btn-green-disabled rounded-pill text-white py-2 px-4">
              Guardar
            </span>
          )}
        </div>
      </Form>
    </div>
  );
};

export default TeachersProfileInfo;
