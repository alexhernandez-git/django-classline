import React, { useRef, useState, useContext, useEffect } from "react";

import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";
import { Tab, Nav, Col, Row } from "react-bootstrap";
import styled from "@emotion/styled";
import AccountsList from "src/components/AdminAcademy/AccountsList";
import AcquireAccounts from "src/components/AdminAcademy/AcquireAccounts";
import { useDispatch, useSelector } from "react-redux";
import { fetchPricing } from "src/redux/actions/pricing";
import {
  addAcquireAccounts,
  cancelAcquireAccounts,
} from "src/redux/actions/program";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const Students = () => {
  const MySwal = withReactContent(Swal);

  const main = useRef();
  const dispatch = useDispatch();
  const [key, setKey] = useState(0);
  const programReducer = useSelector((state) => state.programReducer);

  // useEffect(() => {
  //   if (!programReducer.isLoading) {
  //     const dispatchFetchPricing = () => dispatch(fetchPricing());
  //     dispatchFetchPricing();
  //   }
  // }, [programReducer.isLoading]);
  // const pricingReducer = useSelector((state) => state.pricingReducer);
  const handleAddAcquireAccounts = (acquire_accounts) => {
    const dispatchAddAcquireAccounts = (acquire_accounts) =>
      dispatch(addAcquireAccounts(acquire_accounts));
    dispatchAddAcquireAccounts(acquire_accounts);
  };
  const handleCancelAcquireAccounts = () => {
    MySwal.fire({
      title:
        "Estas seguro?<br>Al cancelar se te devolvera el dinero de tu último pago en los proximos dias",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cancelar",
      cancelButtonText: "Atras",
    }).then((result) => {
      if (result.value) {
        const dispatchCancelAcquireAccounts = () =>
          dispatch(cancelAcquireAccounts());
        dispatchCancelAcquireAccounts();
      }
    });
  };
  return (
    <Main padding ref={main}>
      <Filters title="Alumnos" />
      <ContainerTabs className="container">
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
                  <Nav.Link eventKey={0}>
                    <span>CUENTAS CREADAS</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={1}>
                    <span>ADQUIRIR CUENTAS</span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>

          <Row>
            <Col className="pl-3 pr-3 pb-5">
              <Tab.Content>
                <Tab.Pane eventKey={0}>
                  <AccountsList main={main} />
                </Tab.Pane>
                <Tab.Pane eventKey={1}>
                  {!programReducer.isLoading && programReducer.program && (
                    <AcquireAccounts
                      program={programReducer.program}
                      // pricing={pricingReducer.pricing}
                      handleAddAcquireAccounts={handleAddAcquireAccounts}
                      handleCancelAcquireAccounts={handleCancelAcquireAccounts}
                    />
                  )}
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
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
export default Students;
