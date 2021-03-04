import React from "react";
import { AdminForm } from "./AdminForm";
import { ButtonCustom } from "./ButtonCustom";
import MyCKEditor from "./MyCKEditor";

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
        <div className="my-3" style={{ color: "initial" }}>
          <MyCKEditor value={newDescription} handleEdit={setNewDescription} />
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
            type="button"
            onClick={
              type == "add"
                ? (e) => handleCloseAddDescription(e)
                : (e) => handleCloseEditDescription(e)
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
