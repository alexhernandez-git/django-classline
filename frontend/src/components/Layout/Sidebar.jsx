import React from "react";
import { IconContext } from "react-icons";

import { RiSecurePaymentLine } from "react-icons/ri";

const Sidebar = (props) => {
  return (
    <>
      <div className="sidebar w-100 ">
        <div className="shadow mb-3 position-relative rounded bg-white p-4">
          <p className="font-weight-bold text-primary">
            Seguridad en los pagos{" "}
            <IconContext.Provider
              value={{
                size: 20,
                className: "global-class-name",
              }}
            >
              <RiSecurePaymentLine />
            </IconContext.Provider>
          </p>
          <small className="text-info">
            Los pagos son 100% seguros gracias a Stripe
          </small>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
