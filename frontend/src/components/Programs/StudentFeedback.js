import React, { useContext, useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { IconContext } from "react-icons";
import "static/assets/styles/components/Users/Teachers/TeachersProfile/StudentFeedback.scss";
import FeedbackBars from "./StudentFeedback/FeedbackBars";
import StudentReview from "./StudentFeedback/StudentReview";

import { TeachersProfileContext } from "src/context/TeachersProfileContext/TeachersProfileContext";
import StarRating from "src/components/Layout/StarRatings";
import { ProgramContext } from "src/context/ProgramContext/ProgramContext";
import axios from "axios";
export default function TeacherPunctuation(props) {
  const [ratings, setRatings] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [ratingsToGet, setRatingsToGet] = useState(12);
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`/api/programs/${props.id}/ratings/`)
        .then((res) => {
          setRatings(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    fetchData();
  }, []);
  const getMoreRatings = async () => {
    await axios
      .get(`/api/programs/${props.id}/ratings/?limit=${ratingsToGet + 12}`)
      .then((res) => {
        setRatings(res.data);
        setRatingsToGet((ratings) => ratings + 12);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  // useEffect(() => {
  //     if (ratings.results.length > 0) {
  //         let oneStars = 0, twoStars = 0, threeStars = 0, fourStars = 0, fiveStars = 0;
  //         ratings.results.map((rating) => {
  //             if (rating.rating <= 1) {
  //                 oneStars++
  //             } else if (rating.rating <= 2) {
  //                 twoStars++
  //             } else if (rating.rating <= 3) {
  //                 threeStars++
  //             } else if (rating.rating <= 4) {
  //                 fourStars++
  //             } else if (rating.rating <= 5) {
  //                 fiveStars++
  //             }
  //         })

  //         const newArray = [fiveStars, fourStars, threeStars, twoStars, oneStars].map((percentage) => {

  //             return percentage * 100 / ratings.results.length
  //         })
  //         setPercentages(newArray);

  //     }

  // }, [ratings.results])
  return (
    <ProgramContext.Consumer>
      {(programContext) => (
        <>
          {console.log(programContext)}
          <div className="students-feedback w-100 rounded mb-3 text-grey p-4">
            <div className="mb-3">
              <span className="d-block h4 font-weight-normal text-primary text-center">
                Feedback de los alumnos
              </span>
              <div className="d-flex justify-content-center mt-3">
                <div className=" general-feedback d-flex justify-content-center align-items-center flex-column">
                  <span className="h1">
                    {programContext.programState.program.rating} / 5
                  </span>
                  <div>
                    <IconContext.Provider
                      value={{
                        className: "global-class-name text-warning",
                        size: "20px",
                      }}
                    >
                      <div className="punctuation">
                        <StarRating
                          rating={programContext.programState.program.rating}
                        />
                      </div>
                    </IconContext.Provider>
                  </div>
                  <span className="text-center">Puntuación de la academia</span>
                </div>
                {/* <div className="col-12 col-lg-9 specific-feedback">
                        {percentages.length > 0 ?
                            <>
                                {percentages.map((percentage, index) => (
                                    <>
                                        <FeedbackBars type={5 - index} percentage={percentage} />
                                    </>
                                ))}
                            </>
                            :
                            <>
                                <FeedbackBars type={5} percentage={0} />
                                <FeedbackBars type={4} percentage={0} />
                                <FeedbackBars type={3} percentage={0} />
                                <FeedbackBars type={2} percentage={0} />
                                <FeedbackBars type={1} percentage={0} />
                            </>
                        }


                    </div> */}
              </div>
            </div>
            <div className="students-reviews">
              <span className="d-block h4 font-weight-normal text-primary pb-2">
                Reseñas
              </span>
              {console.log(ratings)}
              {ratings.results.length > 0 ? (
                <>
                  {ratings.results.map((rating) => (
                    <StudentReview rating={rating} />
                  ))}
                  {ratings.next && (
                    <>
                      <span
                        className="cursor-pointer text-center d-block w-100"
                        onClick={getMoreRatings}
                      >
                        Cargar más reseñas
                      </span>
                    </>
                  )}
                </>
              ) : (
                "No hay reseñas"
              )}
            </div>
          </div>
        </>
      )}
    </ProgramContext.Consumer>
  );
}
