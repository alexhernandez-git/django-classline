import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";

import { Main } from "src/components/ui/Main";
import Layout from "src/components/Layout/Layout";
import Filters from "src/components/Layout/Filters";
import allLocales from "@fullcalendar/core/locales-all";
import { Modal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import EventForm from "src/components/AdminAcademy/EventForm";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  ButtonCustom,
  ButtonCustomSuccess,
  ButtonCustomError,
} from "src/components/ui/ButtonCustom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMeetups,
  createMeetup,
  editMeetup,
  deleteMeetup,
} from "src/redux/actions/meetups";
import styled from "@emotion/styled";
import moment from "moment";
const meetups = () => {
  const dispatch = useDispatch();
  const programReducer = useSelector((state) => state.programReducer);

  useEffect(() => {
    if (!programReducer.isLoading) {
      const dispatchFetchMeetups = () => dispatch(fetchMeetups());
      dispatchFetchMeetups();
    }
  }, [programReducer.isLoading]);
  const meetupsReducer = useSelector((state) => state.meetupsReducer);

  const [show, setShow] = useState(false);
  const [args, setArgs] = useState(null);
  const [price, setPrice] = useState(null);

  const handleClose = () => {
    setIsEdit(false);

    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const MySwal = withReactContent(Swal);
  const [classData, setClassData] = useState({
    id: Math.random().toString(36).substr(0, 10),
    title: "Nuevo evento",
    start: null,
    description: "",
    videoconference: "",
    backgroundColor: "",
    recurrent: false,
    bookable: false,
    price: 0,
  });

  useEffect(() => {
    if (args != null) {
      setClassData({
        id: args.id,
        title: args.title,
        start: args.start,
        backgroundColor:
          args.backgroundColor != undefined ? args.backgroundColor : "",
        description:
          args.description != null
            ? args.description
            : args.extendedProps.description,
        videoconference:
          args.videoconference != null
            ? args.videoconference
            : args.extendedProps.videoconference,
        recurrent:
          args.recurrent != null
            ? args.recurrent
            : args.extendedProps.recurrent,
        bookable:
          args.bookable != null ? args.bookable : args.extendedProps.bookable,
        // price: args.price != null ? args.price : args.extendedProps.price,
      });
    }
  }, [args]);

  const handleSave = (e) => {
    e.preventDefault();
    updateEvent(classData);
    handleClose();
  };
  const addEvent = () => {
    const dispatchCreateMeetup = (args) => dispatch(createMeetup(args));
    dispatchCreateMeetup({ ...args, price: price });
    // setEvents((events) => [...events, args]);
    handleClose();
  };
  const updateEvent = (event, newPrice = null) => {
    setIsEdit(false);
    const dispatchEditMeetup = (event) => dispatch(editMeetup(event));
    if (newPrice) {
      dispatchEditMeetup({ ...event, newPrice: price });
    } else {
      dispatchEditMeetup({ ...event, price: price });
    }
    // setEvents((events) =>
    //   events.map((e) => (e.id == event.id ? { ...e, ...event } : e))
    // );
  };
  const deleteEvent = (event) => {
    const dispatchDeleteMeetup = (id) => dispatch(deleteMeetup(id));
    dispatchDeleteMeetup(event.id);
    // setEvents((events) => events.filter((e) => e.id !== event.id));
  };

  const handleEventClick = (args) => {
    setIsEdit(true);
    setArgs(args.event);
    setPrice(args.event.extendedProps.price);
    handleShow();
  };
  const handleDateClick = (arg) => {
    handleShow();
    const newEvent = {
      id: Math.random().toString(36).substr(0, 10),
      title: "Nuevo evento",
      start: arg.date,
      end: null,
      description: "",
      videoconference: "",
      backgroundColor: "",
      recurrent: true,
      bookable: false,
    };
    setArgs(newEvent);
    setPrice(0);
  };
  const handleEventResize = (args) => {
    updateEvent(
      {
        id: args.event.id,
        title: args.event.title,
        start: args.event.start,
        end: args.event.end,
        backgroundColor:
          args.event.backgroundColor != undefined
            ? args.event.backgroundColor
            : "",
        description: args.event.extendedProps.description,
        videoconference: args.event.extendedProps.videoconference,
        day_of_week: args.event.extendedProps.day_of_week,
        recurrent: args.event.extendedProps.recurrent,
        bookable: args.event.extendedProps.bookable,
        price: args.event.extendedProps.price,
      },
      args.event.extendedProps.price
    );
    setPrice(args.event.extendedProps.price);
  };
  const handleEventDrop = (args) => {
    updateEvent(
      {
        id: args.event.id,
        title: args.event.title,
        start: args.event.start,
        end: args.event.end,
        backgroundColor:
          args.event.backgroundColor != undefined
            ? args.event.backgroundColor
            : "",
        description: args.event.extendedProps.description,
        videoconference: args.event.extendedProps.videoconference,
        day_of_week: args.event.extendedProps.day_of_week,
        recurrent: args.event.extendedProps.recurrent,
        bookable: args.event.extendedProps.bookable,
        price: args.event.extendedProps.price,
      },
      args.event.extendedProps.price
    );
  };

  // const handleEventClick = (args) => {
  //     handleShow()

  //     setArgs(args.event)

  // }
  const handleDelete = (e) => {
    e.preventDefault();
    MySwal.fire({
      title: "Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        deleteEvent(args);

        handleClose();

        return Swal.fire({
          icon: "success",
          title: "Eliminado",
        });
      }
    });
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
            bookable: meetup.bookable && meetup.bookable,
            price: meetup.price && meetup.price,
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
            bookable: meetup.bookable && meetup.bookable,
            price: meetup.price && meetup.price,
          };
        }
      });
      setRecurringMeetups(newMeetups);
    }
  }, [meetupsReducer.isLoading, meetupsReducer.meetups]);
  useEffect(() => {
    console.log(recurringMeetups);
  }, [recurringMeetups]);
  return (
    <Main padding>
      <Filters title="Clases online" className="border-bottom" />
      <ContainerCalendar className="container mt-4">
        <div className="calendar">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            locales={allLocales}
            view={"timeGridWeek"}
            defaultView={"timeGridWeek"}
            header={{
              left: "prev,next today",
              center: "title",
              right: "timeGridWeek,timeGridDay",
            }}
            weekends={true}
            themeSystem="bootstrap"
            timeZone="local"
            locale="es"
            allDaySlot={false}
            slotDuration="00:15:00"
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
            editable={true}
            eventDurationEditable={true}
            dateClick={handleDateClick}
            eventResize={handleEventResize}
            eventDrop={handleEventDrop}
            eventClick={handleEventClick}
            eventLimit={true}
            columnHeaderFormat={{ weekday: "long" }}
            eventOverlap={false}
            eventResizableFromStart={true}
            displayEventTime={false}
            eventResourceEditable={true}
            selectAllow={function (selectInfo) {
              return moment().diff(selectInfo.start) <= 0;
            }}
          />
        </div>
      </ContainerCalendar>

      <Modal show={show} onHide={handleClose} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Creación del eventos</Modal.Title>
        </Modal.Header>
        <EventForm
          args={args}
          isEdit={isEdit}
          setArgs={setArgs}
          handleSave={handleSave}
          classData={classData}
          setClassData={setClassData}
          price={price}
          setPrice={setPrice}
        />
        <Modal.Footer>
          {isEdit ? (
            <>
              <ButtonCustomError onClick={handleDelete}>
                Eliminar
              </ButtonCustomError>
              <ButtonCustom onClick={handleSave}>Guardar</ButtonCustom>
            </>
          ) : (
            <ButtonCustom onClick={addEvent}>Crear</ButtonCustom>
          )}
        </Modal.Footer>
      </Modal>
    </Main>
  );
};
const ContainerCalendar = styled.div`
  overflow: hidden;
  overflow-x: auto;
  .calendar {
    min-width: 90rem;

    overflow-x: auto;
  }
`;
export default meetups;
