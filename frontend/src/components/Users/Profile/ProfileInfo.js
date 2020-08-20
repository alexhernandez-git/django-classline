import React, { useContext, useState } from "react";
import { AppContext } from "src/context/AppContext";
import { Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import Countries from "static/data/countries";
import Languages from "static/data/languages";
import moment from "moment";
const TeachersProfileInfo = () => {
  const appContext = useContext(AppContext);

  const [info, setInfo] = useState({
    biography: appContext.userProfile.user.profile.biography,
  });
  const [infoErrors, setInfoErrors] = useState({
    biography: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    const result = await appContext.saveProfileInformation(info);
    if (result.status == 200 || result.status == 201) {
      setIsEditing(false);

      setInfoErrors({
        biography: null,
      });
    } else {
      setInfoErrors(result.data);
      console.log(infoErrors);
    }
  };
  return (
    <div className="bg-white shadow p-3 rounded my-4">
      <span className="d-none d-md-block">Biografía</span>
      <Form onSubmit={handleSave}>
        <Row>
          <Col
            lg={{ span: 4 }}
            className="mb-3 text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="h5 m-0 font-weight-normal">Biografía</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            <Form.Group controlId="formGroupName">
              <Form.Control
                as="textarea"
                value={info.biography}
                onChange={(e) => {
                  setInfo({ ...info, biography: e.target.value });
                  setIsEditing(true);
                }}
                type="date"
                placeholder="Biografía"
                rows="10"
              />
              {infoErrors.biography &&
                infoErrors.biography.map((error) => (
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
            <span
              className="btn btn-green-disabled rounded-pill text-white py-2 px-4"
              onClick={handleSave}
            >
              Guardar
            </span>
          )}
        </div>
      </Form>
    </div>
  );
};

export default TeachersProfileInfo;
