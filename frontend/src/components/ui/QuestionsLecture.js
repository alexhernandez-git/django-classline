import styled from "@emotion/styled";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createQuestion,
  fetchQuestions,
  fetchQuestionsIncrease,
} from "../../redux/actions/courses/questions";
import {
  removeQuestion,
  setQuestion,
} from "../../redux/actions/courses/answers";
import { AdminForm } from "./AdminForm";
import { ButtonCustom } from "./ButtonCustom";
import MyCKEditor from "./MyCKEditor";
import SearchBar from "./SearchBar";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import moment from "moment";
import { textEllipsis } from "./TextEllipsis";
import AnswersLecture from "./AnswersLecture";
import { IconContext } from "react-icons/lib";
import { FiAlertCircle } from "react-icons/fi";

const QuestionSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "El titulo es muy corto")
    .max(100, "El titulo es muy largo")
    .required("Este campo es obligatorio"),
  details: Yup.string()
    .max(1000, "Los detalles son demasiado largos")
    .required("Este campo es obligatorio"),
});

const QuestionsLecture = ({ itemPlaying, isDemo }) => {
  const dispatch = useDispatch();
  const questionsReducer = useSelector((state) => state.questionsReducer);
  const answersReducer = useSelector((state) => state.answersReducer);
  const [handleCreateQuestion, setHandleCreateCuestion] = useState(false);
  const [search, setSearch] = useState(null);
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
  const [limit, setLimit] = useState(12);
  const fetchMoreQuestions = () => {
    const dispatchFetchQuestionsIncrease = (limit, search) =>
      dispatch(fetchQuestionsIncrease(itemPlaying.item.code, limit, search));
    dispatchFetchQuestionsIncrease(limit + 12, search);
    setLimit((limit) => limit + 12);
  };
  const handleSetQuestion = (question) => {
    dispatch(setQuestion(question));
  };
  useEffect(() => {
    if (itemPlaying.item) {
      dispatch(fetchQuestions(itemPlaying.item.code));
    }
    setHandleCreateCuestion(false);
    dispatch(removeQuestion());
  }, [itemPlaying]);
  return (
    <>
      {answersReducer.question ? (
        <>
          <AnswersLecture itemPlaying={itemPlaying} />
        </>
      ) : (
        <QuestionsAndAnswersContainer>
          {!isDemo ? (
            <>
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
                              <label htmlFor="question-title">
                                Título o resumen
                              </label>
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
                          questionsReducer.questions.count}{" "}
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
                    {questionsReducer.isLoading &&
                    !questionsReducer.questions ? (
                      "Cargando..."
                    ) : (
                      <>
                        {questionsReducer.questions.results.map((question) => (
                          <div
                            className="question"
                            key={question.id}
                            onClick={() => handleSetQuestion(question)}
                          >
                            <div className="question-img-container">
                              <img
                                src={
                                  question.user.profile.picture
                                    ? question.user.profile.picture
                                    : "/static/assets/img/avatar.png"
                                }
                                alt=""
                              />
                            </div>
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
                                  {question.user.first_name}{" "}
                                  {question.user.last_name}
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
                        {questionsReducer.questions.next && (
                          <div className="d-flex justify-content-center">
                            <ButtonCustom
                              onClick={fetchMoreQuestions}
                              className="w-100"
                              type="button"
                            >
                              Cargar más preguntas
                            </ButtonCustom>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <PremiumContent>
                <IconContext.Provider
                  value={{
                    size: 25,
                    className: "global-class-name mr-2 cursor-pointer",
                  }}
                >
                  <FiAlertCircle />
                </IconContext.Provider>
                Contenido premium, accede a el adquiriendo el curso
              </PremiumContent>
            </>
          )}
        </QuestionsAndAnswersContainer>
      )}
    </>
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
    display: grid;
    grid-template-columns: 3rem 1fr;
    grid-column-gap: 1rem;
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
const PremiumContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 15rem 2rem;
`;
export default QuestionsLecture;
