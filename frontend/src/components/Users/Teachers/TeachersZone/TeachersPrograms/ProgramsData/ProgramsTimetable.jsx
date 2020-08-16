import React, { useState, useRef, useEffect, useReducer, useContext } from 'react';
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import bootstrapPlugin from '@fullcalendar/bootstrap';
import allLocales from '@fullcalendar/core/locales-all';
import "static/assets/styles/components/Users/Teachers/TeachersProfile/TeacherCalendar.scss"
import "static/assets/styles/components/Users/Teachers/TeachersProfile/ScheduleClass/ScheduleHour.scss"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { MyProgramContext } from "src/context/ProgramContext/MyProgramContext"
import { AppContext } from "src/context/AppContext"
import { Row, Col, Modal } from 'react-bootstrap'
import { IconContext } from "react-icons";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";

import moment from 'moment'
import ProgramsEventForm from './ProgramsEventForm';
// import ClassModal from 'src/components/Users/Teachers/TeachersProfile/ClassModal';
export default function ProgramsTimetable() {
    const MySwal = withReactContent(Swal)
    const myProgramContext = useContext(MyProgramContext)
    const [args, setArgs] = useState(null)
    const calendarComponentRef = useRef(null)



    const handleDateClick = (arg) => {
        myProgramContext.handleShow()
        const newEvent = {
            id: Math.random().toString(36).substr(0, 10),
            title: 'Nuevo evento',
            start: arg.date,
            end: null,
            description: '',
            backgroundColor: ''
        }
        setArgs(newEvent)
        myProgramContext.addEvent(newEvent)


    }
    const handleEventResize = (args) => {

        myProgramContext.updateEvent({
            id: args.event.id,
            title: args.event.title,
            start: args.event.start,
            end: args.event.end,
            backgroundColor: args.event.backgroundColor != undefined ? args.event.backgroundColor : '',
            description: args.event.extendedProps.description

        })

    }
    const handleEventDrop = (args) => {
        myProgramContext.updateEvent({
            id: args.event.id,
            title: args.event.title,
            start: args.event.start,
            end: args.event.end,
            backgroundColor: args.event.backgroundColor != undefined ? args.event.backgroundColor : '',
            description: args.event.extendedProps.description,

        })

    }

    const handleEventClick = (args) => {
        myProgramContext.handleShow()

        setArgs(args.event)


    }

    return (
        <MyProgramContext.Consumer>
            {programContext => (
                <>
                    <div className='mx-auto my-2 bg-white shadow p-3 rounded overflow-auto my-4'>
                        <div className="d-md-flex justify-content-between">
                            <span className="d-none d-md-block">Crea tus eventos</span>
                        </div>
                        <FullCalendar
                            view={'timeGridWeek'}
                            defaultView={'timeGridWeek'}
                            plugins={[timeGridPlugin, interactionPlugin, bootstrapPlugin]}
                            header={{
                                left: '',
                                center: '',
                                right: ''
                            }}
                            defaultDate='2000-01-01'
                            weekends={true}
                            themeSystem='bootstrap'
                            timeZone='local'
                            locales={allLocales}
                            locale='es'
                            allDaySlot={false}
                            slotDuration='00:30:00'
                            // slotLabelInterval='00:30:00'
                            slotLabelFormat={{
                                hour: "numeric",
                                minute: "2-digit",
                                omitZeroMinute: false,
                                hour12: false,
                                meridiem: "short"
                            }}
                            minTime="06:00:00"
                            maxTime="24:00:00"
                            contentHeight="auto"
                            events={programContext.myProgramState.events}
                            eventBorderColor={'#fff'}
                            eventConstraint="businessHours"
                            droppable={true}
                            longPressDelay={0}
                            businessHours={
                                {
                                    startTime: "06:00:00",
                                    endTime: "24:00:00",
                                    daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
                                }
                            }
                            editable={true}
                            eventDurationEditable={true}
                            ref={calendarComponentRef}
                            eventLimit={true}
                            columnHeaderFormat={{ weekday: 'long' }}
                            eventOverlap={false}
                            eventResizableFromStart={false}
                            dateClick={handleDateClick}
                            eventResize={handleEventResize}
                            eventDrop={handleEventDrop}
                            eventClick={handleEventClick}
                            displayEventTime={false}
                            eventResourceEditable={true}
                            selectAllow={function (selectInfo) {
                                return moment().diff(selectInfo.start) <= 0
                            }}

                        />
                        <Modal
                            show={programContext.show}
                            size="md"
                            backdrop='false'
                            centered
                        >

                            <Modal.Body className="pt-3 border-0 rounded bg-white">
                                <div >
                                    <div className="d-flex justify-content-end">

                                        <IconContext.Provider
                                            value={{
                                                className: "global-class-name cursor-pointer",
                                                size: '20px'
                                            }}
                                        >
                                            <div
                                                onClick={programContext.handleClose}

                                            >
                                                <IoMdClose />

                                            </div>
                                        </IconContext.Provider>
                                    </div>
                                    <ProgramsEventForm args={args} />
                                </div>
                            </Modal.Body>
                        </Modal >
                    </div>

                </>
            )}
        </MyProgramContext.Consumer>
    )
}
