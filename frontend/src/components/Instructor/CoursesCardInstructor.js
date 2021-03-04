import React from "react";
import "static/assets/styles/components/Instructor/CoursesCardInstructor.scss";

export default function CoursesCardInstructor(props) {
  const { program, user, student_zone } = props;

  return (
    <div className="courses-card-instructor text-grey">
      <div className="div-img">
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
      <span
        className="h6 text-dark mb-0 mt-2"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: "2",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {program.title}
      </span>

      {user.profile.is_enterprise ? (
        <small className="d-block">{user.profile.company_name}</small>
      ) : (
        <small className="d-block">
          {user.first_name} {user.last_name}
        </small>
      )}
      {student_zone ? (
        <>
          <span className="text-dark font-weight-bold">{program.subtitle}</span>
        </>
      ) : (
        <>
          {program.actived ? (
            <span className="text-dark font-weight-bold">
              {program.program_price && program.program_price.label}
            </span>
          ) : (
            <small className="text-dark">Este programa no es público</small>
          )}
        </>
      )}

      {/* <span className="text-dark font-weight-bold">{program.program_price.label}</span><small className="ml-2 text-dark"><s>59.99€</s></small> */}
    </div>
  );
}
