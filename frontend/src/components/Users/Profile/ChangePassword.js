import React, { useContext, useState } from "react";
import { AppContext } from "src/context/AppContext";
import { Form, Row, Col } from "react-bootstrap";
const TeachersProfileInfo = () => {
  const appContext = useContext(AppContext);
  const [passwords, setPasswords] = useState({
    email: appContext.userProfile.user.email,
    password: "",
    new_password: "",
    repeat_password: "",
  });
  const [passwordErrors, setPasswordError] = useState({
    password: null,
    new_password: null,
    repeat_password: null,
    non_field_errors: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    const result = await appContext.changePassword(passwords, setPasswords);

    if (result.status == 200 || result.status == 201) {
      setIsEditing(false);

      setPasswordError({
        password: null,
        new_password: null,
        repeat_password: null,
        non_field_errors: null,
      });
      setIsEditing(false);
    } else {
      console.log(result.data);
      setPasswordError(result.data);
    }
  };
  return (
    <div className="bg-white shadow p-3 rounded my-4">
      <span className="d-none d-md-block">Cambiar contraseña</span>
      <Form onSubmit={handleSave}>
        <Row>
          <Col
            lg={{ span: 4 }}
            className="mb-3 text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="h5 m-0 font-weight-normal">Contraseña actual</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            <Form.Group controlId="formGroupName">
              <Form.Control
                value={passwords.password}
                onChange={(e) => {
                  setPasswords({ ...passwords, password: e.target.value });
                  setIsEditing(true);
                }}
                type="password"
                placeholder="Contraseña actual"
              />
              {passwordErrors.non_field_errors &&
                passwordErrors.non_field_errors.map((error) => (
                  <small className="d-block text-red">
                    La contraseña es incorrecta
                  </small>
                ))}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col
            lg={{ span: 4 }}
            className="mb-3 text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="h5 m-0 font-weight-normal">Nueva contraseña</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            <Form.Group controlId="formGroupName">
              <Form.Control
                value={passwords.new_password}
                onChange={(e) => {
                  setPasswords({ ...passwords, new_password: e.target.value });
                  setIsEditing(true);
                }}
                type="password"
                placeholder="Nueva contraseña"
              />
              {passwordErrors.new_password &&
                passwordErrors.new_password.map((error) => (
                  <small className="d-block text-red">{error}</small>
                ))}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col
            lg={{ span: 4 }}
            className="mb-3 text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="h5 m-0 font-weight-normal">
              Repetir nueva contraseña
            </span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            <Form.Group controlId="formGroupName">
              <Form.Control
                value={passwords.repeat_password}
                onChange={(e) => {
                  setPasswords({
                    ...passwords,
                    repeat_password: e.target.value,
                  });
                  setIsEditing(true);
                }}
                type="password"
                placeholder="Repetir nueva contraseña"
              />
              {passwordErrors.repeat_password &&
                passwordErrors.repeat_password.map((error) => (
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
        <div className="d-flex justify-content-center align-items-center mt-4">
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
