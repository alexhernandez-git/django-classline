import { Main } from "src/components/Dashboard/ui/Main";
import React, { useState, useEffect } from "react";
import Filters from "src/components/Layout/Filters";
import { MdEdit } from "react-icons/md";
import styled from "@emotion/styled";
import PaymentRow from "src/components/Dashboard/ui/PaymentRow";
import { IconContext } from "react-icons";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import VideoForm from "src/components/AdminAcademy/VideoForm";
import {
  ButtonCustom,
  ButtonCustomSuccess,
} from "src/components/ui/ButtonCustom";
import CreateCountForm from "src/components/AdminAcademy/CreateAccountForm";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccounts,
  createAccount,
  deleteAccount,
  resetAccountCreate,
  fetchAccountsPagination,
} from "src/redux/actions/accounts";

import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CreateCostumerForm from "src/components/Dashboard/ui/CreateCostumerForm";
import { fetchPayments } from "../../redux/actions/payments";
const CostumersPayments = () => {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const programReducer = useSelector((state) => state.programReducer);
  useEffect(() => {
    const dispatchFetchAccount = () => dispatch(fetchPayments());
    dispatchFetchAccount();
  }, []);
  const paymentsReducer = useSelector((state) => state.paymentsReducer);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const [search, setSearch] = useState("");

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const dispatchFetchAccount = (search) => dispatch(fetchPayments(search));
    dispatchFetchAccount(search);
  };
  const handleChangePage = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchAccountsPagination = (url) =>
      dispatch(fetchAccountsPagination(url));
    dispatchFetchAccountsPagination(url);
  };
  return (
    <Main padding>
      <Filters
        title=" "
        placeholder="Buscar Pagos"
        search={{ search: search, setSearch: setSearch }}
        onSubmit={handleSubmitSearch}
      />

      <div>
        <div className="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col" style={{ width: "20%" }}>
                  Cantidad
                </th>
                <th scope="col" style={{ minWidth: "100px" }}>
                  Moneda
                </th>
                <th scope="col" style={{ width: "20%" }}>
                  Cliente
                </th>
                <th scope="col" style={{ width: "100%" }}>
                  Academia
                </th>
                <th scope="col" style={{ width: "100px" }}>
                  Realizado
                </th>
              </tr>
            </thead>
            <tbody>
              {paymentsReducer.payments &&
                paymentsReducer.payments.results.map((payment) => (
                  <PaymentRow
                    handleShow={handleShow}
                    payment={payment}
                    key={payment.id}
                  />
                ))}
            </tbody>
          </table>
          {paymentsReducer.isLoading && <span>Cargando...</span>}
          {paymentsReducer.payments &&
            (paymentsReducer.payments.previous ||
              paymentsReducer.payments.next) && (
              <div className="d-flex justify-content-center my-5">
                {paymentsReducer.payments.previous ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropleft
                      onClick={() =>
                        handleChangePage(paymentsReducer.payments.previous)
                      }
                    />
                  </IconContext.Provider>
                ) : (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      color: "#a1a1a1",
                    }}
                  >
                    <IoIosArrowDropleft />
                  </IconContext.Provider>
                )}
                {paymentsReducer.payments.next ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropright
                      onClick={() =>
                        handleChangePage(paymentsReducer.payments.next)
                      }
                    />
                  </IconContext.Provider>
                ) : (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      color: "#a1a1a1",
                    }}
                  >
                    <IoIosArrowDropright />
                  </IconContext.Provider>
                )}
              </div>
            )}
        </div>
      </div>
    </Main>
  );
};

export default CostumersPayments;
