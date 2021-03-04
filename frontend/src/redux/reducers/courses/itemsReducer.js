import {
  ITEMS_FETCH,
  ITEMS_SUCCESS,
  ITEMS_FAIL,
  ITEM_SAVE,
  ITEM_SAVE_SUCCESS,
  ITEM_SAVE_FAIL,
  CREATE_ITEM,
  CREATE_ITEM_FAIL,
  CREATE_ITEM_SUCCESS,
  UPDATE_ITEMS_ORDER,
  UPDATE_ITEMS_ORDER_SUCCESS,
  UPDATE_ITEMS_ORDER_FAIL,
  REMOVE_ITEM,
  REMOVE_ITEM_SUCCESS,
  REMOVE_ITEM_FAIL,
  UPLOAD_ITEM_FILE,
  UPLOAD_ITEM_FILE_SUCCESS,
  UPLOAD_ITEM_FILE_FAIL,
  UPDATE_ITEM_FILE,
  UPDATE_ITEM_FILE_SUCCESS,
  UPDATE_ITEM_FILE_FAIL,
  UPDATE_ITEM_CONTENT,
  UPDATE_ITEM_CONTENT_SUCCESS,
  UPDATE_ITEM_CONTENT_FAIL,
  UPLOAD_ITEM_MATERIAL,
  UPLOAD_ITEM_MATERIAL_SUCCESS,
  UPLOAD_ITEM_MATERIAL_FAIL,
  DELETE_ITEM_MATERIAL,
  DELETE_ITEM_MATERIAL_SUCCESS,
  DELETE_ITEM_MATERIAL_FAIL,
  CREATE_ITEM_VIEWED,
  CREATE_ITEM_VIEWED_FAIL,
  CREATE_ITEM_VIEWED_SUCCESS,
  UPDATE_ITEM_VIEWED,
  UPDATE_ITEM_VIEWED_FAIL,
  UPDATE_ITEM_VIEWED_SUCCESS,
} from "../../types";

