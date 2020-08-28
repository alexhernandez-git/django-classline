import React, { useState, useEffect } from "react";

import Layout from "src/components/Layout/Layout";
import Filters from "src/components/Layout/Filters";
import Video from "src/components/ui/Video";
import styled from "@emotion/styled";
import { Main } from "src/components/ui/Main";

import { fetchVideos } from "src/redux/actions/videos";
import { useDispatch, useSelector } from "react-redux";

import { AdminForm } from "src/components/ui/AdminForm";
import { Form, Row, Col } from "react-bootstrap";
import { Field } from "formik";
import ProfileImageForm from "src/components/Dashboard/ui/ProfileImage";
import ProfileMainInfo from "src/components/Dashboard/ui/ProfileMainInfo";
import ProfileChangePassword from "src/components/Dashboard/ui/ProfileChangePassword";

export default function ProfileDashboard() {
  return (
    <>
      <Main padding>
        <Filters title="Perfil" />
        <div className="container">
          <ProfileImageForm />
          <ProfileMainInfo />
          <ProfileChangePassword />
        </div>
      </Main>
    </>
  );
}
