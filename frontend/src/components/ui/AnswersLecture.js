import styled from "@emotion/styled";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AdminForm } from "./AdminForm";
import { ButtonCustom } from "./ButtonCustom";
import MyCKEditor from "./MyCKEditor";
import SearchBar from "./SearchBar";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import moment from "moment";
import { textEllipsis } from "./TextEllipsis";
import {
  fetchAnswers,
  removeQuestion,
  fetchAnswersIncrease,
  createAnswer,
} from "../../redux/actions/courses/answers";

const AnswerSchema = Yup.object().shape({
  message: Yup.string()
    .max(1000, "Los detalles son demasiado largos")
    .required("Este campo es obligatorio"),
});

const AnswersLecture = ({ itemPlaying }) => {
  const dispatch = useDispatch();
  const questionsReducer = useSelector((state) => state.questionsReducer);
  const answersReducer = useSelector((state) => state.answersReducer);
  const question = answersReducer.question;
  console.log("itemplaying", itemPlaying);

  const [search, setSearch] = useState(null);

  moment.locale("es");
  const [limit, setLimit] = useState(12);
  const fetchMoreAnswers = () => {
    const dispatchFetchAnswersIncrease = (limit, search) =>
      dispatch(fetchAnswersIncrease(question, limit, search));
    dispatchFetchAnswersIncrease(limit + 12, search);
    setLimit((limit) => limit + 12);
  };
  const handleRemoveQuestion = () => {
    dispatch(removeQuestion());
  };
  useEffect(() => {
    if (question) {
      dispatch(fetchAnswers(question));
    }
  }, [question]);
  return (
    <AnswersContainer>
      <div className="mb-5">
        <span className="cursor-pointer" onClick={handleRemoveQuestion}>
          Volver a las preguntas
        </span>
      </div>
      <>
        <div className="question" key={question.id}>
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
                {moment(question.created).subtract(5, "seconds").fromNow()}
              </small>
            </div>
          </div>
        </div>
      </>
      <>
        <div className="questions-list">
          <div className="header-list">
            <span>
              {answersReducer.answers && answersReducer.answers.count}{" "}
              respuestas
            </span>
          </div>
          <hr />

          {answersReducer.isLoading && !answersReducer.answers ? (
            "Cargando..."
          ) : (
            <>
              {answersReducer.answers.results.map((answer) => (
                <div className="answer" key={answer.id}>
                  <div className="answer-img-container">
                    <img
                      src={
                        answer.user.profile.picture
                          ? answer.user.profile.picture
                          : "/static/assets/img/avatar.png"
                      }
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="answer-text">
                      <small
                        dangerouslySetInnerHTML={{
                          __html: answer.message,
                        }}
                      />
                    </div>
                    <div className="answer-info">
                      <small>
                        {answer.user.first_name} {answer.user.last_name}
                      </small>{" "}
                      .{" "}
                      <small>
                        {moment(answer.created)
                          .subtract(5, "seconds")
                          .fromNow()}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
              {answersReducer.answers.results.length == 0 && (
                <small>No hay respuestas</small>
              )}
              {answersReducer.answers.next && (
                <div className="d-flex justify-content-center">
                  <ButtonCustom
                    onClick={fetchMoreAnswers}
                    className="w-100"
                    type="button"
                  >
                    Cargar más respuestas
                  </ButtonCustom>
                </div>
              )}
            </>
          )}
          <>
            <Formik
              // enableReinitialize={true}
              initialValues={{
                message: "",
              }}
              validationSchema={AnswerSchema}
              onSubmit={(values, { resetForm }) => {
                dispatch(createAnswer(values));
                resetForm({ message: "" });
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <AdminForm>
                      <div className="my-3" style={{ color: "initial" }}>
                        <MyCKEditor
                          value={props.values.message}
                          handleEdit={(value) =>
                            props.setFieldValue("message", value)
                          }
                          placeholder={"Añadir respuesta"}
                        />
                        {props.errors.message && props.touched.message ? (
                          <small className="d-block text-red">
                            {props.errors.message}
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
        </div>
      </>
    </AnswersContainer>
  );
};
const AnswersContainer = styled.div`
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
    margin-bottom: 2rem;
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
  .answer {
    cursor: pointer;
    padding: 1rem;
    display: grid;
    grid-template-columns: 3rem 1fr;
    grid-column-gap: 1rem;

    border-bottom: 1px solid #eaeaea;

    /* justify-content: space-between; */
    .answer-img-container {
      height: 3rem;
      width: 3rem;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
  }
`;

export default AnswersLecture;
