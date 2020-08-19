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
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IconContext } from "react-icons";
import useCheckAreDiscount from "src/hooks/useCheckAreDiscount";
const Students = () => {
  const MySwal = withReactContent(Swal);
  const [areDiscount, fetchDiscount] = useCheckAreDiscount();
  const main = useRef();
  const dispatch = useDispatch();
  const [key, setKey] = useState(0);
  const programReducer = useSelector((state) => state.programReducer);
  const authReducer = useSelector((state) => state.authReducer);
  const [infoOpen, setInfoOpen] = useState(false);
  const handleToggleInfoOpen = () => {
    setInfoOpen(!infoOpen);
  };
  useEffect(() => {
    console.log(areDiscount);
  }, [areDiscount]);
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
      title: "Estas seguro?",
      text: authReducer.user.teacher.discount
        ? "Tu descuento permanente se te eliminará"
        : null,
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
      {areDiscount && authReducer.user && !authReducer.user.teacher.discount && (
        <Promotion>
          {infoOpen && (
            <div className="info">
              <small>{areDiscount.info}</small>
            </div>
          )}
          <div className="content">
            <div>
              <span className="d-block title">{areDiscount.title}</span>
              <span>{areDiscount.message}</span>
            </div>
            <IconContext.Provider
              value={{ color: "white", className: "cursor-pointer", size: 25 }}
            >
              <div>
                <IoIosInformationCircleOutline onClick={handleToggleInfoOpen} />
              </div>
            </IconContext.Provider>
          </div>
        </Promotion>
      )}
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
                      useCheckAreDiscount={{ areDiscount, fetchDiscount }}
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
const Promotion = styled.div`
  position: fixed;
  bottom: 40px;
  left: 90px;
  margin: auto;
  flex-direction: column;
  width: 100%;
  display: flex;
  justify-self: center;
  align-items: center;
  align-self: center;
  justify-content: center;
  text-align: center;
  .content {
    margin: 10px 0;
    padding: 1rem;
    color: white;
    border-radius: 1rem;
    background: linear-gradient(45deg, #2e6a89, #56b389);
    display: grid;
    grid-template-columns: 1fr 40px;
    align-items: center;
  }
  span {
    font-size: 1.8rem;
  }
  .title {
    font-weight: bold;
  }
  @media only screen and (max-width: 576px) {
    width: calc(100% - 20px);
    left: 10px;
    .content {
      font-size: 1.6rem;
    }
  }
`;
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
