import React, { useEffect } from "react";
import {
  Switch,
  Route,
  useParams,
  Redirect,
  useHistory,
} from "react-router-dom";

import Layout from "src/components/Layout/LayoutPack";
import "static/assets/styles/styles.scss";
import ScrollToTop from "src/utils/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, resetAuthErrors, setIsInstructor } from "../redux/actions/auth";
import { fetchProgram } from "../redux/actions/program";
import { Helmet } from "react-helmet";
import VideosPack from "../containers/pack/VideosPack";
import VideoPack from "../containers/pack/VideoPack";
import PodcastsPack from "../containers/pack/PodcastsPack";
import { fetchPack } from "../redux/actions/studentPack";
const Pack = () => {
  const dispatch = useDispatch();
  const router = useParams();
  const history = useHistory();
  const programId = router.program;
  const packId = router.pack;
  const programReducer = useSelector((state) => state.programReducer);
  const studentPackReducer = useSelector((state) => state.studentPackReducer);
  const authReducer = useSelector((state) => state.authReducer);
  useEffect(() => {
    dispatch(resetAuthErrors());
  }, [history.location]);

  useEffect(() => {
    if (programId) {
      const dispatchFetchProgram = (id) => dispatch(fetchProgram(id));
      dispatchFetchProgram(programId);
    }
  }, [programId]);
  useEffect(() => {
    if (packId, programId) {
      const dispatchFetchPack = (programId, packId) => dispatch(fetchPack(programId,packId));
      dispatchFetchPack(programId, packId);
    }
  }, [packId, programId]);
  useEffect(() => {
    if (
      !programReducer.isLoading &&
      programReducer.program &&
      !studentPackReducer.isLoading &&
      studentPackReducer.pack
    ) {
      const dispatchLoadUser = () => dispatch(loadUser());
      dispatchLoadUser();
    }
  }, [programReducer.isLoading, studentPackReducer.isLoading]);
  const haveAccess = () => studentPackReducer.pack.students.some(student => student == authReducer.user.id)
  
  const redirectIfNotVideo = () =>{
    if (studentPackReducer.pack.are_podcasts) {
      return `/pack/${programId}/${packId}/podcasts`
    }else{
      return `/academy/${programId}/packs`

    }
  }

  return programReducer.isLoading || studentPackReducer.isLoading || authReducer.isLoading ? (
    "Cargando..."
  )  : (
  //  !authReducer.user ?  (
  //     <Redirect to={`/academy/${programId}/packs`}/>
  //   ) : (
    <>
      <Helmet>
        <title>Classline - {studentPackReducer.pack.title}</title>
      </Helmet>
      <ScrollToTop />

      <Switch>
        {authReducer.isLoading ? (
          "Cargando..."
        ) : !authReducer.isAuthenticated ?<Redirect to={`/academy/${programId}/packs`}/> :haveAccess() ? (
          <Layout>
            <Route
              exact
              path="/pack/:program/:pack/videos/:search?"
              component={
                studentPackReducer.pack.are_videos
                  ? VideosPack
                  : () => <Redirect to={redirectIfNotVideo()} />
              }
            />
            <Route
              exact
              path="/pack/:program/:pack/podcasts/:search?"
              component={
                studentPackReducer.pack.are_podcasts
                  ? PodcastsPack
                  : () => <Redirect to={`/academy/${programId}/packs`} />
              }
            />
            
            <Route
              exact
              path="/pack/:program/:pack/video/:id"
              component={
                studentPackReducer.pack.are_videos
                ? VideoPack
                : () => <Redirect to={redirectIfNotVideo()} />}
            />
          </Layout>
        ) : (
          () => <Redirect to={`/academy/${programId}/packs`} />
        )}
      </Switch>
    </>
    // )
  );
};
export default Pack;
