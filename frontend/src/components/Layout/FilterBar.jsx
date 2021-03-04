import React, { useState, useContext, useEffect } from 'react';
import "../../../static/assets/styles/components/Layout/FilterBar.scss"
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import {
    useParams
} from "react-router-dom";
import { AppContext } from 'src/context/AppContext';
const FilterBar = (props) => {
    const appContext = useContext(AppContext)
    const [search, setSearch] = useState(useParams().id)
    useEffect(() => {

        appContext.setSearch(search)

    }, [search]);

    const [state, setState] = useState({
        isOpen: false,
    })

    function handleToggle() {
        const filterBox = document.querySelector('.filter-bar')
        const hiddenContent = document.querySelector('.hidden-content')

        if (state.isOpen == false) {
            filterBox.classList = 'filter-bar shadow toggle-size'
            filterBox.style.animation = 'openFilters linear .2s'

            hiddenContent.style.animation = 'showFilters linear .2s'

            var x = window.matchMedia("(min-width: 768px)")
            if (x.matches) { // If media query matches
                filterBox.style.height = "340px";
            } else {
                filterBox.style.height = "750px";
            }
            setState({ isOpen: true })

        }
        else {
            filterBox.classList = 'filter-bar shadow'

            filterBox.style.animation = 'closeFilters linear .2s'
            filterBox.style.height = '112px'


            setState({ isOpen: false })

        }


    }

    return (
        <>
            <div className="bg-gradient-green py-2">

                <h2 className="m-0 text-white text-center">
                    {props.isCourses ?
                        <>Cursos</>
                        :
                        <></>
                    }
                    {props.isTeachers ?
                        <>Profesores</>
                        :
                        <></>
                    }
                    {props.isPrograms ?
                        <>Academias</>
                        :
                        <></>
                    }
                </h2>
            </div>
            <div className="filter-bar shadow">
                <div className="container pt-3 pb-3">
                    {useParams().id !== undefined ?
                        <>
                            <div className="text-dark font-weight-light pb-1">
                                <span className="h5 font-weight-normal text-truncate">{props.results}</span> resultados para <span className="h5 font-weight-normal">{useParams().id}</span>
                            </div>
                        </>

                        :
                        <>
                            <div className="text-dark font-weight-light pb-2">
                                {/* <span className="text-truncate">Filtra a los profesores por tus preferencias</span> */}
                                <span className="text-truncate">Busca tu academia</span>
                            </div>
                        </>
                    }

                    {/* <div className="mt-3 d-md-flex justify-content-between">

                        <div className="div-dropdown">

                            <Dropdown className="all-filters">

                                <Dropdown.Toggle
                                    variant=""
                                    className={`btn`}
                                    id="dropdown-all-filters"
                                    onClick={() => handleToggle()}
                                >
                                    {state.isOpen == false ? 'Todos los filtros' : 'Cerrar'}

                                </Dropdown.Toggle>



                            </Dropdown>

                        </div>
                    </div>
                    <div className="mt-3 hidden-content border-top pt-3">
                        <div className="row">
                            <div className="col-md-4">
                                <p>Nivel</p>


                                {[`Todos los niveles`, `Principiante`, `Intermedio`, `Experto`].map((type, key) => (
                                    <div key={`custom-checkbox ${key}`} className="mb-3">
                                        <Form.Check
                                            custom
                                            type={`checkbox`}
                                            id={key}
                                            label={key}
                                            label={type}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="col-md-4">
                                <p>Nivel</p>


                                {[`Todos los niveles`, `Principiante`, `Intermedio`, `Experto`].map((type, key) => (
                                    <div key={`custom-checkbox ${key}`} className="mb-3">
                                        <Form.Check
                                            custom
                                            type={`checkbox`}
                                            id={key}
                                            label={key}
                                            label={type}
                                        />
                                    </div>
                                ))}
                            </div> <div className="col-md-4">
                                <p>Nivel</p>


                                {[`Todos los niveles`, `Principiante`, `Intermedio`, `Experto`].map((type, key) => (
                                    <div key={`custom-checkbox ${key}`} className="mb-3">
                                        <Form.Check
                                            custom
                                            type={`checkbox`}
                                            id={key}
                                            label={key}
                                            label={type}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> */}

                </div>
            </div >
        </>
    );
}

export default FilterBar;
