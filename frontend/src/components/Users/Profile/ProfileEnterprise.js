import React, { useContext, useState } from "react";
import { AppContext } from "src/context/AppContext";
import { Form, Row, Col } from "react-bootstrap";
const TeachersEnterpriseInfo = () => {
  const appContext = useContext(AppContext);
  const [enterpriseInfo, setEnterpriseInfo] = useState({
    is_enterprise: appContext.userProfile.user.profile.is_enterprise,
    company_name: appContext.userProfile.user.profile.company_name,
  });
  const [enterpriseInfoErrors, setEnterpriseInfoErrors] = useState({
    company_name: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    const result = await appContext.saveProfileInformation(enterpriseInfo);
    if (result.status == 200 || result.status == 201) {
      setEnterpriseInfoErrors({
        company_name: null,
      });
      setIsEditing(false);
    } else {
      setEnterpriseInfoErrors(result.data);
    }
  };
  return (
    <div className="bg-white shadow p-3 rounded my-4">
      <span className="d-none d-md-block">Información de empresa</span>
      <Form onSubmit={handleSave}>
        <Row>
          <Col
            lg={{ span: 4 }}
            className="mt-2 text-center d-lg-flex justify-content-end align-items-center"
          >
            <span className="h5 m-0 font-weight-normal">
              ¿Eres una empresa?
            </span>
          </Col>

          <Col lg={{ offset: 1, span: 6 }}>
            <Form.Group
              controlId="formGroupName"
              className="d-lg-block d-flex justify-content-center"
            >
              <label className="container-check">
                <input
                  type="checkbox"
                  checked={enterpriseInfo.is_enterprise}
                  onChange={(e) => {
                    setEnterpriseInfo({
                      ...enterpriseInfo,
                      is_enterprise: e.target.checked,
                    });
                    setIsEditing(true);
                  }}
                />
                <span className="checkmark"></span>
              </label>
            </Form.Group>
          </Col>
          {enterpriseInfo.is_enterprise ? (
            <>
              <div className="p-4"></div>
              <Col
                lg={{ span: 4 }}
                className="mb-3 text-center d-lg-flex justify-content-end align-items-center "
              >
                <span className="h5 m-0 font-weight-normal">
                  Nombre de la compañia
                </span>
              </Col>

              <Col lg={{ offset: 1, span: 6 }}>
                <Form.Group controlId="formGroupName">
                  <Form.Control
                    value={enterpriseInfo.company_name}
                    onChange={(e) => {
                      setEnterpriseInfo({
                        ...enterpriseInfo,
                        company_name: e.target.value,
                      });
                      setIsEditing(true);
                    }}
                    type="text"
                    placeholder="Nombre de tu empresa"
                  />
                  {enterpriseInfoErrors.company_name &&
                    enterpriseInfoErrors.company_name.map((error) => (
                      <small className="d-block text-red">{error}</small>
                    ))}
                </Form.Group>
              </Col>
            </>
          ) : (
            <></>
          )}
        </Row>

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

export default TeachersEnterpriseInfo;
