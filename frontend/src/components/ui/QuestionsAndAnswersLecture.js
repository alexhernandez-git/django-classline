import styled from "@emotion/styled";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createQuestion,
  fetchQuestions,
} from "../../redux/actions/courses/questions";
import { AdminForm } from "./AdminForm";
import { ButtonCustom } from "./ButtonCustom";
import MyCKEditor from "./MyCKEditor";
import SearchBar from "./SearchBar";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import moment from "moment";
import { textEllipsis } from "./TextEllipsis";

const QuestionSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "El titulo es muy corto")
    .max(100, "El titulo es muy largo")
    .required("Este campo es obligatorio"),
  details: Yup.string()
    .max(1000, "Los detalles son demasiado largos")
    .required("Este campo es obligatorio"),
});

const QuestionsAndAnswersLecture = ({ itemPlaying }) => {
  const dispatch = useDispatch();
  const questionsReducer = useSelector((state) => state.questionsReducer);
  console.log("itemplaying", itemPlaying);
  useEffect(() => {
    if (itemPlaying.item) {
      dispatch(fetchQuestions(itemPlaying.item.code));
    }
  }, [itemPlaying]);
  const [search, setSearch] = useState(null);
  const [handleCreateQuestion, setHandleCreateCuestion] = useState(false);
  const handleOpenCreateQuestion = () => {
    setHandleCreateCuestion(true);
  };
  const handleCloseCreateQuestion = () => {
    setHandleCreateCuestion(false);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    dispatch(fetchQuestions(itemPlaying.item.code, search));
  };
  moment.locale("es");

  return (
    <QuestionsAndAnswersContainer>
      {handleCreateQuestion ? (
        <>
          <div className="mb-4">
            <span
              className="cursor-pointer"
              onClick={handleCloseCreateQuestion}
            >
              Volver a las preguntas
            </span>
          </div>
          <Formik
            // enableReinitialize={true}
            initialValues={{
              title: "",
              details: "",
            }}
            validationSchema={QuestionSchema}
            onSubmit={(values) => {
              dispatch(createQuestion(itemPlaying.item.code, values));
              handleCloseCreateQuestion();
            }}
          >
            {(props) => {
              return (
                <Form>
                  <AdminForm>
                    <div className="my-3" style={{ color: "initial" }}>
                      <label htmlFor="question-title">Título o resumen</label>
                      <Field
                        name="title"
                        id="question-title"
                        type="text"
                        placeholder="Titulo de la pregunta"
                      />
                      {props.errors.title && props.touched.title ? (
                        <small className="d-block text-red">
                          {props.errors.title}
                        </small>
                      ) : null}
                      <label htmlFor="">Detalles</label>
                      <MyCKEditor
                        value={props.values.details}
                        handleEdit={(value) =>
                          props.setFieldValue("details", value)
                        }
                        placeholder={"Detalles de la pregunta"}
                      />
                      {props.errors.details && props.touched.details ? (
                        <small className="d-block text-red">
                          {props.errors.details}
                        </small>
                      ) : null}
                    </div>
                    <div className="d-sm-flex mt-2 justify-content-end">
                      <ButtonCustom type="submit" className="mr-2">
                        Añadir
                      </ButtonCustom>
                    </div>
                  </AdminForm>
                </Form>
              );
            }}
          </Formik>
        </>
      ) : (
        <>
          <div className="search-questions">
            <SearchBar
              onSubmit={handleSubmitSearch}
              search={{ search: search, setSearch: setSearch }}
              maxWidth
              placeholder={"Buscar preguntas de esta lección"}
            />
          </div>

          <div className="questions-list">
            <div className="header-list">
              <span>
                {questionsReducer.questions &&
                  questionsReducer.questions.results.length}{" "}
                preguntas en esta lección
              </span>
              <span
                className="cursor-pointer"
                onClick={handleOpenCreateQuestion}
              >
                Hacer otra pregunta
              </span>
            </div>
            <hr />
            {questionsReducer.isLoading && !questionsReducer.questions ? (
              "Cargando..."
            ) : (
              <>
                {questionsReducer.questions.results.map((question) => (
                  <div className="question">
                    <div className="question-img-container">
                      <img src={question.user.profile.picture} alt="" />
                    </div>
                    <div className="d-none d-sm-block m-2"></div>
                    <div>
                      <div className="question-title">
                        <span>{question.title}</span>
                      </div>
                      <div className="question-text">
                        <small
                          css={textEllipsis}
                          dangerouslySetInnerHTML={{
                            __html: question.details,
                          }}
                        />
                      </div>
                      <div className="question-info">
                        <small>
                          {question.user.first_name} {question.user.last_name}
                        </small>{" "}
                        .{" "}
                        <small>
                          {moment(question.created)
                            .subtract(5, "seconds")
                            .fromNow()}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
                {questionsReducer.questions.results.length == 0 && (
                  <small>No hay preguntas en esta lección</small>
                )}
              </>
            )}
          </div>
        </>
      )}
    </QuestionsAndAnswersContainer>
  );
};
const QuestionsAndAnswersContainer = styled.div`
  max-width: 60rem;
  margin: 3rem auto;
  label {
    margin-top: 2rem;
  }
  .search-questions {
    width: 100%;
    margin-bottom: 2rem;
    display: flex;
  }
  .questions-list {
    .header-list {
      display: flex;
      justify-content: space-between;
    }
  }
  .question {
    cursor: pointer;
    padding: 1rem;
    display: flex;
    border-bottom: 1px solid #eaeaea;
    &:hover {
      background: #f3f3f3;
    }
    /* justify-content: space-between; */
    .question-img-container {
      height: 3rem;
      width: 3rem;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
  }
`;

export default QuestionsAndAnswersLecture;
