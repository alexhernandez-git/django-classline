import React, { useRef, useState, useEffect } from "react";
import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";
import { AdminForm } from "src/components/ui/AdminForm";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";

import { ButtonStyle, ButtonCustom } from "src/components/ui/ButtonCustom";

import Cropper from "react-cropper";

import { Field, FieldArray } from "formik";
import { IconContext } from "react-icons";
import { FaFileAlt } from "react-icons/fa";
import styled from "@emotion/styled";
import Checkbox from "src/components/ui/Checkbox";
import { MdRemove } from "react-icons/md";
import { fetchStudents } from "../../redux/actions/shareStudents";
import { useSelector, useDispatch } from "react-redux";
const ShareForm = (props) => {
  const dispatch = useDispatch();
  const { setFieldValue, values, isEdit, errors, touched } = props;
  const cropper = useRef(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searching, setSearching] = useState(false);
  const shareStudentsReducer = useSelector(
    (state) => state.shareStudentsReducer
  );
  const [inputSearch, setInputSearch] = useState("");
  useEffect(() => {
    if (inputSearch) {
      setSearching(true);
    } else {
      setSearching(false);
    }
  }, [inputSearch]);
  React.useEffect(() => {
    if (inputSearch != "") {
      const timeoutId = setTimeout(
        () => dispatch(fetchStudents(inputSearch)),
        500
      );
      return () => clearTimeout(timeoutId);
    }
  }, [inputSearch]);
  return (
    <div className="p-4">
      <AdminForm>
        {/* <span className="m-0 font-weight-normal">Compartir con</span> */}

        <FieldArray
          name="shared_users"
          render={(arrayHelpers) => (
            <div>
              <input
                type="text"
                placeholder={"Añade a tus alumnos"}
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
              />
              {searching && (
                <div className="position-relative">
                  <StudentsContainer>
                    {!shareStudentsReducer.isLoading &&
                      shareStudentsReducer.students &&
                      shareStudentsReducer.students.results.map((student) => (
                        <StudentCard
                          key={student.id}
                          className=""
                          onClick={() => {
                            const result = values.shared_users.some(
                              (user) => user.id === student.user.id
                            );
                            if (!result) {
                              arrayHelpers.push(student.user);
                              setSearching(false);
                            } else {
                              alert("Ya estas compartiendo con este usuario");
                            }
                          }}
                        >
                          <div className="img-div">
                            <img
                              src={
                                student.user.profile.picture
                                  ? student.user.profile.picture
                                  : "../../../static/assets/img/avatar.png"
                              }
                              alt=""
                            />
                          </div>
                          <div className="ml-3">
                            <div>
                              {student.user.first_name} {student.user.last_name}
                            </div>
                            <small className="text-grey">
                              {student.user.email}
                            </small>
                          </div>
                        </StudentCard>
                      ))}
                  </StudentsContainer>
                </div>
              )}
              {values.shared_users &&
                values.shared_users.length > 0 &&
                values.shared_users.map((user, index) => (
                  <StudentSelectedCard key={index}>
                    <div className="d-flex">
                      <div className="img-div">
                        <img
                          src={
                            user.profile.picture
                              ? user.profile.picture
                              : "../../../static/assets/img/avatar.png"
                          }
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div>
                          {user.first_name} {user.last_name}
                        </div>
                        <small className="text-grey">{user.email}</small>
                      </div>
                    </div>
                    <IconContext.Provider
                      value={{
                        className: "cursor-pointer",
                        size: 30,
                      }}
                    >
                      <MdRemove onClick={() => arrayHelpers.remove(index)} />
                    </IconContext.Provider>
                  </StudentSelectedCard>
                ))}
            </div>
          )}
        />
      </AdminForm>
    </div>
  );
};
const StudentsContainer = styled.div`
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  border-radius: 0 0 1rem 1rem;
`;
const StudentCard = styled.div`
  cursor: pointer;
  margin: 1rem 0;
  padding: 0.5rem;
  display: flex;
  &:hover {
    background: #efefef;
  }
  .img-div {
    overflow: hidden;
    width: 50px;
    border-radius: 25px;
  }
  .img-div img {
    width: 100%;
  }
`;
const StudentSelectedCard = styled.div`
  margin: 1rem 0;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background: #efefef;
  }
  .img-div {
    overflow: hidden;
    width: 50px;
    border-radius: 25px;
  }
  .img-div img {
    width: 100%;
  }
`;

export default ShareForm;
