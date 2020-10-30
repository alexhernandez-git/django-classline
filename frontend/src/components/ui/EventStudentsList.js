import React from 'react'
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'
import { IconContext } from 'react-icons/lib'
import { useSelector } from 'react-redux'
import moment from "moment"
const EventStudentsList = () => {
    const meetupStudentsReducer = useSelector(state => state.meetupStudentsReducer)
    return (
        <div className="table-responsive-lg">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col" style={{ width: "20%" }}>
                  Nombre
                </th>
                <th scope="col" style={{ minWidth: "160px" }}>
                  Email / Username
                </th>
                <th scope="col" style={{ width: "20%" }}>
                  Inscrito
                </th>
              </tr>
            </thead>
            <tbody>
              {meetupStudentsReducer.students &&
                meetupStudentsReducer.students.results.map((student_meetup) => (
                    <tr className="position-relative">
                        <td>
                        {student_meetup.user.first_name} {student_meetup.user.last_name}
                        </td>
                        <td>{student_meetup.user.username}</td>
                        <td>{moment(student_meetup.created).format("DD/MM/YY")}</td>
                    </tr>
                ))}
            </tbody>
          </table>
          {meetupStudentsReducer.isLoading && <span>Cargando...</span>}
          {meetupStudentsReducer.students &&
            (meetupStudentsReducer.students.previous ||
              meetupStudentsReducer.students.next) && (
              <div className="d-flex justify-content-center my-5">
                {meetupStudentsReducer.students.previous ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropleft
                      onClick={() =>
                        handleChangePage(meetupStudentsReducer.students.previous)
                      }
                    />
                  </IconContext.Provider>
                ) : (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      color: "#a1a1a1",
                    }}
                  >
                    <IoIosArrowDropleft />
                  </IconContext.Provider>
                )}
                {meetupStudentsReducer.students.next ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropright
                      onClick={() =>
                        handleChangePage(meetupStudentsReducer.students.next)
                      }
                    />
                  </IconContext.Provider>
                ) : (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      color: "#a1a1a1",
                    }}
                  >
                    <IoIosArrowDropright />
                  </IconContext.Provider>
                )}
              </div>
            )}
        </div>
    )
}

export default EventStudentsList
