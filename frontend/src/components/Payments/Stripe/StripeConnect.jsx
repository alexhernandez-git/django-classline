import React, { useContext } from "react";
import { AppContext } from "src/context/AppContext";
import { Row, Col } from "react-bootstrap";
const StripeConnect = () => {
  const appContext = useContext(AppContext);

  return (
    <AppContext.Consumer>
      {(appContext) => (
        <>
          <div className="bg-white shadow p-3 rounded mb-4">
            <span className="d-none d-md-block">Configuraciones de pago</span>
            <Row className="image-avatar-upload">
              <Col
                lg={{ span: 4 }}
                className="text-center d-lg-flex justify-content-end align-items-center"
              >
                {appContext.userProfile.user.profile.stripe_account_id ==
                  null ||
                appContext.userProfile.user.profile.stripe_account_id ==
                  undefined ? (
                  <>
                    <span className="h5 m-0 font-weight-normal">
                      Conectar con Stripe
                    </span>
                  </>
                ) : (
                  <>
                    <span className="h5 m-0 font-weight-normal">
                      Cuenta de Stripe conectada
                    </span>
                  </>
                )}
              </Col>
              <Col lg={{ offset: 1, span: 6 }}>
                {appContext.userProfile.user.profile.stripe_account_id ==
                  null ||
                appContext.userProfile.user.profile.stripe_account_id ==
                  undefined ? (
                  <>
                    <a
                      href="https://connect.stripe.com/express/oauth/authorize?response_type=code&amp;client_id=ca_HmRkLTjyLDqt32B5GRlzOhlqeH4ry79e&amp;scope=read_write"
                      className="connect-button"
                    >
                      {/* prod */}
                      {/* ca_HmRkLTjyLDqt32B5GRlzOhlqeH4ry79e */}
                      {/* dev */}
                      {/* ca_HmRky5LBHShFfC92Xzjsz0Mj82piwIiy */}
                      <span>Connect with Stripe</span>
                    </a>
                  </>
                ) : (
                  <>
                    {" "}
                    <a
                      href={
                        appContext.userProfile.user.profile.stripe_dashboard_url
                      }
                      target="_blank"
                      className="btn-gradient-green bg-gradient-green text-white rounded-pill px-3 py-2"
                    >
                      <span>Ver Panel de Control</span>
                    </a>
                  </>
                )}
              </Col>
            </Row>
          </div>
        </>
      )}
    </AppContext.Consumer>
  );
};

export default StripeConnect;
