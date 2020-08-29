import React, { useState, useEffect } from "react";

import Filters from "src/components/Layout/Filters";

import { Main } from "src/components/Dashboard/ui/Main";

import ProfileImageForm from "src/components/Dashboard/ui/ProfileImage";
import ProfileMainInfo from "src/components/Dashboard/ui/ProfileMainInfo";
import ProfileChangePassword from "src/components/Dashboard/ui/ProfileChangePassword";
import StripeConnect from "./StripeConnect";
export default function ProfileDashboard(props) {
  return (
    <>
      <Main padding>
        <Filters title="Perfil" />
        <div className="container">
          <ProfileImageForm />
          <StripeConnect />
          <ProfileMainInfo />
          <ProfileChangePassword />
        </div>
      </Main>
    </>
  );
}
