import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Form } from "react-bootstrap";
import { CirclePicker } from "react-color";
import { AdminForm } from "src/components/ui/AdminForm";
import Checkbox from "src/components/ui/Checkbox";
import { CheckboxCustom } from "../ui/Checkbox";
import NumberFormat from "react-number-format";
export default function EventForm(props) {
  const { classData, setClassData, args, setArgs, isEdit } = props;

  const handleChangeComplete = (color) => {
    if (isEdit) {
      setClassData({
        ...classData,
        backgroundColor: color.hex,
      });
    } else {
      setArgs({ ...args, backgroundColor: color.hex });
    }
  };
  return (
    <div className="p-4">
      <AdminForm>
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
        <label className="mt-4">Enlace a la videoconferencia</label>
        <input
          rows="3"
          value={classData.videoconference}
          onChange={(e) =>
            isEdit
              ? setClassData({ ...classData, videoconference: e.target.value })
              : setArgs({ ...args, videoconference: e.target.value })
          }
        />
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

        <label className="mt-4">Color del evento</label>
        <CirclePicker
          color={classData.backgroundColor}
          onChangeComplete={handleChangeComplete}
        />
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
            <label className="mt-4">Precio</label>
            <NumberFormat
              value={classData.price}
              thousandSeparator={true}
              prefix={"€"}
              onValueChange={(values) => {
                const { value } = values;
                let newValue = Number(value).toFixed(2);
                newValue = String(newValue);
                isEdit
                  ? setClassData({
                      ...classData,
                      price: newValue,
                    })
                  : setArgs({ ...args, price: newValue });
              }}
            />
          </>
        )}
      </AdminForm>
    </div>
  );
}
