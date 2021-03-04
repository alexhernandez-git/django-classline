import React from "react";
import "static/assets/styles/components/Layout/ProgramCard.scss";
import { Link } from "react-router-dom";
const ProgramCard = (props) => {
  const data = props.data;
  return (
    <div>
      <div
        className="my-program-card mt-4 d-flex justify-content-between rounded bg-white shadow overflow-hidden"
        style={{
          height: "120px",
        }}
      >
        <img
          className="h-100 rounded-left"
          style={{
            width: "100px",
            objectFit: "cover",
          }}
          variant="top"
          src={
            data.picture
              ? data.picture
              : "../../../static/assets/img/no-foto.png"
          }
        />

        <div className="my-course d-flex justify-content-between w-100 p-4">
          <div className="title-div d-flex flex-column justify-content-between  text-break">
            <div className=" text-break">
              <span
                className="font-weight-bold text-break"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {data.title !== "" ? data.title : "Nombre del programa"}
              </span>
            </div>

            <small
              style={{
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data.program_price ? data.program_price.label : "00,00€ por més"}
            </small>
          </div>

          <div className="d-none d-lg-flex  align-items-center justify-content-center flex-column">
            <span className="m-0 font-weight-normal">
              {data.students ? data.students : 0}
            </span>
            <small>Alumnos</small>
          </div>
          <div className="d-none d-lg-flex align-items-center justify-content-center  flex-column">
            {data.published ? (
              <>
                <small>Estado</small>
                <span className="h5 m-0 text-secondary">Publicado</span>
              </>
            ) : (
              <>
                <small>Estado</small>
                <span className="h5 m-0 text-red">No publicado</span>
              </>
            )}
          </div>
        </div>

        <Link
          to={`/academy/${data.code}/`}
          target="_blank"
          className="d-none link-admin-panel d-lg-flex justify-content-center align-items-center bg-gradient-green text-break text-center"
        >
          Ir a la academia
        </Link>
      </div>
      <Link
        target="_blank"
        to={`/academy/${data.code}/`}
        className="d-flex link-admin-panel d-lg-none justify-content-center align-items-center bg-gradient-green p-1 w-100 text-break text-center"
      >
        Ir a la academia
      </Link>
    </div>
  );
};

export default ProgramCard;
