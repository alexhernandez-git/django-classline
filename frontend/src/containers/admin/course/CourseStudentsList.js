import React, { useState, useEffect } from "react";
import Filters from "src/components/Layout/Filters";
import { MdEdit } from "react-icons/md";
import styled from "@emotion/styled";
import CourseStudentRow from "./CourseStudentRow";
import { IconContext } from "react-icons";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import {
  ButtonCustom,
  ButtonCustomSuccess,
} from "src/components/ui/ButtonCustom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccounts,
  createAccount,
  deleteAccount,
  resetAccountCreate,
  fetchAccountsPagination,
} from "src/redux/actions/accounts";
import { Formik, Form as FormFormik } from "formik";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { fetchCourseStudents, fetchCourseStudentsPagination } from "../../../redux/actions/courses/courseStudents";

const CourseStudentsList = ({ main }) => {

  const dispatch = useDispatch();
  const programReducer = useSelector((state) => state.programReducer);
  const courseReducer = useSelector((state) => state.courseReducer);
  useEffect(() => {
    if (!courseReducer.isLoading) {
      const dispatchFetchCourseStudents = () => dispatch(fetchCourseStudents());
      dispatchFetchCourseStudents();
    }
  }, [courseReducer.isLoading]);
  const courseStudentsReducer = useSelector((state) => state.courseStudentsReducer);

  const [show, setShow] = useState(false);

 
  const handleShow = () => setShow(true);

  const [search, setSearch] = useState("");

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const dispatchFetchCourseStudents = (search) => dispatch(fetchCourseStudents(search));
    dispatchFetchCourseStudents(search);
  };
  const handleChangePage = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchCourseStudentssPagination = (url) =>
      dispatch(fetchCourseStudentsPagination(url));
    dispatchFetchCourseStudentssPagination(url);
  };
  return (
    <div>
      <Filters
        title=" "
        placeholder="Buscar Alumnos"
        search={{ search: search, setSearch: setSearch }}
        onSubmit={handleSubmitSearch}
      />
      <div className="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col" style={{ width: "20%" }}>
                Nombre de Usuario
              </th>
 
              <th scope="col">
                Nombre completo
              </th>
              <th scope="col">Fecha de acceso</th>
            </tr>
          </thead>
          <tbody>
            {courseStudentsReducer.students &&
              courseStudentsReducer.students.results.map((student) => (
                <CourseStudentRow
                  student={student}
                  key={student.id}
                />
              ))}
          </tbody>
        </table>
        {courseStudentsReducer.isLoading && <span>Cargando...</span>}
        {courseStudentsReducer.students &&
          (courseStudentsReducer.students.previous ||
            courseStudentsReducer.students.next) && (
            <div className="d-flex justify-content-center my-5">
              {courseStudentsReducer.students.previous ? (
                <IconContext.Provider
                  value={{
                    size: 50,
                    className: "cursor-pointer",
                  }}
                >
                  <IoIosArrowDropleft
                    onClick={() =>
                      handleChangePage(courseStudentsReducer.students.previous)
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
              {courseStudentsReducer.students.next ? (
                <IconContext.Provider
                  value={{
                    size: 50,
                    className: "cursor-pointer",
                  }}
                >
                  <IoIosArrowDropright
                    onClick={() =>
                      handleChangePage(courseStudentsReducer.students.next)
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
  );
};

export default CourseStudentsList;
