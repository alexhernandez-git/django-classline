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
import { useLocation, useHistory, Link } from "react-router-dom";
import { setSelectedEvent } from "../../redux/actions/bookEvents";
import { ButtonCustom } from "./ButtonCustom";
const BookMeetups = (props) => {
  const { isAcademy } = props;
  const { pathname } = useLocation();
  const { push } = useHistory();

  const meetupsReducer = useSelector((state) => state.meetupsReducer);
  const bookEventsReducer = useSelector((state) => state.bookEventsReducer);
  const programReducer = useSelector((state) => state.programReducer);
  const authReducer = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!programReducer.isLoading) {
      const dispatchFetchMeetups = () => dispatch(fetchMeetups());
      dispatchFetchMeetups();
    }
  }, [programReducer.isLoading]);
  const [show, setShow] = useState(false);
  const [args, setArgs] = useState(null);

  const handleEventClick = (args) => {
    setArgs(args);
    dispatch(setSelectedEvent(args.event));
    if (isAcademy) {
      push(`/academy/${programReducer.program.code}/checkout-class-academy`);
    } else {
      push(`/academy/${programReducer.program.code}/checkout-class`);
    }
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
            price: meetup.price && meetup.price,
            currency: meetup.currency && meetup.currency,
            bookable: meetup.bookable && meetup.bookable,
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
            price: meetup.price && meetup.price,
            currency: meetup.currency && meetup.currency,
            bookable: meetup.bookable && meetup.bookable,
          };
        }
      });
      setRecurringMeetups(newMeetups.filter((meetup) => meetup.bookable));
    }
  }, [meetupsReducer.isLoading, meetupsReducer.meetups]);
  const [showMyMeetups, setShowMyMeetups] = useState(false);

  const handleGoToLogin = () => {
    if (isAcademy) {
      push(`/academy/${programReducer.program.code}/login-academy`);
    } else {
      push(`/academy/${programReducer.program.code}/login`);
    }
  };
  return (
    <>
      <ContainerCalendarDiv>
        <div
          className="mb-5 pb-5"
          style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
        >
          <Filters title="Reservar clases online" className="border-bottom" />
          <div className="mt-4 d-flex justify-content-end container">
            <MyButton
              className={
                showMyMeetups
                  ? "my-button button-1"
                  : "my-button button-1 selected"
              }
              onClick={() => setShowMyMeetups(false)}
            >
              Ver todas las clases
            </MyButton>
            <MyButton
              className={
                showMyMeetups
                  ? "my-button button-2 selected"
                  : "my-button button-2"
              }
              onClick={() =>
                authReducer.isAuthenticated
                  ? setShowMyMeetups(true)
                  : handleGoToLogin()
              }
            >
              Ver mis clases
            </MyButton>
          </div>
          <ContainerCalendar className="container mt-4">
            <div className="calendar">
              <FullCalendar
                view={"timeGridWeek"}
                defaultView={"timeGridWeek"}
                plugins={[timeGridPlugin, dayGridPlugin]}
                header={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
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
                events={
                  showMyMeetups ? bookEventsReducer.events : recurringMeetups
                }
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
        </div>
      </ContainerCalendarDiv>
    </>
  );
};
const MyButton = styled.span`
  text-align: center;
  cursor: pointer;
  border: 0;
  padding: 0.4em 0.65em;
  font-size: 1em;
  line-height: 1.5;
  background: var(--gradient);
  color: #fff;
  &.button-1 {
    border-radius: 0.25em 0 0 0.25em;
  }
  &.button-2 {
    border-radius: 0 0.25em 0.25em 0;
  }
  &.selected {
    opacity: 0.8;
  }
  /* &:active {
    position: relative;
    top: 1px;
  } */
`;
const ContainerCalendar = styled.div`
  overflow: hidden;
  overflow-x: auto;
  .calendar {
    min-width: 90rem;

    overflow-x: auto;
  }
  .fc-button {
    box-shadow: none !important;

    background: var(--gradient) !important;
    border: 0 !important;
  }
  .fc-button:focus {
    box-shadow: none !important;
  }
  .fc-button-active {
    opacity: 0.8;
  }
  .fc-button-group > .fc-button:not(:first-child) {
    margin-left: 0 !important;
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
