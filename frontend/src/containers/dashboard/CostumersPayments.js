import { Main } from "src/components/Dashboard/ui/Main";
import React, { useState, useEffect } from "react";
import Filters from "src/components/Layout/Filters";
import { MdEdit } from "react-icons/md";
import styled from "@emotion/styled";
import CostumerRow from "src/components/Dashboard/ui/CostumerRow";
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
const CostumersPayments = () => {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const programReducer = useSelector((state) => state.programReducer);
  useEffect(() => {
    if (!programReducer.isLoading) {
      const dispatchFetchAccount = () => dispatch(fetchAccounts());
      dispatchFetchAccount();
    }
  }, [programReducer.isLoading]);
  const accountsReducer = useSelector((state) => state.accountsReducer);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    const dispatchResetAccountCreate = () => dispatch(resetAccountCreate());
    dispatchResetAccountCreate();
  };
  const handleShow = () => setShow(true);
  const handleDeleteAccount = (id) => {
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
        const dispatchDeleteAccount = (id) => dispatch(deleteAccount(id));
        dispatchDeleteAccount(id);
      }
    });
  };
  const [search, setSearch] = useState("");

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const dispatchFetchAccount = (search) => dispatch(fetchAccounts(search));
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
                <th scope="col" style={{ width: "20%" }}>
                  Cliente
                </th>
                <th scope="col" style={{ width: "100%" }}>
                  Academia
                </th>
                <th scope="col">Realizado</th>
              </tr>
            </thead>
            <tbody>
              {accountsReducer.accounts &&
                accountsReducer.accounts.results.map((account) => (
                  <CostumerRow
                    handleShow={handleShow}
                    account={account}
                    key={account.id}
                    handleDeleteAccount={handleDeleteAccount}
                  />
                ))}
            </tbody>
          </table>
          {accountsReducer.isLoading && <span>Cargando...</span>}
          {accountsReducer.accounts &&
            (accountsReducer.accounts.previous ||
              accountsReducer.accounts.next) && (
              <div className="d-flex justify-content-center my-5">
                {accountsReducer.accounts.previous ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropleft
                      onClick={() =>
                        handleChangePage(accountsReducer.accounts.previous)
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
                {accountsReducer.accounts.next ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropright
                      onClick={() =>
                        handleChangePage(accountsReducer.accounts.next)
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