import React, { useContext, useState } from "react";
import { AppContext } from "src/context/AppContext";
import { Form, Row, Col } from "react-bootstrap";
const ChangeEmail = () => {
  const appContext = useContext(AppContext);
  const [emails, setEmails] = useState({
    new_email: "",
  });
  const [emailErrors, setEmailError] = useState({
    new_email: null,
    non_field_errors: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    const result = await appContext.changeEmail(emails.new_email);

    if (result.status == 200 || result.status == 201) {
      setIsEditing(false);

      setEmailError({
        new_email: null,
        non_field_errors: null,
      });
      setEmails({
        new_email: "",
      });
      setIsEditing(false);
    } else {
      console.log(result.data);
      setEmailError(result.data);
    }
  };
  return (
    <div className="bg-white shadow p-3 rounded my-4">
      <span className="d-none d-md-block">Cambiar email</span>
      <Form onSubmit={handleSave}>
        {appContext.userProfile.user.email && (
          <Row>
            <Col
              lg={{ span: 4 }}
              className="mb-3 text-center d-lg-flex justify-content-end align-items-center"
            >
              <span className="h5 m-0 font-weight-normal">Email actual</span>
            </Col>

            <Col lg={{ offset: 1, span: 6 }}>
              <span className="m-0 font-weight-normal">
                {appContext.userProfile.user.email}
              </span>
            </Col>
          </Row>
        )}
        <Row>
          <Col
            lg={{ span: 4 }}
            className="mb-3 text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="h5 m-0 font-weight-normal">Nuevo email</span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            <Form.Group controlId="formGroupName">
              <Form.Control
                value={emails.new_email}
                onChange={(e) => {
                  setEmails({ ...emails, new_email: e.target.value });
                  setIsEditing(true);
                }}
                type="text"
                placeholder="Nuevo email"
              />
              {emailErrors.non_field_errors &&
                emailErrors.non_field_errors.map((error) => (
                  <small className="d-block text-red">{error}</small>
                ))}
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-center align-items-center mt-4">
          {isEditing ? (
            <span
              className="btn btn-green rounded-pill text-white py-2 px-4"
              onClick={handleSave}
            >
              Cambiar
            </span>
          ) : (
            <span className="btn btn-green-disabled rounded-pill text-white py-2 px-4">
              Cambiar
            </span>
          )}
        </div>
      </Form>
    </div>
  );
};

export default ChangeEmail;
