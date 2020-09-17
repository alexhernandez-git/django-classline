import React from "react";
import Card from "react-bootstrap/Card";
import "static/assets/styles/components/Courses/CoursesFeed.scss";
import { FaRegStar, FaStar } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import StarRating from "src/components/Layout/StarRatings";
import { transform } from "lodash";

export default function ProfessorFeed(props) {
  const { program } = props;
  return (
    <Link to={`/program/${program.code}`} className="disable-default-a">
      <Card className="w-100 course-feed shadow mb-3 border-0 text-grey">
        <Card.Body className="">
          <div className="course-card-content d-md-flex">
            <div className="w-sm-50" style={{ flex: "50" }}>
              <div className="card-img-container">
                <img
                  className="img-card"
                  variant="top"
                  src={
                    program.picture
                      ? program.picture
                      : "../../../static/assets/img/no-foto.png"
                  }
                />
              </div>
              <div className="course-score mt-2">
                {program.published ? (
                  <>
                    {program.program_price && (
                      <div>
                        <span className=" h5 font-weight-normal">
                          {program.program_price.label}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <span className="text-grey font-weigth-bold">
                    Esta academia es privada
                  </span>
                )}
                <div>
                  <Link
                    to={`/instructor/${program.instructor.code}`}
                    className="disable-default-a"
                  >
                    {program.instructor.profile.is_enterprise ? (
                      <span className="font-weight-normal text-grey">
                        {program.instructor.profile.company_name}
                      </span>
                    ) : (
                      <span className="font-weight-normal text-grey">
                        {program.instructor.first_name}{" "}
                        {program.instructor.last_name}
                      </span>
                    )}
                  </Link>
                </div>
                <div className="d-flex align-items-baseline">
                  <StarRating rating={program.rating} />
                  <small className="font-weight-light pl-1 d-block text-grey">
                    ({program.ratings})
                  </small>
                </div>
                {/* <IconContext.Provider
                                    value={{
                                        className: "global-class-name text-warning",
                                        size: '20px'
                                    }}>
                                    <div className="punctuation">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaRegStar />
                                        <small className="font-weight-light ml-1 d-block">(+500)</small>
                                    </div>
                                </IconContext.Provider> */}
              </div>
            </div>
            <div className="m-3 d-none d-sm-block"></div>
            <div className="w-sm-50">
              <div className="row">
                <div className="col-12">
                  <span className="font-weight-bold h5">{program.title}</span>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  {program.program_language ? (
                    <small className="text-grey d-block">
                      {program.program_language.nativeName}
                    </small>
                  ) : (
                    ""
                  )}
                  <span className="font-weight-bold text-info mb-2 d-block">
                    {program.subtitle}
                  </span>
                  <small className="course-text text-grey">
                    {program.description}
                  </small>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <small className="font-weight-bold text-info mb-2">
                    Alumnos: {program.students}
                  </small>
                </div>
              </div>
              {program.are_videos && (
                <div className="row">
                  <div className="col-12">
                    <small className="font-weight-bold text-info mb-2">
                      Videos: {program.videos}
                    </small>
                  </div>
                </div>
              )}
              {program.are_playlists && (
                <div className="row">
                  <div className="col-12">
                    <small className="font-weight-bold text-info mb-2">
                      Cursos: {program.playlists}
                    </small>
                  </div>
                </div>
              )}
              {program.are_podcasts && (
                <div className="row">
                  <div className="col-12">
                    <small className="font-weight-bold text-info mb-2">
                      Podcasts: {program.podcasts}
                    </small>
                  </div>
                </div>
              )}
              {program.are_meetups && (
                <div className="row">
                  <div className="col-12">
                    <small className="font-weight-bold text-info mb-2">
                      Clases online por setmana: {program.events}
                    </small>
                  </div>
                </div>
              )}
              {program.are_docs && (
                <div className="row">
                  <div className="col-12">
                    <small className="font-weight-bold text-info mb-2">
                      Recursos: {program.docs}
                    </small>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}
