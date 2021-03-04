import React from "react";

import { useSelector } from "react-redux";

import CheckoutInstructorAccounts from "./CheckoutInstructorAccounts";

const AcquireInstructorAccounts = (props) => {
  const programReducer = useSelector((state) => state.programReducer);
  const authReducer = useSelector((state) => state.authReducer);
  const { current_accounts } = authReducer.user.teacher;
  const { areDiscount, fetchDiscount } = props.useCheckAreDiscount;
  const { handleAddAcquireAccounts, handleCancelAcquireAccounts } = props;

  return (
    <>
      <div className="d-sm-flex justify-content-between align-items-center">
        <div>
          <span className="font-weight-bold h2 d-block mb-0">
            ADQUIERE CUENTAS DE INSTRUCTORES
          </span>
          <small>Consigue cuentas para tus instructors</small>
        </div>
        <div className="d-block m-3 d-sm-none"></div>
        <div className="d-sm-flex justify-content-center align-items-center flex-column font-weight-bold">
          {/* <span>Tu Saldo</span> */}
          {current_accounts > 0 ? (
            <>
              <span className="h2 mb-0 font-weight-bold  d-block text-info">
                {current_accounts}
              </span>
              <span className="text-info">Cuentas</span>
            </>
          ) : (
            <>
              <span className="text-info">No tienes cuentas</span>
            </>
          )}
        </div>
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
      {authReducer.cancel_accounts_error &&
        authReducer.cancel_accounts_error.data.non_field_errors &&
        authReducer.cancel_accounts_error.data.non_field_errors.map((error) => (
          <span className="d-block text-red text-center">{error}</span>
        ))}
      {authReducer.adquire_accounts_error &&
        authReducer.adquire_accounts_error.data.non_field_errors &&
        authReducer.adquire_accounts_error.data.non_field_errors.map(
          (error) => (
            <span className="d-block text-red text-center">{error}</span>
          )
        )}
      {authReducer.adquire_accounts_error &&
        authReducer.adquire_accounts_error.data.message && (
          <span className="d-block text-red text-center">
            {authReducer.adquire_accounts_error.data.message}
          </span>
        )}
      {authReducer.cancel_accounts_error &&
        authReducer.cancel_accounts_error.data.message && (
          <span className="d-block text-red text-center">
            {authReducer.cancel_accounts_error.data.message}
          </span>
        )}
      {authReducer.acquiring_accounts && (
        <div className="d-flex justify-content-center">
          <span>...Adquiriendo cuentas...</span>
        </div>
      )}
    </>
  );
};

export default AcquireInstructorAccounts;
