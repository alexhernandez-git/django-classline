import React from "react";

import { useSelector } from "react-redux";

import CheckoutInstructorAccounts from "./CheckoutInstructorAccounts";

const AcquireInstructorAccounts = (props) => {
  const programReducer = useSelector((state) => state.programReducer);
  const { level_adquired, current_accounts, level_pro } = props.program;
  const { areDiscount, fetchDiscount } = props.useCheckAreDiscount;
  const { handleAddAcquireAccounts, handleCancelAcquireAccounts } = props;

  return (
    <>
      <div className="d-sm-flex justify-content-between align-items-center">
        <div>
          <span className="font-weight-bold h2 d-block mb-0">
            ADQUIRIR CUENTAS DE INSTRUCTOR
          </span>
          <small>Consigue cuentas para tus instructores</small>
        </div>
        <div className="d-block m-3 d-sm-none"></div>
      </div>
      <div className="my-5 mb-4">
        <CheckoutInstructorAccounts
          program={programReducer.program}
          // pricing={pricingReducer.pricing}
          handleAddAcquireAccounts={handleAddAcquireAccounts}
          handleCancelAcquireAccounts={handleCancelAcquireAccounts}
          useCheckAreDiscount={{ areDiscount, fetchDiscount }}
        />
      </div>
      {programReducer.cancel_accounts_error &&
        programReducer.cancel_accounts_error.data.non_field_errors &&
        programReducer.cancel_accounts_error.data.non_field_errors.map(
          (error) => (
            <span className="d-block text-red text-center">{error}</span>
          )
        )}
      {programReducer.adquire_accounts_error &&
        programReducer.adquire_accounts_error.data.non_field_errors &&
        programReducer.adquire_accounts_error.data.non_field_errors.map(
          (error) => (
            <span className="d-block text-red text-center">{error}</span>
          )
        )}
      {programReducer.adquire_accounts_error &&
        programReducer.adquire_accounts_error.data.message && (
          <span className="d-block text-red text-center">
            {programReducer.adquire_accounts_error.data.message}
          </span>
        )}
      {programReducer.cancel_accounts_error &&
        programReducer.cancel_accounts_error.data.message && (
          <span className="d-block text-red text-center">
            {programReducer.cancel_accounts_error.data.message}
          </span>
        )}
      {programReducer.acquiring_accounts && (
        <div className="d-flex justify-content-center">
          <span>...Adquiriendo cuentas...</span>
        </div>
      )}
    </>
  );
};

export default AcquireInstructorAccounts;
