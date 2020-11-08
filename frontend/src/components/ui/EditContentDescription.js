import React from "react";
import { AdminForm } from "./AdminForm";
import { ButtonCustom } from "./ButtonCustom";

const EditContentDescription = ({
  newDescription,
  setNewDescription,
  handleEditDescription,
  handleCloseAddDescription,
  handleCloseEditDescription,
  type,
  item,
}) => {
  return (
    <>
      <AdminForm>
        <div className="my-3">
          <textarea onChange={(e) => setNewDescription(e.target.value)}>
            {newDescription}
          </textarea>
        </div>
        <div className="d-sm-flex mt-2 justify-content-end">
          <ButtonCustom
            onClick={(e) =>
              handleEditDescription(
                e,
                item.code,
                item.content.id,
                newDescription,
                type
              )
            }
            className="mr-2"
          >
            {type == "add" ? "Añadir" : "Editar"}
          </ButtonCustom>
          <ButtonCustom
            onClick={
              type == "add"
                ? handleCloseAddDescription
                : handleCloseEditDescription
            }
          >
            Cancelar
          </ButtonCustom>
        </div>
      </AdminForm>
    </>
  );
};

export default EditContentDescription;
