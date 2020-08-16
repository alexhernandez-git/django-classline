import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Form } from "react-bootstrap";
import { CirclePicker } from "react-color";
import { AdminForm } from "src/components/ui/AdminForm";

export default function EventForm(props) {
  const { classData, setClassData, args, setArgs, isEdit } = props;
  const MySwal = withReactContent(Swal);

  const handleChangeComplete = (color) => {
    if (isEdit) {
      setClassData({ ...classData, backgroundColor: color.hex, recurrent: true });
    } else {
      setArgs({ ...args, backgroundColor: color.hex, recurrent: true });
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
        <label className="mt-4">Color del evento</label>
        <CirclePicker
          color={classData.backgroundColor}
          onChangeComplete={handleChangeComplete}
        />
      </AdminForm>
    </div>
  );
}
