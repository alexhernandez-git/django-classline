import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import "static/assets/styles/components/Layout/InfoSlider.scss";
import { AppContext } from "src/context/AppContext";
import Swal from "sweetalert2";

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
    draggable: false,
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
    <AppContext.Consumer>
      {(appContext) => (
        <>
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

                      <span className="h4 m-0 p-2 cursor-pointer">
                        Instructor
                      </span>
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
                          Forma parte de tu academia de siempre, ahora
                          completamente digital
                        </span>
                        <span className="text-grey">
                          El mundo esta cambiando, no dejes pasar esta
                          oportunidad
                        </span>
                      </div>
                      <div className="d-block d-lg-none m-2"></div>
                      <div className="col-lg-7">
                        <img
                          className="rounded shadow"
                          src="static/assets/img/main-page-pictures/main-page-platform.png"
                          alt=""
                        />
                      </div>
                    </div>
                    {/* <div className="row w-100 align-items-center mb-5">
                  <div className="col-lg-7 order-3">
                    <img
                      src="static/assets/img/main-page-pictures/main-page.png"
                      alt=""
                    />
                  </div>
                  <div className="d-block d-lg-none m-2 order-2"></div>
                  <div className="col-lg-5 order-1">
                    <span className="h5 text-dark d-block">
                      Comprometida con los tiempos que corren
                    </span>
                    <span className="text-grey">
                      Con nuestras academias no correras riesgo de contagiarte
                      ni de contagiar a tus seres queridos
                    </span>
                  </div>
                </div> */}
                    <div className="row w-100 align-items-center mb-5">
                      <div className="col-lg-7 order-3">
                        <img
                          className="rounded shadow"
                          src="static/assets/img/main-page-pictures/main-page.png"
                          alt=""
                        />
                      </div>
                      <div className="d-block d-lg-none m-2 order-2"></div>
                      <div className="col-lg-5 order-1">
                        <span className="h5 text-dark d-block">
                          Donde podrás acceder a classes online, videos, cursos
                          ,podcasts, documentos y archivos
                        </span>
                        <span className="text-grey">
                          Te vamos a demostrar que con nuestras academias puedes
                          seguir aprendiendo y divirtiéndote desde tu casa o
                          cualquier lugar del mundo
                        </span>
                      </div>
                    </div>
                    <div className="row w-100 align-items-center mb-5">
                      <div className="col-lg-5 order-1">
                        <span className="h5 text-dark d-block">
                          Con nuestra propia aplicación móvil para android
                        </span>
                        <span className="text-grey">
                          Mira el contenido cuando y donde quieras con la
                          flexibilidad que te aportará nuestra aplicación para
                          android <br />
                          (ios próximamente)
                        </span>
                      </div>
                      <div className="d-block d-lg-none m-2 order-2"></div>
                      <div className="col-lg-7 order-3">
                        <div className="d-flex justify-content-between">
                          <img
                            src="static/assets/img/main-page-pictures/movil.PNG"
                            alt=""
                            className="shadow"
                            style={{
                              height: "252px",
                              width: "auto",
                              borderRadius: "1rem",
                            }}
                          />
                          <img
                            src="static/assets/img/main-page-pictures/tablet.PNG"
                            alt=""
                            className="rounded shadow d-none d-sm-block"
                            style={{ height: "252px", width: "auto" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-100 align-items-center mb-3">
                      <div className="col">
                        <span className="h5 text-dark d-block">
                          ¡Mira nuestras academias!
                        </span>
                        <span className="text-grey"> Te esperamos</span>
                        <div className=" mt-3">
                          <Link to="/programs">
                            <span className="btn-green py-2 px-3 text-white h5">
                              Ver academias
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="info-slider slick-element text-center p-4 font-weight-normal">
                    <div className="row w-100 align-items-center mb-5">
                      <div className="col-lg-7 order-3">
                        <img
                          className="rounded shadow"
                          src="static/assets/img/main-page-pictures/admin-panel.png"
                          alt=""
                        />
                      </div>
                      <div className="d-block d-lg-none m-2 order-2"></div>
                      <div className="col-lg-5 order-1">
                        <span className="h5 text-dark d-block">
                          Puedes llevar a tu actual academia al siguiente nivel
                          o puedes empezar desde cero
                        </span>
                        <span className="text-grey">
                          Todo lo que tengas que enseñar es bienvenido en
                          Classline Academy
                        </span>
                      </div>
                    </div>
                    <div className="row w-100 align-items-center mb-5">
                      <div className="col-lg-5">
                        <span className="h5 text-dark d-block">
                          Si ya tienes una academia puedes ofrecer tu plataforma
                          a tus actuales alumnos adquiriendo cuentas de usuario
                        </span>
                        <span className="text-grey">
                          De esta forma multiplicarás el valor que aportas a tus
                          actuales alumnos, y tienes un periodo de prueba de 14
                          dias
                        </span>
                      </div>
                      <div className="d-block d-lg-none m-2"></div>
                      <div className="col-lg-7">
                        <img
                          className="rounded shadow"
                          src="static/assets/img/main-page-pictures/pricing.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="row w-100 align-items-center mb-5">
                      <div className="col-lg-7 order-3">
                        <img
                          className="rounded shadow"
                          src="static/assets/img/main-page-pictures/create-playlist.png"
                          alt=""
                        />
                      </div>
                      <div className="d-block d-lg-none m-2 order-2"></div>
                      <div className="col-lg-5 order-1">
                        <span className="h5 text-dark d-block">
                          Si no tienes una academia no te preocupes de nada
                        </span>
                        <span className="text-grey">
                          Empieza a crear tu academia online, nosotros te
                          llevamos el tema de los pagos, todo el marketing, y
                          por supuesto la academia digital, por eso hemos
                          asignado una comissión del 25% por cada alumno
                          suscrito
                        </span>
                      </div>
                    </div>
                    <div className="row w-100 align-items-center">
                      <div className="col">
                        <span className="h5 text-dark d-block">
                          ¡Conviertete en instructor ya!
                        </span>
                        <span className="text-grey"> Te esperamos</span>
                        <div className=" mt-3">
                          {appContext.userProfile.is_authenticated ? (
                            <Link to="/myzone/instructor">
                              <span className="btn-green py-2 px-3 text-white h5">
                                Ir a instructor
                              </span>
                            </Link>
                          ) : (
                            <span
                              className="btn-green py-2 px-3 text-white h5 cursor-pointer"
                              onClick={() => {
                                Swal.fire({
                                  text:
                                    "Para acceder a la zona de instructor primero debes estar logueado",
                                  icon: "warning",
                                  confirmButtonText: "Ok",
                                });
                              }}
                            >
                              Ir a instructor
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </>
      )}
    </AppContext.Consumer>
  );
};

export default InfoSlider;
