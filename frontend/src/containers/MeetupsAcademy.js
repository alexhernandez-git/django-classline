import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { Main } from "src/components/ui/Main";
import Layout from "src/components/Layout/Layout";
import Filters from "src/components/Layout/Filters";
import { IconContext } from "react-icons";
import { IoMdCheckmark } from "react-icons/io";
import { Modal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import styled from "@emotion/styled";
import { fetchMeetups } from "src/redux/actions/meetups";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useLocation } from "react-router-dom";
import allLocales from "@fullcalendar/core/locales-all";
const meetups = () => {
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
        };
      });
      setRecurringMeetups(newMeetups);
    }
  }, [meetupsReducer.isLoading]);
  useEffect(() => {}, [recurringMeetups]);
  const [state, setstate] = useState([
    {
      groupId: "blueEvents", // recurrent events in this group move together
      daysOfWeek: ["4"],
      startTime: "10:45:00",
      endTime: "12:45:00",
    },
    {
      daysOfWeek: ["3"], // these recurrent events move separately
      startTime: "11:00:00",
      endTime: "11:30:00",
      color: "red",
    },
    {
      id: "BoHPJDhlh6",
      title: "Nuevo evento",
      daysOfWeek: ["5"],
      startTime: "08:00:00",
      endTime: "05:00:00",
      color: "#4caf50",
    },
  ]);
  return (
    <Main padding>
      <Filters title="Videoconferencias" className="border-bottom" />
      <ContainerCalendar className="container">
        <div className="calendar">
          <FullCalendar
            view={"timeGridWeek"}
            defaultView={"timeGridWeek"}
            plugins={[timeGridPlugin]}
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
            // slotLabelInterval='00:60:00'
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
                <div className="text-grey">
                  <div className="new-line">
                    {args.event.extendedProps.description.length > 0 ? (
                      <small>{args.event.extendedProps.description}</small>
                    ) : (
                      <small>No hay descripción</small>
                    )}
                  </div>
                  <div className="mt-3">
                    {args.event.extendedProps.videoconference.length > 0 ? (
                      <small>
                        <LinkVideconference
                          target="_blank"
                          href={args.event.extendedProps.videoconference}
                        >
                          Ir a la videoconferencia
                        </LinkVideconference>
                      </small>
                    ) : (
                      <small>No hay videoconferencia</small>
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
  &:hover {
    color: #000 !important;
  }
`;
const ContainerCalendar = styled.div`
  overflow: hidden;
  overflow-x: auto;
  .calendar {
    min-width: 90rem;

    overflow-x: auto;
  }
`;
export default meetups;