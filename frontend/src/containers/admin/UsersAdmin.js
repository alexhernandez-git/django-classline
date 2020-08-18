import React, { useState, useRef, useContext, useEffect } from "react";

import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";
import { Tab, Nav, Col, Row } from "react-bootstrap";
import styled from "@emotion/styled";
import AccountsList from "src/components/AdminAcademy/AccountsList";
import AcquireAccounts from "src/components/AdminAcademy/AcquireAccounts";
import { useDispatch, useSelector } from "react-redux";
import { fetchPricing } from "src/redux/actions/pricing";
import StudentRow from "src/components/AdminAcademy/StudentRow";

import {
  fetchStudents,
  fetchStudentsPagination,
} from "src/redux/actions/students";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IconContext } from "react-icons";
const Students = () => {
  const main = useRef();
  const dispatch = useDispatch();
  const [key, setKey] = useState(0);
  const programReducer = useSelector((state) => state.programReducer);

  useEffect(() => {
    if (!programReducer.isLoading) {
      const dispatchFetchPricing = () => dispatch(fetchPricing());
      dispatchFetchPricing();
    }
  }, [programReducer.isLoading]);
  const pricingReducer = useSelector((state) => state.pricingReducer);
  const [search, setSearch] = useState("");

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const dispatchFetchStudents = (search) => dispatch(fetchStudents(search));
    dispatchFetchStudents(search);
  };
  useEffect(() => {
    if (!programReducer.isLoading) {
      const dispatchFetchStudents = () => dispatch(fetchStudents());
      dispatchFetchStudents();
    }
  }, [programReducer.isLoading]);
  const studentsReducer = useSelector((state) => state.studentsReducer);
  const handleChangePage = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchStudentsPagination = (url) =>
      dispatch(fetchStudentsPagination(url));
    dispatchFetchStudentsPagination(url);
  };
  return (
    <Main padding ref={main}>
      <Filters
        title="Alumnos"
        placeholder="Buscar alumnos"
        search={{ search: search, setSearch: setSearch }}
        onSubmit={handleSubmitSearch}
      />
      <div>
        <div className="table-responsive-lg">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col" style={{ width: "20%" }}>
                  Nombre
                </th>
                <th scope="col" style={{ minWidth: "160px" }}>
                  Email / Username
                </th>
                <th scope="col" style={{ width: "20%" }}>
                  Inscrito
                </th>
                <th
                  className="text-center"
                  scope="col"
                  style={{ minWidth: "140px" }}
                >
                  Cuenta creada
                </th>
              </tr>
            </thead>
            <tbody>
              {studentsReducer.students &&
                studentsReducer.students.results.map((student) => (
                  <StudentRow student={student} key={student.id} />
                ))}
            </tbody>
          </table>
          {studentsReducer.isLoading && <span>Cargando...</span>}
          {studentsReducer.students &&
            (studentsReducer.students.previous ||
              studentsReducer.students.next) && (
              <div className="d-flex justify-content-center my-5">
                {studentsReducer.students.previous ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropleft
                      onClick={() =>
                        handleChangePage(studentsReducer.students.previous)
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
                {studentsReducer.students.next ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropright
                      onClick={() =>
                        handleChangePage(studentsReducer.students.next)
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

export default Students;
