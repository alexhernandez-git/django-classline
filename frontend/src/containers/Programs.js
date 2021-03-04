import React, { useEffect, useState, useContext } from "react";
import ProgramsFeed from "src/components/Programs/ProgramsFeed";
import FilterBar from "src/components/Layout/FilterBar";
import Pagination from "src/components/Layout/Pagination";

import Sidebar from "src/components/Layout/Sidebar";
import axios from "axios";
import { AppContext } from "src/context/AppContext";
import { useLocation } from "react-router-dom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IconContext } from "react-icons";
const Programs = (props) => {
  const { match } = props;
  let { id } = match.params;

  const appContext = useContext(AppContext);

  const [programs, setPrograms] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  let location = useLocation();
  useEffect(() => {
    if (/\/programs(\/)?$/.test(location.pathname)) {
      async function fetchData() {
        await axios
          .get(`/api/programs/`)
          .then((res) => {
            setPrograms(() => res.data);
          })
          .catch((err) => {});
      }
      // User Loading
      fetchData();
    } else {
      async function fetchData() {
        await axios
          .get(`/api/programs/?search=${id}`)
          .then((res) => {
            setPrograms(() => res.data);
          })
          .catch((err) => {});
      }
      // User Loading
      fetchData();
    }
  }, [id]);
  const changePage = (url) => {
    window.scrollTo(0, 0);
    async function fetchData() {
      await axios
        .get(url)
        .then((res) => {
          setPrograms(() => res.data);
        })
        .catch((err) => {});
    }
    // User Loading
    fetchData();
  };
  return (
    <>
      <FilterBar results={programs.count} />

      <div className="container text-info">
        <div className="row mt-5">
          <div className="col-lg-4 d-none d-lg-block">
            <Sidebar teachers={false} courses={true} programs={false} />
          </div>
          <div className="col-lg-8">
            {programs.results.length > 0 ? (
              <>
                {programs.results.map((program) => (
                  <ProgramsFeed program={program} key={program.id} />
                ))}
                <div className="d-flex justify-content-end mb-5">
                  {programs.previous ? (
                    <IconContext.Provider
                      value={{
                        size: 60,
                        className: "cursor-pointer",
                      }}
                    >
                      <IoIosArrowDropleft
                        onClick={() => changePage(programs.previous)}
                      />
                    </IconContext.Provider>
                  ) : (
                    <IconContext.Provider
                      value={{
                        size: 60,
                        color: "#a1a1a1",
                      }}
                    >
                      <IoIosArrowDropleft />
                    </IconContext.Provider>
                  )}
                  {programs.next ? (
                    <IconContext.Provider
                      value={{
                        size: 60,
                        className: "cursor-pointer",
                      }}
                    >
                      <IoIosArrowDropright
                        onClick={() => changePage(programs.next)}
                      />
                    </IconContext.Provider>
                  ) : (
                    <IconContext.Provider
                      value={{
                        size: 60,
                        color: "#a1a1a1",
                      }}
                    >
                      <IoIosArrowDropright />
                    </IconContext.Provider>
                  )}
                </div>
              </>
            ) : (
              <span className="text-grey">No hay academias</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Programs;
