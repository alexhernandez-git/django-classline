import React, { useState, useEffect, useContext } from "react";
import { CirclePicker } from "react-color";
import { AdminForm } from "src/components/ui/AdminForm";
import { CheckboxCustom } from "../ui/Checkbox";
import NumberFormat from "react-number-format";
import { useSelector, useDispatch } from "react-redux";
import { ButtonCustom } from "../ui/ButtonCustom";
import EventStudentsList from "../ui/EventStudentsList";
import { fetchStudents } from "../../redux/actions/meetupStudents";
export default function EventForm(props) {
  const meetupsReducer = useSelector((state) => state.meetupsReducer);
  const meetupStudentsReducer = useSelector(state => state.meetupStudentsReducer)
  
  const {
    classData,
    setClassData,
    args,
    setArgs,
    isEdit,
    price,
    setPrice,
  } = props;
  const dispatch = useDispatch()

  const handleChangeComplete = (color) => {
    if (isEdit) {
      setClassData({
        ...classData,
        color: color.hex,
      });
    } else {
      setArgs({ ...args, color: color.hex });
    }
    setColor(color.hex);
  };
  const [color, setColor] = useState("");
  useEffect(() => {
    if (args && classData) {
      setColor(isEdit ? classData.color : args.color);
      console.log(color);
    }
  }, [args, classData]);
  const [showStudents, setShowStudents] = useState(false)
  const handleShowStudents = () =>{
    if (isEdit) {   
      setShowStudents(true)
    }
  }
  const handleCloseStudents = () =>{
    setShowStudents(false)
  }
  useEffect(() => {
    if (isEdit) {
      dispatch(fetchStudents(args.id, args))
    }
  }, [])
  return (
    <div className="p-4">
      <AdminForm>
        {showStudents ? 
        <>
          <div className="mb-4">
            <ButtonCustom onClick={handleCloseStudents}>Volver</ButtonCustom>
          </div>
          <EventStudentsList/>
        </>
        :
        <>
        <label>Titulo</label>

        <input
          type="text"
          value={classData.title}
          onChange={(e) =>
            isEdit
              ? setClassData({ ...classData, title: e.target.value })
              : setArgs({ ...args, title: e.target.value })
          }
          placeholder="Añade un titulo"
        />
        {meetupsReducer.meetup_create_error && 
          meetupsReducer.meetup_create_error.data.title && 
          meetupsReducer.meetup_create_error.data.title.map(error=>(
                <small className="d-block text-red">{error}</small>
        ))}
        {meetupsReducer.meetup_edit_error && 
        meetupsReducer.meetup_edit_error.data.title && 
        meetupsReducer.meetup_edit_error.data.title.map(error=>(
                  <small className="d-block text-red">{error}</small>
        ))}
        <label className="mt-4">Descripción</label>
        <textarea
          as="textarea"
          rows="3"
          value={classData.description}
          onChange={(e) =>
            isEdit
              ? setClassData({ ...classData, description: e.target.value })
              : setArgs({ ...args, description: e.target.value })
          }
        />
        {meetupsReducer.meetup_create_error && 
          meetupsReducer.meetup_create_error.data.description && 
          meetupsReducer.meetup_create_error.data.description.map(error=>(
                <small className="d-block text-red">{error}</small>
        ))}
        {meetupsReducer.meetup_edit_error && 
        meetupsReducer.meetup_edit_error.data.description && 
        meetupsReducer.meetup_edit_error.data.description.map(error=>(
              <small className="d-block text-red">{error}</small>
        ))}
        <label className="mt-4">Clase online</label>

        <CheckboxCustom className="mb-5">
          <input
            type="checkbox"
            checked={classData.online_class}
            onChange={(e) => {
              isEdit
                ? setClassData({
                    ...classData,
                    online_class: e.target.checked,
                  })
                : setArgs({ ...args, online_class: e.target.checked });
            }}
          />
          <span className="checkmark"></span>
        </CheckboxCustom>
        {classData.online_class && (
          <>
        <label className="mt-4">Enlace de ZOOM (o similares)</label>
        <input
        rows="3"
        value={classData.videoconference}
        onChange={(e) =>
          isEdit
              ? setClassData({ ...classData, videoconference: e.target.value })
              : setArgs({ ...args, videoconference: e.target.value })
            }
            />
              {meetupsReducer.meetup_create_error && 
                meetupsReducer.meetup_create_error.data.videoconference && 
                meetupsReducer.meetup_create_error.data.videoconference.map(error=>(
                      <small className="d-block text-red">{error}</small>
              ))}
            {meetupsReducer.meetup_edit_error && 
                meetupsReducer.meetup_edit_error.data.videoconference && 
                meetupsReducer.meetup_edit_error.data.videoconference.map(error=>(
                      <small className="d-block text-red">{error}</small>
              ))}
          </>
        )}
        <label className="mt-4">Evento recurrente</label>

        <CheckboxCustom className="mb-5">
          <input
            type="checkbox"
            checked={classData.recurrent}
            onChange={(e) => {
              isEdit
              ? setClassData({ ...classData, recurrent: e.target.checked })
                : setArgs({ ...args, recurrent: e.target.checked });
              }}
          />
          <span className="checkmark"></span>
        </CheckboxCustom>
              <label className="mt-4">Evento reservable</label>
      
              <CheckboxCustom className="mb-5">
                <input
                  type="checkbox"
                  checked={classData.bookable}
                  onChange={(e) => {
                    isEdit
                      ? setClassData({
                          ...classData,
                          bookable: e.target.checked,
                        })
                      : setArgs({ ...args, bookable: e.target.checked });
                  }}
                />
                <span className="checkmark"></span>
              </CheckboxCustom>
              {classData.bookable && (
                <>
                  {console.log(classData)}
                  <label className="mt-4">Precio</label>
                  <NumberFormat
                    value={price}
                    thousandSeparator={true}
                    prefix={"€"}
                    onValueChange={(values) => {
                      const { value, floatValue } = values;
      
                      if (floatValue > 0 && floatValue) {
                        setPrice(floatValue.toFixed(2));
                      }
                    }}
                    
                  />
                    {meetupsReducer.meetup_create_error && 
                      meetupsReducer.meetup_create_error.data.price && 
                      meetupsReducer.meetup_create_error.data.price.map(error=>(
                            <small className="d-block text-red">{error}</small>
                    ))}
                    {meetupsReducer.meetup_edit_error && 
                      meetupsReducer.meetup_edit_error.data.price && 
                      meetupsReducer.meetup_edit_error.data.price.map(error=>(
                            <small className="d-block text-red">{error}</small>
                    ))}
                  {(isEdit && !meetupStudentsReducer.isLoading && meetupStudentsReducer.students) &&
                  <>
                  
                    <label className="mt-4">Alumnos: {meetupStudentsReducer.students.results.length}</label>
                    <div className="mt-2 mb-2">
                      <ButtonCustom onClick={handleShowStudents}>Ver Alumnos</ButtonCustom>
                    </div>
                  </>
                  }
                </>
              )}

        <label className="mt-4">Color del evento</label>
        <CirclePicker color={color} onChangeComplete={handleChangeComplete} />
        </>
      }

      </AdminForm>
    </div>
  );
}
