import styled from "@emotion/styled";
import React from "react";
import { useState } from "react";
import { AdminForm } from "./AdminForm";
import { ButtonCustom } from "./ButtonCustom";
import MyCKEditor from "./MyCKEditor";
import SearchBar from "./SearchBar";

const QuestionsAndAnswersLecture = () => {
  const [search, setSearch] = useState(null);
  const [createQuestion, setCreateCuestion] = useState(false);
  const handleOpenCreateQuestion = () => {
    setCreateCuestion(true);
  };
  const handleCloseCreateQuestion = () => {
    setCreateCuestion(false);
  };
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    details: "",
  });
  return (
    <QuestionsAndAnswersContainer>
      {createQuestion ? (
        <>
          <div className="mb-4">
            <span
              className="cursor-pointer"
              onClick={handleCloseCreateQuestion}
            >
              Volver a las preguntas
            </span>
          </div>
          <AdminForm>
            <div className="my-3" style={{ color: "initial" }}>
              <label htmlFor="question-title">Título o resumen</label>
              <input
                id="question-title"
                type="text"
                placeholder="Titulo de la pregunta"
              />
              <label htmlFor="">Detalles</label>
              <MyCKEditor
                value={newQuestion.details}
                handleEdit={(value) =>
                  setNewQuestion({ ...newQuestion, details: value })
                }
                placeholder={"Detalles de la pregunta"}
              />
            </div>
            <div className="d-sm-flex mt-2 justify-content-end">
              <ButtonCustom onClick={(e) => {}} className="mr-2">
                Añadir
              </ButtonCustom>
            </div>
          </AdminForm>
        </>
      ) : (
        <>
          <div className="search-questions">
            <SearchBar
              search={{ search: search, setSearch: setSearch }}
              maxWidth
              placeholder={"Buscar preguntas de esta lección"}
            />
          </div>

          <div className="questions-list">
            <div className="header-list">
              <span>32 preguntas en esta lección</span>
              <span
                className="cursor-pointer"
                onClick={handleOpenCreateQuestion}
              >
                Hacer otra pregunta
              </span>
            </div>
            <hr />
            <div className="question">
              <div className="question-img-container">
                <img src="/static/assets/img/avatar.png" alt="" />
              </div>
              <div className="d-none d-sm-block m-2"></div>
              <div>
                <div className="question-title">
                  <span>Saving document efwwaea</span>
                </div>
                <div className="question-text">
                  <small>awfefaewewafewafwe</small>
                </div>
                <div className="question-info">
                  <small>Alex Hernandez</small> . <small>Hace 2 horas</small>
                </div>
              </div>
            </div>
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
