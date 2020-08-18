import React, { useState, useEffect, useContext } from 'react'
import { MyProgramContext } from "src/context/ProgramContext/MyProgramContext"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Form } from 'react-bootstrap'
import { CirclePicker } from 'react-color';
export default function ProgramsEventForm(props) {
    const MySwal = withReactContent(Swal)

    const myProgramContext = useContext(MyProgramContext)

    const [classData, setClassData] = useState({
        id: Math.random().toString(36).substr(0, 10),
        title: 'Nuevo evento',
        start: null,
        description: '',
        backgroundColor: ''
    })
    
    useEffect(() => {

        if (props.args != null) {
            setClassData({
                id: props.args.id,
                title: props.args.title,
                start: props.args.start,
                backgroundColor: props.args.backgroundColor != undefined ? props.args.backgroundColor : '',
                description: props.args.description != null ? props.args.description : props.args.extendedProps.description,
            })
        }
    }, [props.args])
    const handleSave = (e) => {
        e.preventDefault()
        myProgramContext.updateEvent(classData)
        myProgramContext.handleClose()

    }
    const handleDelete = (e) => {
        e.preventDefault()
        MySwal.fire({
            title: 'Estas seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {

                myProgramContext.deleteEvent(classData)

                myProgramContext.handleClose()

                return Swal.fire({
                    icon: 'success',
                    title: 'Eliminado',
                })
            }
        })

    }
    const handleChangeComplete = (color) => {
        setClassData({ ...classData, backgroundColor: color.hex });
    };
    return (
        <MyProgramContext.Consumer>
            {programContext => (
                <>
                    <div className="mt-2 text-grey">
                        <Form.Group>
                            <Form.Control
                                size="lg"
                                type="text"
                                value={classData.title}
                                onChange={(e) => setClassData({ ...classData, title: e.target.value })}
                                placeholder="Añade un titulo"
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="3"
                                value={classData.description}
                                onChange={(e) => setClassData({ ...classData, description: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Color del evento</Form.Label>
                            <CirclePicker
                                color={classData.backgroundColor}
                                onChangeComplete={handleChangeComplete}
                            />
                        </Form.Group>
                        <div className="d-sm-flex justify-content-between">
                            <button className="btn-red py-2 px-3 btn-sm-block" onClick={handleDelete}>
                                Borrar
                            </button>
                            <button className="btn-green py-2 px-3 text-white btn-sm-block" onClick={handleSave}>
                                Guardar
                            </button>
                        </div>
                    </div>

                </>
            )}
        </MyProgramContext.Consumer>
    )
}
