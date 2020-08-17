import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

const InfoSlider = () => {
  const [actived, setActived] = useState(false);
  const slider = useRef();
  const [slideIndex, setSlideIndex] = useState(0);
  const settings = {
    initialSlide: 0,
    infinite: false,
    speed: 1000,
    arrows: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setSlideIndex(next),
    afterChange: (current) => setSlideIndex(current),
  };
  const settings2 = {
    initialSlide: 0,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    arrows: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <div className="shadow text-white">
        <div className="w-100">
          <div className="row bg-danger p-1 shadow">
            <div className="container text-center d-flex justify-content-center align-items-center">
              {slideIndex == 0 ? (
                <>
                  <span>
                    <IconContext.Provider
                      value={{
                        color: "grey",
                        className: "h3 mr-2 mb-0 cursor-pointer",
                      }}
                    >
                      <IoIosArrowDropleft />
                    </IconContext.Provider>
                  </span>
                  <span className="h4 m-0 p-2 cursor-pointer">Alumno</span>
                  <span
                    className="h4 m-0 p-2 cursor-pointer font-weight-lighter"
                    style={{ opacity: 0.8 }}
                    onClick={() => {
                      slider.current.slickGoTo(1);
                    }}
                  >
                    Instructor
                  </span>
                  <span>
                    <IconContext.Provider
                      value={{
                        color: "white",
                        className: "h3 ml-2 mb-0 cursor-pointer",
                      }}
                    >
                      <IoIosArrowDropright
                        onClick={() => {
                          slider.current.slickGoTo(1);
                        }}
                      />
                    </IconContext.Provider>
                  </span>
                </>
              ) : (
                <>
                  <span>
                    <IconContext.Provider
                      value={{
                        color: "white",
                        className: "h3 mr-2 mb-0 cursor-pointer",
                      }}
                    >
                      <IoIosArrowDropleft
                        onClick={() => {
                          slider.current.slickGoTo(0);
                        }}
                      />
                    </IconContext.Provider>
                  </span>
                  <span
                    className="h4 m-0 p-2 cursor-pointer font-weight-lighter"
                    style={{ opacity: 0.8 }}
                    onClick={() => {
                      slider.current.slickGoTo(0);
                    }}
                  >
                    Alumno
                  </span>

                  <span className="h4 m-0 p-2 cursor-pointer">Instructor</span>
                  <span>
                    <IconContext.Provider
                      value={{
                        color: "grey",
                        className: "h3 ml-2 mb-0 cursor-pointer",
                      }}
                    >
                      <IoIosArrowDropright />
                    </IconContext.Provider>
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="container container-info-pill">
            <Slider {...settings} ref={slider}>
              <div className="slick-element text-center p-4 d-sm-flex justify-content-around font-weight-normal">
                {/* <div className="info-pill col-md-3 d-flex flex-column align-items-center justify-content-center p-2 bg-gradient-green rounded-pill shadow">
                  <span className="font-weight-bold d-block">Tu eliges</span>
                  tu academia online
                </div>
                <div className="info-pill col-md-3 d-flex flex-column align-items-center justify-content-center p-2 bg-gradient-green rounded-pill shadow">
                  <span className="font-weight-bold d-block">
                    Sin compromiso
                  </span>
                  en tus subscripciones
                </div>
                <div className="info-pill col-md-3 d-flex flex-column align-items-center justify-content-center p-2 bg-gradient-green rounded-pill shadow">
                  <span className="font-weight-bold d-block">Acceso a</span>
                  todo el contenido
                </div> */}
              </div>

              <div className="slick-element text-center p-4 d-sm-flex justify-content-around font-weight-normal">
                {/* <div className="info-pill col-md-3 d-flex flex-column align-items-center justify-content-center p-2 bg-gradient-green rounded-pill shadow">
                  <span className="font-weight-bold d-block">Crea gratis</span>
                  tu academia online
                </div>
                <div className="info-pill col-md-3 d-flex flex-column align-items-center justify-content-center p-2 bg-gradient-green rounded-pill shadow">
                  <span className="font-weight-bold d-block">Gana dinero</span>
                  las subscripciones
                </div>
                <div className="info-pill col-md-3 d-flex flex-column align-items-center justify-content-center p-2 bg-gradient-green rounded-pill shadow">
                  <span className="font-weight-bold d-block">
                    Asinga cuentas
                  </span>
                  para tus alumnos
                </div> */}
              </div>
            </Slider>
          </div>
          <div className="d-sm-flex justify-content-center bg-gradient-green p-3">
            {/* <Link to="/courses" className="text-center d-block bg-white cursor-pointer rounded-pill text-grey px-3 py-2 m-0 h5 font-weight-normal text-secondary shadow m-2">Cursos en directo</Link> */}
            <Link
              to="/programs"
              className="text-center d-block bg-white cursor-pointer rounded-pill text-grey px-3 py-2 m-0 h5 font-weight-normal text-secondary shadow m-2"
            >
              Ver academias online
            </Link>
            {/* <Link to="/teachers" className="text-center d-block bg-white cursor-pointer rounded-pill text-grey px-3 py-2 m-0 h5 font-weight-normal text-secondary shadow m-2">Clases particulares</Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSlider;
