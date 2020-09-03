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
const ShareForm = (props) => {
  const { setFieldValue, values, isEdit, errors, touched } = props;
  const cropper = useRef(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searching, setSearching] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  return (
    <div className="p-4">
      <AdminForm>
        {/* <span className="m-0 font-weight-normal">Compartir con</span> */}

        <FieldArray
          name="students"
          render={(arrayHelpers) => (
            <div>
              <input type="text" placeholder={"Añade a tus alumnos"} />
              <div className="position-relative">
                <StudentsContainer>
                  <StudentCard className="">
                    <div className="img-div">
                      <img src="../../../static/assets/img/avatar.png" alt="" />
                    </div>
                    <div className="ml-3">
                      <div>Alex Hernandez</div>
                      <small className="text-grey">vlexhndz@gmail.com</small>
                    </div>
                  </StudentCard>
                  <StudentCard className="">
                    <div className="img-div">
                      <img src="../../../static/assets/img/avatar.png" alt="" />
                    </div>
                    <div className="ml-3">
                      <div>Alex Hernandez</div>
                      <small className="text-grey">vlexhndz@gmail.com</small>
                    </div>
                  </StudentCard>

                  <StudentCard className="">
                    <div className="img-div">
                      <img src="../../../static/assets/img/avatar.png" alt="" />
                    </div>
                    <div className="ml-3">
                      <div>Alex Hernandez</div>
                      <small className="text-grey">vlexhndz@gmail.com</small>
                    </div>
                  </StudentCard>
                  <StudentCard className="">
                    <div className="img-div">
                      <img src="../../../static/assets/img/avatar.png" alt="" />
                    </div>
                    <div className="ml-3">
                      <div>Alex Hernandez</div>
                      <small className="text-grey">vlexhndz@gmail.com</small>
                    </div>
                  </StudentCard>
                </StudentsContainer>
              </div>
              {values.students &&
                values.students.length > 0 &&
                values.students.map((friend, index) => (
                  <div key={index}>
                    <span>{values.students[index]}</span>
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                    >
                      X
                    </button>
                  </div>
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

export default ShareForm;
