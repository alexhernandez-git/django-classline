import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select'
import { Col, Row } from 'react-bootstrap';
import Prices from "static/data/prices/eur_prices_program"
import { MyProgramContext } from "src/context/ProgramContext/MyProgramContext"

const TeachersProfilePricing = () => {


    return (
        <MyProgramContext.Consumer>
            {programContext => (
                <>

                    <Row>
                        <Col md={6} lg={4}>
                            {programContext.myProgramState.actived
                                ?
                                <>
                                    <span className="">Precio de tu programa</span>
                                    <div className="d-flex justify-content-between mt-2">
                                        <span className="font-weight-bold">{programContext.myProgramState.program_price.label}</span>

                                    </div>
                                </>
                                :
                                <>
                                    <span className="">Ponle precio a tu programa</span>
                                    <div className="d-flex justify-content-between mt-2">

                                        <Select
                                            value={programContext.myProgramState.program_price}
                                            options={Prices}
                                            onChange={programContext.changePrice}
                                            className="w-100 mr-2"
                                            searchable={false}
                                            theme={(theme) => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    text: 'orangered',
                                                    primary25: '#45948930',
                                                    primary50: '#45948952',
                                                    primary: '#459489',
                                                },
                                            })}
                                        />

                                    </div>
                                </>
                            }


                        </Col>
                    </Row>


                </>
            )}
        </MyProgramContext.Consumer>
    );
}

export default TeachersProfilePricing;
