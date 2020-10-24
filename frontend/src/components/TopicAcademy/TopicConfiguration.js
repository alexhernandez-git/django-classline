import React, { useRef, useState, useEffect, useContext } from "react";

import { Form, Row, Col } from "react-bootstrap";

import Select from "react-select";
import Lenguages from "static/data/languages";
import {

  ButtonCustomError,
} from "src/components/ui/ButtonCustom";
import { useDispatch, useSelector } from "react-redux";
import {

  removeTopic,
} from "src/redux/actions/topics/topic";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link, useHistory, useParams } from "react-router-dom";

const TopicConfiguration = (props) => {
  const MySwal = withReactContent(Swal);
  const { program } = useParams();
  const dispatch = useDispatch();
  const topicReducer = useSelector((state) => state.topicReducer);
  const authReducer = useSelector((state) => state.authReducer);
  const history = useHistory()


  const handleRemoveTopic = () => {
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
        const dispatchRemoveTopic = (history) => dispatch(removeTopic(history));
        dispatchRemoveTopic(history);
      }
    });
  };
  return (
    <>
    
      <div className="bg-white border p-3 rounded my-2 mb-4">
        <span className="d-none d-md-block">Acciones</span>

      
        <Row className="mb-4">
          <Col
            sm={{ span: 4 }}
            className="text-center d-sm-flex justify-content-end align-items-center"
          >
            <span className="m-0 font-weight-normal">Eliminar el tema</span>
          </Col>

          <Col sm={{ offset: 1, span: 6 }}>
            <ButtonCustomError type="button" onClick={handleRemoveTopic}>
              Eliminar
            </ButtonCustomError>

            {topicReducer.removing_topic_error &&
              topicReducer.removing_topic_error.data.message && (
                <small className="d-block text-red">
                  {topicReducer.removing_topic_error.data.message}
                </small>
              )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default TopicConfiguration;