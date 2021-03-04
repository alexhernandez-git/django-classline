import React, { useContext, useState, useEffect } from 'react';
import 'rc-slider/assets/index.css';

import { AppContext } from "src/context/AppContext"
import { MyProgramContext } from "src/context/ProgramContext/MyProgramContext"

import { MdCancel } from 'react-icons/md';
import { IconContext } from "react-icons";
import { Form, Row, Col } from 'react-bootstrap'
import {FieldArray, Field} from 'formik'

export default function ProgramBenefits({ values }) {
    

    return (
        <div className="bg-white shadow p-3 rounded my-4">
            <Row className="mb-4">
                <Col className="d-md-flex justify-content-between">
                    <span className="d-none d-md-block">Beneficios del programa</span>


                </Col>
            </Row>
            <Row>

                <Col lg={{ span: 4 }} className="mb-3 text-center d-lg-flex justify-content-end align-items-center mb-2">
                    <span className="h5 font-weight-normal m-0">Beneficios del programa</span>
                </Col>

                <Col lg={{ offset: 1, span: 6 }}>
                    {/* {myProgramContext.myProgramState.benefits.length != 0 ?
                        myProgramContext.myProgramState.benefits.map(subject => ( */}
                        <FieldArray
                            name="benefits">
                            {helpers => (
                                <>
                                {values.benefits.length == 0 &&
                                    helpers.push({
                                        name: ''
                                    })
                                }
                                    {
                                        values.benefits.map((value, index) => (
                                            <div className="mb-3 position-relative" key={index}>
                                                <Field name={`benefits[${index}].name`} placeholder="Añadir beneficio" className="form-control" />
                                                <div
                                                    className="position-absolute"
                                                    style={{
                                                        top: '4px',
                                                        right: '5px'
                                                    }}
                                                >

                                                    <span>
                                                        <IconContext.Provider
                                                            value={{
                                                                className: "global-class-name cursor-pointer",
                                                                size: '25px'
                                                            }}

                                                        >
                                                            <MdCancel
                                                                onClick={() => helpers.remove(index)}
                                                            />

                                                        </IconContext.Provider>
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    < span
                                        className="cursor-pointer"
                                        onClick={() => helpers.push({
                                            name: ''
                                        })}
                                    >Añade otro beneficio...</span>
                                </>
                            )}
                        </FieldArray>
                        {/* ))

                        :
                        ''
                    } */}


                </Col>
            </Row >

        </div >
    )
}
