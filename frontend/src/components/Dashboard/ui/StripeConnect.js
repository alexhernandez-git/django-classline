import React, { useRef, useState, useEffect, useContext } from "react";

import { Row, Col } from "react-bootstrap";

import {
  ButtonStyle,
  ButtonCustom,
  ButtonCustomSuccess,
  ButtonCustomError,
} from "src/components/ui/ButtonCustom";
import Checkbox from "src/components/ui/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  activeProgram,
  cancelActivedProgram,
  publishProgram,
  cancelPublishedProgram,
  removeProgram,
} from "src/redux/actions/program";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
const StripeConnect = (props) => {
  const MySwal = withReactContent(Swal);

  const dispatch = useDispatch();
  const programReducer = useSelector((state) => state.programReducer);
  const authCommercialsReducer = useSelector(
    (state) => state.authCommercialsReducer
  );
  const handleActiveProgram = () => {
    const dispatchActiveProgram = () => dispatch(activeProgram());
    dispatchActiveProgram();
  };
  const handleCancelActivedProgram = () => {
    MySwal.fire({
      title: "Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Desactivar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        const dispatchCancelActivedProgram = () =>
          dispatch(cancelActivedProgram());
        dispatchCancelActivedProgram();
      }
    });
  };
  const handlePublishProgram = () => {
    const dispatchPublishProgram = () => dispatch(publishProgram());
    dispatchPublishProgram();
  };
  const handleCancelPublishedProgram = () => {
    MySwal.fire({
      title: "Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Despublicar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        const dispatchCancelPublishedProgram = () =>
          dispatch(cancelPublishedProgram());
        dispatchCancelPublishedProgram();
      }
    });
  };
  const handleRemoveProgram = () => {
    MySwal.fire({
      title: "Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        const dispatchRemoveProgram = () => dispatch(removeProgram());
        dispatchRemoveProgram();
      }
    });
  };
  return (
    <>
      <div className="bg-white border p-3 rounded my-2 mb-4">
        <span className="d-none d-md-block">Conectar con stripe</span>

        <Row className="mb-4">
          <Col
            sm={{ span: 4 }}
            className="text-center d-sm-flex justify-content-end align-items-center"
          >
            {authCommercialsReducer.user.commercial
              .commercial_stripe_account_id == null ||
            authCommercialsReducer.user.commercial
              .commercial_stripe_account_id == undefined ? (
              <>
                <span className="m-0 font-weight-normal">
                  Conectar con Stripe
                </span>
              </>
            ) : (
              <>
                <span className="m-0 font-weight-normal">
                  Conectado con Stripe
                </span>
              </>
            )}
          </Col>

          <Col sm={{ offset: 1, span: 6 }}>
            {authCommercialsReducer.user.commercial
              .commercial_stripe_account_id == null ||
            authCommercialsReducer.user.commercial
              .commercial_stripe_account_id == undefined ? (
              <>
                <a
                  href="https://dashboard.stripe.com/oauth/authorize?response_type=code&client_id=ca_HmRkLTjyLDqt32B5GRlzOhlqeH4ry79e&scope=read_write&redirect_uri=https://classlineacademy.com/dashboard/profile"
                  className="connect-button"
                >
                  {/* prod */}
                  {/* ca_HmRkLTjyLDqt32B5GRlzOhlqeH4ry79e */}
                  {/* dev */}
                  {/* ca_HmRky5LBHShFfC92Xzjsz0Mj82piwIiy */}
                  <span>Conecta con Stripe</span>
                </a>
              </>
            ) : (
              <>Si</>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default StripeConnect;
