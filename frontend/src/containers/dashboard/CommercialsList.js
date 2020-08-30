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
import { useDispatch, useSelector } from "react-redux";

import { Formik, Form as FormFormik } from "formik";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CreateCostumerForm from "src/components/Dashboard/ui/CreateCostumerForm";
import {
  createCostumer,
  fetchCostumers,
  deleteCostumer,
  fetchCostumersPagination,
  resetCostumerCreate,
} from "../../redux/actions/costumers";
const CommercialList = () => {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  useEffect(() => {
    const dispatchFetchAccount = () => dispatch(fetchCostumers());
    dispatchFetchAccount();
  }, []);
  const costumersReducer = useSelector((state) => state.costumersReducer);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    const dispatchResetAccountCreate = () => dispatch(resetCostumerCreate());
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
        const dispatchDeleteAccount = (id) => dispatch(deleteCostumer(id));
        dispatchDeleteAccount(id);
      }
    });
  };
  const [search, setSearch] = useState("");

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const dispatchFetchAccount = (search) => dispatch(fetchCostumers(search));
    dispatchFetchAccount(search);
  };
  const handleChangePage = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchAccountsPagination = (url) =>
      dispatch(fetchCostumersPagination(url));
    dispatchFetchAccountsPagination(url);
  };
  return (
    <Main padding>
      <Filters
        title=" "
        placeholder="Buscar Comerciales"
        search={{ search: search, setSearch: setSearch }}
        onSubmit={handleSubmitSearch}
      />
      <div className="d-sm-flex justify-content-between mb-2 align-items-end mb-3">
        <span className="d-block text-center"></span>
        <span className="d-block m-2 d-sm-none"></span>
        <ButtonCustom className="" onClick={handleShow}>
          Crear Comercial
        </ButtonCustom>
      </div>
      <div>
        <div className="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col" style={{ width: "20%" }}>
                  Username
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
              {costumersReducer.accounts &&
                costumersReducer.accounts.results.map((account) => (
                  <CostumerRow
                    handleShow={handleShow}
                    account={account}
                    key={account.id}
                    handleDeleteAccount={handleDeleteAccount}
                  />
                ))}
            </tbody>
          </table>
          {costumersReducer.isLoading && <span>Cargando...</span>}
          {costumersReducer.accounts &&
            (costumersReducer.accounts.previous ||
              costumersReducer.accounts.next) && (
              <div className="d-flex justify-content-center my-5">
                {costumersReducer.accounts.previous ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropleft
                      onClick={() =>
                        handleChangePage(costumersReducer.accounts.previous)
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
                {costumersReducer.accounts.next ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropright
                      onClick={() =>
                        handleChangePage(costumersReducer.accounts.next)
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
        </div>{" "}
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
                dispatch(createCostumer(user, handleClose));
              dispatchCreateAccount(user);
            }}
          >
            {(props) => {
              return (
                <>
                  <FormFormik>
                    <Modal.Header closeButton>
                      <Modal.Title>Crear una cuenta de comercial</Modal.Title>
                    </Modal.Header>
                    <CreateCostumerForm />
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
    </Main>
  );
};

export default CommercialList;
