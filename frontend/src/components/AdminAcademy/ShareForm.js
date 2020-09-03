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
const ShareForm = (props) => {
  const { setFieldValue, values, isEdit, errors, touched } = props;
  const cropper = useRef(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searching, setSearching] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  useEffect(() => {
    if (inputSearch) {
      setSearching(true);
    } else {
      setSearching(false);
    }
  }, [inputSearch]);
  return (
    <div className="p-4">
      <AdminForm>
        {/* <span className="m-0 font-weight-normal">Compartir con</span> */}

        <FieldArray
          name="students"
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
                    <StudentCard
                      className=""
                      onClick={() => {
                        arrayHelpers.push("Alex Hernandez");
                        setSearching(false);
                      }}
                    >
                      <div className="img-div">
                        <img
                          src="../../../static/assets/img/avatar.png"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div>Alex Hernandez</div>
                        <small className="text-grey">vlexhndz@gmail.com</small>
                      </div>
                    </StudentCard>
                    <StudentCard
                      className=""
                      onClick={() => {
                        arrayHelpers.push("Alex Hernandez");
                        setSearching(false);
                      }}
                    >
                      <div className="img-div">
                        <img
                          src="../../../static/assets/img/avatar.png"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div>Alex Hernandez</div>
                        <small className="text-grey">vlexhndz@gmail.com</small>
                      </div>
                    </StudentCard>
                    <StudentCard
                      className=""
                      onClick={() => {
                        arrayHelpers.push("Alex Hernandez");
                        setSearching(false);
                      }}
                    >
                      <div className="img-div">
                        <img
                          src="../../../static/assets/img/avatar.png"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div>Alex Hernandez</div>
                        <small className="text-grey">vlexhndz@gmail.com</small>
                      </div>
                    </StudentCard>
                    <StudentCard
                      className=""
                      onClick={() => {
                        arrayHelpers.push("Alex Hernandez");
                        setSearching(false);
                      }}
                    >
                      <div className="img-div">
                        <img
                          src="../../../static/assets/img/avatar.png"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div>Alex Hernandez</div>
                        <small className="text-grey">vlexhndz@gmail.com</small>
                      </div>
                    </StudentCard>
                    <StudentCard
                      className=""
                      onClick={() => {
                        arrayHelpers.push("Alex Hernandez");
                        setSearching(false);
                      }}
                    >
                      <div className="img-div">
                        <img
                          src="../../../static/assets/img/avatar.png"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div>Alex Hernandez</div>
                        <small className="text-grey">vlexhndz@gmail.com</small>
                      </div>
                    </StudentCard>
                  </StudentsContainer>
                </div>
              )}
              {values.students &&
                values.students.length > 0 &&
                values.students.map((student, index) => (
                  <StudentSelectedCard key={index}>
                    <div className="d-flex">
                      <div className="img-div">
                        <img
                          src="../../../static/assets/img/avatar.png"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div>{values.students[index]}</div>
                        <small className="text-grey">vlexhndz@gmail.com</small>
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
