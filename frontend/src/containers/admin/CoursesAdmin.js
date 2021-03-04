import React, { useRef, useState, useEffect } from "react";
import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";
import { ButtonCustom } from "src/components/ui/ButtonCustom";

import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ContainerWrapper from "src/components/ui/Container";

import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IconContext } from "react-icons";
import styled from "@emotion/styled";
import {
  createCourse,
  fetchCourses,
  fetchCoursesPagination,
} from "../../redux/actions/courses/courses";
import CourseCard from "../../components/CourseAcademy/CourseCard";
const CoursesAdmin = () => {
  const history = useHistory();
  const main = useRef();

  const dispatch = useDispatch();
  const programReducer = useSelector((state) => state.programReducer);

  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program) {
      const dispatchFetchCourses = () => dispatch(fetchCourses());
      dispatchFetchCourses();
    }
  }, [programReducer.isLoading]);
  const coursesReducer = useSelector((state) => state.coursesReducer);
  const [search, setSearch] = useState("");
  const handleSubmitSearch = (e) => {
    e.preventDefault();

    const dispatchFetchCourses = (search) => dispatch(fetchCourses(search));
    dispatchFetchCourses(search);
  };
  const handleChangePage = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchCoursesPagination = (url) =>
      dispatch(fetchCoursesPagination(url));
    dispatchFetchCoursesPagination(url);
  };
  const handleCreateCourse = () => {
    const dispatchCreateCourse = (history) => {
      dispatch(createCourse(history));
    };
    dispatchCreateCourse(history);
  };
  return (
    <Main padding ref={main}>
      <ContainerWrapper>
        <Filters
          title="Cursos"
          placeholder="Buscar curso"
          search={{ search: search, setSearch: setSearch }}
          onSubmit={handleSubmitSearch}
        />
        <div className="d-flex justify-content-end mb-3">
          <ButtonCustom onClick={handleCreateCourse}>Nuevo curso</ButtonCustom>
        </div>
        <div className="row">
          <div className="col-12">
            <GridVideos>
              {coursesReducer.courses &&
                coursesReducer.courses.results.map((course) => (
                  <CourseCard course={course} key={course.id} type="ADMIN" />
                ))}
            </GridVideos>
            {coursesReducer.isLoading && <span>Cargando...</span>}
            {coursesReducer.courses &&
              (coursesReducer.courses.previous ||
                coursesReducer.courses.next) && (
                <div className="d-flex justify-content-center my-5">
                  {coursesReducer.courses.previous ? (
                    <IconContext.Provider
                      value={{
                        size: 50,
                        className: "cursor-pointer",
                      }}
                    >
                      <IoIosArrowDropleft
                        onClick={() =>
                          handleChangePage(coursesReducer.courses.previous)
                        }
                      />
                    </IconContext.Provider>
                  ) : (
                    <IconContext.Provider
                      value={{
                        size: 50,
                        color: "#a1a1a1",
                      }}
                    >
                      <IoIosArrowDropleft />
                    </IconContext.Provider>
                  )}
                  {coursesReducer.courses.next ? (
                    <IconContext.Provider
                      value={{
                        size: 50,
                        className: "cursor-pointer",
                      }}
                    >
                      <IoIosArrowDropright
                        onClick={() =>
                          handleChangePage(coursesReducer.courses.next)
                        }
                      />
                    </IconContext.Provider>
                  ) : (
                    <IconContext.Provider
                      value={{
                        size: 50,
                        color: "#a1a1a1",
                      }}
                    >
                      <IoIosArrowDropright />
                    </IconContext.Provider>
                  )}
                </div>
              )}
          </div>
        </div>
      </ContainerWrapper>
    </Main>
  );
};
export const GridVideos = styled.div`
  display: grid;
  grid-gap: 4rem 2rem;

  grid-template-columns: repeat(3, 1fr);
  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export default CoursesAdmin;
