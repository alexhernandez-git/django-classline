import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import "static/assets/styles/components/Layout/InfoSlider.scss";

const InfoSlider = () => {
  const [actived, setActived] = useState(false);
  const slider = useRef();
  const [slideIndex, setSlideIndex] = useState(0);
  const settings = {
    initialSlide: 0,
    infinite: false,
    speed: 200,
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
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
          <div className="container">
            <Slider {...settings} ref={slider}>
              <div className="info-slider slick-element text-center p-4 font-weight-normal">
                <div className="row w-100 align-items-center mb-5">
                  <div className="col-lg-5">
                    <span className="h5 text-dark d-block">
                      Forma parte de tu academia de siempre ahora completamente
                      digital
                    </span>
                    <span className="text-grey">
                      El mundo esta cambiando, no dejes pasar esta oportunidad
                    </span>
                  </div>
                  <div className="d-block d-lg-none m-2"></div>
                  <div className="col-lg-7">
                    <img src="https://via.placeholder.com/450x252" alt="" />
                  </div>
                </div>
                <div className="row w-100 align-items-center mb-5">
                  <div className="col-lg-7">
                    <img src="https://via.placeholder.com/450x252" alt="" />
                  </div>
                  <div className="d-block d-lg-none m-2"></div>
                  <div className="col-lg-5">
                    <span className="h5 text-dark d-block">
                      Comprometida con los tiempos que corren
                    </span>
                    <span className="text-grey">
                      Con nuestras academias no correras riesgo de contagiarte
                      ni de contagiar a tus seres queridos
                    </span>
                  </div>
                </div>
                <div className="row w-100 align-items-center mb-5">
                  <div className="col-lg-5">
                    <span className="h5 text-dark d-block">
                      Donde podrás acceder a classes online, videos, listas de
                      reproducción y podcasts
                    </span>
                    <span className="text-grey">
                      Te vamos a demostrar que con nuestras academias puedes
                      seguir aprendiendo y divirtiendote desde cualquier lugar
                      del mundo
                    </span>
                  </div>
                  <div className="d-block d-lg-none m-2"></div>
                  <div className="col-lg-7">
                    <img src="https://via.placeholder.com/450x252" alt="" />
                  </div>
                </div>
                <div className="row w-100 align-items-center">
                  <div className="col-lg-7">
                    <img src="https://via.placeholder.com/450x252" alt="" />
                  </div>
                  <div className="d-block d-lg-none m-2"></div>
                  <div className="col-lg-5">
                    <span className="h5 text-dark d-block">
                      I si lo pruebas y no te convence
                    </span>
                    <span className="text-grey">
                      Tienes garantizada la devolución del último pago de por
                      vida, siempre que sea la primera vez que te apuntas a esa
                      academia
                    </span>
                  </div>
                </div>
              </div>
              <div className="info-slider slick-element text-center p-4 font-weight-normal">
                <div className="row w-100 align-items-center mb-5">
                  <div className="d-block d-lg-none m-2"></div>
                  <div className="col-lg-7">
                    <img src="https://via.placeholder.com/450x252" alt="" />
                  </div>
                  <div className="col-lg-5">
                    <span className="h5 text-dark">
                      Forma parte de tu academia completamente digital
                    </span>
                  </div>
                </div>
                <div className="row w-100 align-items-center mb-5">
                  <div className="col-lg-5">
                    <span className="h5 text-dark">
                      Comprometida con los tiempos que corren
                    </span>
                  </div>
                  <div className="col-lg-7">
                    <img src="https://via.placeholder.com/450x252" alt="" />
                  </div>
                  <div className="d-block d-lg-none m-2"></div>
                </div>
                <div className="row w-100 align-items-center mb-5">
                  <div className="col-lg-7">
                    <img src="https://via.placeholder.com/450x252" alt="" />
                  </div>
                  <div className="col-lg-5">
                    <span className="h5 text-dark">
                      Donde podrás acceder a classes online, videos, listas de
                      reproducción y podcasts
                    </span>
                  </div>
                  <div className="d-block d-lg-none m-2"></div>
                </div>
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
