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
import { useLocation, useHistory } from "react-router-dom";
import { setSelectedEvent } from "../../redux/actions/bookEvents";
const BookMeetups = () => {
  const { pathname } = useLocation();
  const { push } = useHistory();

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
    dispatch(setSelectedEvent(args.event));
    push(`/academy/${programReducer.program.code}/book-class`);
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
            color: meetup.backgroundColor && meetup.backgroundColor,
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
            color: meetup.backgroundColor && meetup.backgroundColor,
            videoconference: meetup.videoconference && meetup.videoconference,
            recurrent: meetup.recurrent && meetup.recurrent,
          };
        }
      });
      setRecurringMeetups(newMeetups);
    }
  }, [meetupsReducer.isLoading, meetupsReducer.meetups]);

  return (
    <ContainerCalendarDiv>
      <div
        className="mb-5 pb-5"
        style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
      >
        <Filters
          title="Aqui puedes conseguir acceso tus clases online sin necesidad de ser alumno"
          className="border-bottom"
        />
        <ContainerCalendar className="container mt-4">
          <div className="calendar">
            <FullCalendar
              view={"timeGridWeek"}
              defaultView={"timeGridWeek"}
              plugins={[timeGridPlugin, dayGridPlugin]}
              header={{
                left: "prev,next today",
                center: "title",
                right: "timeGridWeek,timeGridDay",
              }}
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
            />
          </div>
        </ContainerCalendar>
      </div>
    </ContainerCalendarDiv>
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
const ContainerCalendarDiv = styled.div`
  padding: 0;
  height: 100%;
  position: relative;
  /* background: #f9f9f9; */
  overflow-y: auto;
  overflow-x: hidden;
`;
export default BookMeetups;
