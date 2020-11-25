import React, { useEffect, useRef, useState } from "react";

import { Main } from "src/components/ui/Main";

import CourseLayout from "../components/CourseAcademy/CourseLayout";
const CourseAcademy = () => {
  return (
    <Main style={{ overflow: "hidden" }}>
      <CourseLayout isAcademy={true} />
    </Main>
  );
};

export default CourseAcademy;
