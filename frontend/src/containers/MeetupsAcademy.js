import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";

import allLocales from "@fullcalendar/core/locales-all";
import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";
import { Modal } from "react-bootstrap";
import styled from "@emotion/styled";
import { fetchMeetups } from "src/redux/actions/meetups";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useLocation } from "react-router-dom";
import { ButtonCustom } from "../components/ui/ButtonCustom";
const MeetupsAcademy = () => {
  const { pathname } = useLocation();

  const meetupsReducer = useSelector((state) => state.meetupsReducer);
  const programReducer = useSelector((state) => state.programReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!programReducer.isLoading) {
      const dispatchFetchMeetups = () => dispatch(fetchMeetups());
      dispatchFetchMeetups();
    }
  }, [programReducer.isLoading]);
  const [show, setShow] = useState(false);
  const [args, setArgs] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    !/\/demo\//.test(pathname) && setShow(true);
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleEventClick = (args) => {
    setArgs(args);
    handleShow();
  };
  const [recurringMeetups, setRecurringMeetups] = useState([]);
  useEffect(() => {
    if (!meetupsReducer.isLoading && meetupsReducer.meetups) {
      const newMeetups = meetupsReducer.meetups.map((meetup) => {
        if (meetup.recurrent) {
          const date = moment(meetup.start);
          const dow = date.day();
          return {
            id: meetup.id,
            title: meetup.title && meetup.title,
            description: meetup.description && meetup.description,
            daysOfWeek: [dow],
            startTime: moment(meetup.start).format("HH:mm:ss"),
            endTime: moment(meetup.end).format("HH:mm:ss"),
            color: meetup.color && meetup.color,
            videoconference: meetup.videoconference && meetup.videoconference,
            recurrent: meetup.recurrent && meetup.recurrent,
          };
        } else {
          return {
            id: meetup.id,
            title: meetup.title && meetup.title,
            description: meetup.description && meetup.description,
            start: meetup.start,
            end: meetup.end,
            color: meetup.color && meetup.color,
            videoconference: meetup.videoconference && meetup.videoconference,
            recurrent: meetup.recurrent && meetup.recurrent,
          };
        }
      });
      setRecurringMeetups(newMeetups);
    }
  }, [meetupsReducer.isLoading, meetupsReducer.meetups]);

  return (
    <Main padding>
      <Filters title="Clases online" className="border-bottom" />
      <ContainerCalendar className="container mt-4">
        <div className="calendar">
          <FullCalendar
            view={"timeGridWeek"}
            defaultView={"timeGridWeek"}
            plugins={[timeGridPlugin]}
            weekends={true}
            themeSystem="bootstrap"
            timeZone="local"
            locales={allLocales}
            locale="es"
            allDaySlot={false}
            slotDuration="00:30:00"
            // slotLabelInterval='00:60:00'
            slotLabelFormat={{
              hour: "numeric",
              minute: "2-digit",
              omitZeroMinute: false,
              hour12: false,
              meridiem: "short",
            }}
            minTime="07:00:00"
            maxTime="23:00:00"
            contentHeight="auto"
            events={recurringMeetups}
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
            // ref={calendarComponentRef}
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
            firstDay={moment().day()}
          />
        </div>
      </ContainerCalendar>

      <Modal show={show} size="md" centered onHide={handleClose}>
        {args ? (
          <>
            <Modal.Header closeButton>
              <span className="h3 mb-0">
                {args.event.title.length > 0
                  ? args.event.title
                  : "No hay titulo"}
              </span>
            </Modal.Header>
            <Modal.Body className="border-0 rounded bg-white text-dark">
              <div>
                <div className="text-center">
                  <div className="new-line">
                    {args.event.extendedProps.description.length > 0 ? (
                      <span>{args.event.extendedProps.description}</span>
                    ) : (
                      <span>No hay descripción</span>
                    )}
                  </div>
                  {console.log(args.event.start)}
                  <div className="mt-3">
                    <div>
                      <small>
                        Inicio:{" "}
                        {moment(args.event.start).format("D/M/Y hh:mm:ss")}
                      </small>
                    </div>
                    <div>
                      <small>
                        Fin:{" "}
                        {args.event.end
                          ? moment(args.event.end).format("D/M/Y hh:mm:ss")
                          : moment(args.event.start)
                              .add(1, "hours")
                              .format("D/M/Y hh:mm:ss")}
                      </small>
                    </div>
                  </div>
                  <div className="mt-3 d-flex justify-content-center">
                    {args.event.extendedProps.videoconference.length > 0 ? (
                      <ButtonCustom>
                        <LinkVideconference
                          target="_blank"
                          href={args.event.extendedProps.videoconference}
                        >
                          Ir a la videoconferencia
                        </LinkVideconference>
                      </ButtonCustom>
                    ) : (
                      <span>No hay videoconferencia</span>
                    )}
                  </div>
                </div>
              </div>
            </Modal.Body>
          </>
        ) : (
          ""
        )}
      </Modal>
    </Main>
  );
};
const LinkVideconference = styled.a`
  color: #fff !important;
`;
const ContainerCalendar = styled.div`
  overflow: hidden;
  overflow-x: auto;
  .calendar {
    min-width: 90rem;

    overflow-x: auto;
  }
`;
export default MeetupsAcademy;