const initialState = {
  isLoading: true,
  items: null,
  error: null,
  item_edit: null,
  item_editing: false,
  item_edit_error: null,
  item_creating: false,
  item_create_error: null,
  item_save: null,
  item_saving: false,
  item_save_error: null,
  item_delete: null,
  item_deleting: false,
  item_delete_error: null,
  item_order_update: null,
  item_order_updating: false,
  item_order_update_error: null,
  item_file_uploading: false,
  item_file_upload_error: null,
  item_file_updating: false,
  item_file_update_error: null,
  item_content_updating: false,
  item_content_update_error: null,
  item_material_uploading: false,
  item_material_upload_error: null,
  item_material_deleting: false,
  item_material_delete: null,
  item_material_delete_error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ITEMS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload,
      };

    case ITEMS_FAIL:
      return {
        ...state,
        items: null,
        isLoading: false,
        error: action.payload,
      };

    case CREATE_ITEM:
      return {
        ...state,
        item_creating: true,
      };
    case CREATE_ITEM_SUCCESS:
      return {
        ...state,
        item_create_error: null,
        item_creating: false,
        items: [...state.items, action.payload],
      };

    case CREATE_ITEM_FAIL:
      return {
        ...state,
        item_creating: false,
        item_create_error: action.payload,
      };
    case UPDATE_ITEMS_ORDER:
      return {
        ...state,
        item_order_updating: true,
      };

    case UPDATE_ITEMS_ORDER_SUCCESS:
      return {
        ...state,
        item_order_updating: false,
        items: action.payload,
      };

    case UPDATE_ITEMS_ORDER_FAIL:
      return {
        ...state,
        item_order_updating: false,
        item_order_update_error: action.payload,
      };
    case ITEM_SAVE:
      return {
        ...state,
        item_saving: true,
      };
    case ITEM_SAVE_SUCCESS:
      return {
        ...state,
        item_saving: false,
        item_save_error: null,

        items: state.items.map((item) => {
          if (item.item.code == action.payload.code) {
            return {
              ...item,
              item: {
                ...action.payload,
              },
            };
          } else {
            return item;
          }
        }),
      };
    case ITEM_SAVE_FAIL:
      return {
        ...state,
        item_saving: false,
        item_save_error: action.payload,
      };

    case REMOVE_ITEM:
      return {
        ...state,
        item_delete: action.payload,
        item_deleting: true,
      };
    case REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        items: state.items.filter(
          (item) => item.item.code != state.item_delete
        ),
        item_deleting: false,
        item_delete: null,

        item_delete_error: null,
      };
    case REMOVE_ITEM_FAIL:
      return {
        ...state,
        item_delete: null,
        item_delete_error: action.payload,
        item_file_uploading: false,
      };

    // Item files
    case UPLOAD_ITEM_FILE:
      return {
        ...state,
        item_file_uploading: true,
      };
    case UPLOAD_ITEM_FILE_SUCCESS:
      return {
        ...state,
        item_file_uploading: false,
        item_file_upload_error: null,

        items: state.items.map((item) => {
          if (item.item.id == action.payload.item) {
            return {
              ...item,
              item: {
                ...item.item,
                content: action.payload,
              },
            };
          } else {
            return item;
          }
        }),
      };
    case UPLOAD_ITEM_FILE_FAIL:
      return {
        ...state,
        item_file_uploading: false,
        item_file_upload_error: action.payload,
      };
    case UPDATE_ITEM_FILE:
      return {
        ...state,
        item_file_updating: true,
      };
    case UPDATE_ITEM_FILE_SUCCESS:
      return {
        ...state,
        item_file_updating: false,
        item_file_update_error: null,

        items: state.items.map((item) => {
          if (item.item.id == action.payload.item) {
            return {
              ...item,
              item: {
                ...item.item,
                content: action.payload,
              },
            };
          } else {
            return item;
          }
        }),
      };
    case UPDATE_ITEM_FILE_FAIL:
      return {
        ...state,
        item_file_updating: false,
        item_file_update_error: action.payload,
      };
    case UPDATE_ITEM_CONTENT:
      return {
        ...state,
        item_content_updating: true,
      };
    case UPDATE_ITEM_CONTENT_SUCCESS:
      return {
        ...state,
        item_content_updating: false,
        item_content_update_error: null,

        items: state.items.map((item) => {
          if (item.item.id == action.payload.item) {
            return {
              ...item,
              item: {
                ...item.item,
                content: action.payload,
              },
            };
          } else {
            return item;
          }
        }),
      };
    case UPDATE_ITEM_CONTENT_FAIL:
      return {
        ...state,
        item_content_updating: false,
        item_content_update_error: action.payload,
      };
    // Item files
    case UPLOAD_ITEM_MATERIAL:
      return {
        ...state,
        item_material_uploading: true,
      };
    case UPLOAD_ITEM_MATERIAL_SUCCESS:
      return {
        ...state,
        item_material_uploading: false,
        item_material_upload_error: null,

        items: state.items.map((item) => {
          if (item.item.id == action.payload.item) {
            return {
              ...item,
              item: {
                ...item.item,
                materials: [...item.item.materials, action.payload],
              },
            };
          } else {
            return item;
          }
        }),
      };
    case UPLOAD_ITEM_MATERIAL_FAIL:
      return {
        ...state,
        item_material_uploading: false,
        item_material_upload_error: action.payload,
      };
    case DELETE_ITEM_MATERIAL:
      return {
        ...state,
        item_material_deleting: true,
        item_material_delete: action.payload,
      };
    case DELETE_ITEM_MATERIAL_SUCCESS:
      return {
        ...state,
        item_material_deleting: false,
        item_material_delete_error: null,
        item_material_delete: null,

        items: state.items.map((item) => {
          if (item.item.code == state.item_material_delete.item_id) {
            return {
              ...item,
              item: {
                ...item.item,
                materials: item.item.materials.filter(
                  (material) =>
                    material.id != state.item_material_delete.material_id
                ),
              },
            };
          } else {
            return item;
          }
        }),
      };
    case DELETE_ITEM_MATERIAL_FAIL:
      return {
        ...state,
        item_material_uploading: false,
        item_material_delete: null,

        item_material_delete_error: action.payload,
      };

    default:
      return state;
  }
}
