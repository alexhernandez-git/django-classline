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
import styled from "@emotion/styled";
import { SketchPicker } from "react-color";
import useOutsideClick from "../../hooks/useOutsideClick";

const TopicConfiguration = (props) => {
  const {color} = props.values
  const {setFieldValue} = props
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
  const handleChangeComplete = (color) => {
    setFieldValue('color', color.hex)
  };
  const [showColor, setShowColor] = useState(false)
  const handleCloseColor = () =>{
    setShowColor(false)
  }
  const handleShowColor = ()=>{
    setShowColor(true)
  }
  const colorRef = useRef()

  useOutsideClick(colorRef, () => {
    if (showColor) {
      handleCloseColor(false)
      
    }
  });
  return (
    <>
    
        <div className="bg-white border p-3 rounded my-2 mb-4">
        <span className="d-none d-md-block">Ponle un color al tema</span>

          <Row className="">
            <Col
              lg={{ span: 4 }}
              className="text-center d-lg-flex justify-content-end align-items-center"
            >
              <span className="m-0 font-weight-normal">Color</span>
            </Col>

            <Col lg={{ offset: 1, span: 6 }}>
                <ColorPickerDiv>
                  <DemoColor onClick={handleShowColor}>
                    <div className="color-div" style={{background:color ? color : "#323840"}}>
                    </div>
                  </DemoColor>
                  <div ref={colorRef}>
                    {showColor &&
                      <div className="color-picker-div">

                        <SketchPicker
                          color={{hex:color ? color : "#323840"}}
                          onChange={handleChangeComplete}
                          />
                      </div>
                    }
                  </div>
                </ColorPickerDiv>
            </Col>
          </Row>
        </div>
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
const DemoColor = styled.div`
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  padding: 1rem;
  max-width: 5rem;
  border-radius: 1rem;
  cursor:pointer;
  .color-div{
    padding: 1rem;
  }
  @media screen and (max-width: 991px) {
  margin: auto;
  }

`
const ColorPickerDiv = styled.div`
  position: relative;
  z-index: 50;
  .color-picker-div{
    position:absolute;
    @media screen and (max-width: 991px) {
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
`


export default TopicConfiguration;