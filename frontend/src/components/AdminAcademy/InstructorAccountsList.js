import React, { useState, useEffect } from "react";
import Filters from "src/components/Layout/Filters";
import { MdEdit } from "react-icons/md";
import styled from "@emotion/styled";
import CountRow from "./AccountRow";
import { IconContext } from "react-icons";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import VideoForm from "./VideoForm";
import {
  ButtonCustom,
  ButtonCustomSuccess,
} from "src/components/ui/ButtonCustom";
import CreateInstructorAccountForm from "./CreateInstructorAccountForm";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccounts,
  createAccount,
  deleteAccount,
  resetAccountCreate,
  fetchAccountsPagination,
} from "src/redux/actions/instructorAccounts";
import { Formik, Form as FormFormik } from "formik";
import instructorAccountsReducer from "src/redux/reducers/instructorAccountsReducer";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AccountsList = ({ main }) => {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const programReducer = useSelector((state) => state.programReducer);
  const authReducer = useSelector((state) => state.authReducer);
  useEffect(() => {
    if (!programReducer.isLoading) {
      const dispatchFetchAccount = () => dispatch(fetchAccounts());
      dispatchFetchAccount();
    }
  }, [programReducer.isLoading]);
  const instructorAccountsReducer = useSelector(
    (state) => state.instructorAccountsReducer
  );

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
    <div>
      <Filters
        title=" "
        placeholder="Buscar Cuentas"
        search={{ search: search, setSearch: setSearch }}
        onSubmit={handleSubmitSearch}
      />
      <div className="d-sm-flex justify-content-between mb-2 align-items-end mb-3">
        <span className="d-block text-center">
          Cuentas disponibles para crear:{" "}
          {authReducer.user.teacher.accounts_to_create_left}
        </span>
        <span className="d-block m-2 d-sm-none"></span>
        <ButtonCustom className="" onClick={handleShow}>
          Crear Cuenta
        </ButtonCustom>
      </div>
      <div className="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col" style={{ width: "20%" }}>
                Nombre de Usuario
              </th>
              <th scope="col" style={{ width: "20%" }}>
                Contraseña
              </th>
              <th scope="col" style={{ width: "100%" }}>
                Nombre completo
              </th>
              <th scope="col">Creado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {instructorAccountsReducer.accounts &&
              instructorAccountsReducer.accounts.results.map((account) => (
                <CountRow
                  handleShow={handleShow}
                  account={account}
                  key={account.id}
                  handleDeleteAccount={handleDeleteAccount}
                />
              ))}
          </tbody>
        </table>
        {instructorAccountsReducer.isLoading && <span>Cargando...</span>}
        {instructorAccountsReducer.accounts &&
          (instructorAccountsReducer.accounts.previous ||
            instructorAccountsReducer.accounts.next) && (
            <div className="d-flex justify-content-center my-5">
              {instructorAccountsReducer.accounts.previous ? (
                <IconContext.Provider
                  value={{
                    size: 50,
                    className: "cursor-pointer",
                  }}
                >
                  <IoIosArrowDropleft
                    onClick={() =>
                      handleChangePage(
                        instructorAccountsReducer.accounts.previous
                      )
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
              {instructorAccountsReducer.accounts.next ? (
                <IconContext.Provider
                  value={{
                    size: 50,
                    className: "cursor-pointer",
                  }}
                >
                  <IoIosArrowDropright
                    onClick={() =>
                      handleChangePage(instructorAccountsReducer.accounts.next)
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
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Formik
          enableReinitialize={true}
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirmation: "",
          }}
          onSubmit={(values) => {
            const user = {
              ...values,
              first_password: values.password,
            };

            const dispatchCreateAccount = (user) =>
              dispatch(createAccount(user, handleClose));
            dispatchCreateAccount(user);
          }}
        >
          {(props) => {
            return (
              <>
                <FormFormik>
                  <Modal.Header closeButton>
                    <Modal.Title>Crear una cuenta de instructor</Modal.Title>
                  </Modal.Header>
                  <CreateInstructorAccountForm />
                  <Modal.Footer>
                    <ButtonCustom type="submit">Crear</ButtonCustom>
                  </Modal.Footer>
                </FormFormik>
              </>
            );
          }}
        </Formik>
      </Modal>
    </div>
  );
};

export default AccountsList;
