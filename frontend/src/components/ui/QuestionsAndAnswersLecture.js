import styled from "@emotion/styled";
import React from "react";
import { useState } from "react";
import SearchBar from "./SearchBar";

const QuestionsAndAnswersLecture = () => {
  const [search, setSearch] = useState(null);
  return (
    <QuestionsAndAnswersContainer>
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
          <span className="cursor-pointer">Hacer otra pregunta</span>
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
    </QuestionsAndAnswersContainer>
  );
};
const QuestionsAndAnswersContainer = styled.div`
  max-width: 60rem;
  margin: 3rem auto;

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
