import React, { useState, useContext, useRef } from "react";
import "static/assets/styles/components/Users/Teachers/TeachersProfile/TeacherTeach.scss";
import { IconContext } from "react-icons";
import { IoMdCheckmark } from "react-icons/io";
import { ProgramContext } from "src/context/ProgramContext/ProgramContext";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import allLocales from "@fullcalendar/core/locales-all";
import { Row, Col, Modal } from "react-bootstrap";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";

const ScheduleCourse = () => {
  const teacherContext = useContext(ProgramContext);
  const calendarComponentRef = useRef(null);
  const [show, setShow] = useState(false);
  const [args, setArgs] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isOpen, setIsOpen] = useState(false);
  const handleEventClick = (args) => {
    setArgs(args);
    handleShow();
  };

  return (
    <ProgramContext.Consumer>
      {(programContext) => (
        <>
          <div className="border w-100 p-4 rounded mb-3 bg-light text-dark overflow-auto">
            <span className="d-block h4 font-weight-normal text-primary">
              Horario
            </span>
            <div className="mt-2">
              <FullCalendar
                view={"timeGridWeek"}
                defaultView={"timeGridWeek"}
                plugins={[timeGridPlugin, interactionPlugin, bootstrapPlugin]}
                header={{
                  left: "",
                  center: "",
                  right: "",
                }}
                defaultDate="2000-01-01"
                weekends={true}
                themeSystem="bootstrap"
                timeZone="local"
                locales={allLocales}
                locale="es"
                allDaySlot={false}
                slotDuration="00:30:00"
                // slotLabelInterval='00:30:00'
                slotLabelFormat={{
                  hour: "numeric",
                  minute: "2-digit",
                  omitZeroMinute: false,
                  hour12: false,
                  meridiem: "short",
                }}
                minTime="06:00:00"
                maxTime="24:00:00"
                contentHeight="auto"
                events={programContext.programState.program.events}
                eventBorderColor={"#fff"}
                eventConstraint="businessHours"
                longPressDelay={0}
                businessHours={{
                  startTime: "06:00:00",
                  endTime: "24:00:00",
                  daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                }}
                editable={false}
                eventDurationEditable={false}
                ref={calendarComponentRef}
                eventClick={handleEventClick}
                eventLimit={true}
                columnHeaderFormat={{ weekday: "long" }}
                eventOverlap={false}
                eventResizableFromStart={false}
                displayEventTime={false}
                eventResourceEditable={true}
                selectAllow={function (selectInfo) {
                  return moment().diff(selectInfo.start) <= 0;
                }}
              />
              <Modal show={show} size="md" centered onHide={handleClose}>
                <Modal.Body className="pt-3 border-0 rounded bg-white text-dark">
                  <div>
                    <div className="d-flex justify-content-between">
                      <span className="h5">Información de la clase</span>
                      <IconContext.Provider
                        value={{
                          className: "global-class-name cursor-pointer",
                          size: "20px",
                        }}
                      >
                        <div onClick={handleClose}>
                          <IoMdClose />
                        </div>
                      </IconContext.Provider>
                    </div>
                    <div className="mt-3 text-grey">
                      {args ? (
                        <>
                          <div className="">
                            {args.event.title.length > 0 ? (
                              <div className="h4">{args.event.title}</div>
                            ) : (
                              "No hay titulo"
                            )}
                          </div>
                          <div className="mt-3">
                            <div className="h4">Descripción</div>
                            {args.event.extendedProps.description.length > 0
                              ? args.event.extendedProps.description
                              : "No hay descripción"}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
          {/* 
            <div className="w-100 p-4 rounded mb-3  bg-light text-dark">

                <span className="d-block h4 font-weight-normal text-primary text-center">Duración</span>
                <div className="h-100 d-flex justify-content-center">
                    <span className="h3 text-grey mb-0 font-weight-normal mt-3">30 horas</span>

                </div>
            </div> */}
        </>
      )}
    </ProgramContext.Consumer>
  );
};

export default ScheduleCourse;
