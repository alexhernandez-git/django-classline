import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import Prices from "static/data/prices/eur_prices_program";
import SelectPrice from "./SelectPrice";
import { Field } from "formik";

const ProgramPricing = () => {
  return (
    <Row>
      <Col md={6} lg={4}>
        <span className="">Ponle precio a tu pack</span>
        <div className="d-flex justify-content-between mt-2">
          <Field name="lang" options={Prices} component={SelectPrice} />
        </div>
      </Col>
    </Row>
  );
};

export default ProgramPricing;
