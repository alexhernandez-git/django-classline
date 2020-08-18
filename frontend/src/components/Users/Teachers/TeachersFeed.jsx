import React from 'react'
import Card from 'react-bootstrap/Card'
import 'static/assets/styles/components/Users/Teachers/TeachersFeed.scss'
import { FaRegStar, FaStar } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { Link } from "react-router-dom"
export default function ProfessorFeed() {
    return (
        <Link to="/teacher/1" className="disable-default-a">
            <Card className="w-100 profe-feed shadow mb-3 border-0 cursor-pointer">
                <Card.Body className="">
                    <div className="profe-card-content">
                        <div>
                            <Card.Img className="rounded-circle img-card" variant="top" src={`https://source.unsplash.com/random/1`} />

                        </div>
                        <div>
                            <div className="row">
                                <div className="col-12">
                                    <span className="font-weight-bold h5 text-info">Alex Hernandez</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <small className="text-grey">España</small><br />
                                    <span className="font-weight-bold text-info mb-2">HTML, CSS, JS, React</span><br />
                                    <small className="profe-text text-grey">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ducimus vel, itaque officiis sint soluta aperiam exercitationem, rem impedit rerum, quaerat nemo! Fuga nemo qui placeat obcaecati quia quasi veniam?</small>
                                </div>
                            </div>
                        </div>
                        <div className="profe-score">
                            <div>
                                <span className="text-center h3 font-weight-normal text-danger">13 €/h</span>
                            </div>

                            <IconContext.Provider
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
                            </IconContext.Provider>

                        </div>
                    </div>

                </Card.Body>
            </Card >
        </Link>
    )
}
