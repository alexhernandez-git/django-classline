import React, { createContext, useEffect, useReducer, useState } from "react";
export const AppContext = createContext();
import { userReducer } from "./reducers/userReducer";
import moment from "moment";
import Swal from "sweetalert2";

import axios from "axios";
export const AppProvider = ({ children }) => {
  const initialUser = {
    loading: true,
    is_authenticated: false,
    error: "",
    access_token: localStorage.getItem("access_token"),
    user: null,
  };
  const [userProfile, dispatchUser] = useReducer(userReducer, initialUser);

  const verifyAccount = async (token) => {
    return await axios
      .post("/api/users/verify/", { token: token })
      .then((res) => {
        Swal.fire({
          title: "Cuenta verificada!",
          text: "Ya puedes loguearte",
          icon: "success",
          confirmButtonText: "Ok",
        });

        return true;
      })
      .catch((err) => {
        return false;
      });
  };
  const changeEmail = async (email) => {
    return await axios
      .post(
        "/api/users/change_email/",
        { email: email },
        tokenConfig(userProfile)
      )
      .then((res) => {
        Swal.fire({
          title: "Email enviado!",
          text: "Ve a tu correo y verifica el email",
          icon: "success",
          confirmButtonText: "Ok",
        });

        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
  const sendResetPasswordEmail = async (form) => {
    return await axios
      .post("/api/users/forget_password/", { email: form.email })
      .then((res) => {
        Swal.fire({
          title: "Email enviado!",
          text: "Ve a tu correo y restablece tu contraseña",
          icon: "success",
          confirmButtonText: "Ok",
        });

        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
  const ResetPassword = async (form, token) => {
    return await axios
      .post("/api/users/reset_password/", form, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        Swal.fire({
          title: "Contraseña actualizada correctamente!",
          text: "Ya puedes loguearte con tu nueva contraseña",
          icon: "success",
          confirmButtonText: "Ok",
        });

        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
  const validateChangeEmail = async (email) => {
    return await axios
      .post(
        "/api/users/validate_change_email/",
        { email: email },
        tokenConfig(userProfile)
      )
      .then((res) => {
        Swal.fire({
          title: "Email cambiado!",
          icon: "success",
          confirmButtonText: "Ok",
        });

        return true;
      })
      .catch((err) => {
        return false;
      });
  };
  const loadUser = async () => {
    // User Loading

    return await axios
      .get("/api/users/get_profile", tokenConfig(userProfile))
      .then((res) => {
        dispatchUser({
          type: "FETCH_SUCCESS",
          payload: res.data,
        });
        return true;
      })
      .catch((err) => {
        dispatchUser({
          type: "AUTH_ERROR",
        });
        return false;
      });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const tokenConfig = (userProfile) => {
    // Get access_token from state
    const access_token = userProfile.access_token;
    let config = {};
    // Headers

    config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // If access_token, add to headers config
    if (access_token) {
      config.headers["Authorization"] = `Token ${access_token}`;
    }

    return config;
  };
  const login = async (data) => {
    return await axios
      .post("/api/users/login/", data)
      .then((res) => {
        dispatchUser({
          type: "LOGIN_SUCCESS",
          payload: res.data,
        });
        return res;
      })
      .catch((err) => err.response);
  };
  const logout = () => {
    dispatchUser({ type: "LOGOUT" });
  };
  const register = async (form) => {
    const data = { ...form, created_account: false };
    return await axios
      .post("/api/users/signup/", data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

  const uploadProfileImage = async (file) => {
    let data = new FormData();
    data.append("picture", file, file.name);

    return await axios
      .patch("/api/users/profile/", data, tokenConfig(userProfile))
      .then((res) => {
        dispatchUser({
          type: "UPLOAD_PROFILE_IMAGE",
          payload: res.data,
        });
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

  const saveUserInformation = async (data) => {
    return await axios
      .patch(
        `/api/users/${userProfile.user.code}/`,
        data,
        tokenConfig(userProfile, true)
      )
      .then((res) => {
        dispatchUser({
          type: "SAVE_USER_INFORMATION",
          payload: res.data,
        });
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
  const saveProfileInformation = async (form) => {
    return await axios
      .patch("/api/users/profile/", form, tokenConfig(userProfile, true))
      .then((res) => {
        dispatchUser({
          type: "SAVE_PROFILE_INFORMATION",
          payload: res.data,
        });
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
  const changePassword = async (data, setPasswords) => {
    dispatchUser({
      type: "CHANGE_PASSWORD",
    });

    return await axios
      .post("/api/users/change_password/", data, tokenConfig(userProfile))
      .then((res) => {
        Swal.fire({
          title: "Contraseña actualizada!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        setPasswords({
          email: userProfile.user.email,
          password: "",
          new_password: "",
          repeat_password: "",
        });
        dispatchUser({
          type: "CHANGE_PASSWORD_SUCCESS",
        });
        return res;
      })
      .catch((err) => {
        dispatchUser({
          type: "CHANGE_PASSWORD_FAIL",
          payload: { data: err.response.data, status: err.response.status },
        });
        return err.response;
      });
  };
  const uploadVideoPresentation = (data) => {
    dispatchUser({
      type: "UPLOAD_VIDEO_PRESENTATION",
      payload: data,
    });
  };
  const savePresentation = (data) => {
    dispatchUser({
      type: "SAVE_PRESENTATION",
      payload: data,
    });
  };
  const saveTeach = (data) => {
    dispatchUser({
      type: "SAVE_TEACH",
      payload: data,
    });
  };
  const addLenguage = (data) => {
    dispatchUser({
      type: "ADD_LENGUAGE",
      payload: data,
    });
  };
  const deleteLenguage = (data) => {
    dispatchUser({
      type: "DELETE_LENGUAGE",
      payload: data,
    });
  };
  const addSkill = (data) => {
    dispatchUser({
      type: "ADD_SKILL",
      payload: data,
    });
  };
  const deleteSkill = (data) => {
    dispatchUser({
      type: "DELETE_SKILL",
      payload: data,
    });
  };
  const addWork = (data) => {
    dispatchUser({
      type: "ADD_WORK",
      payload: data,
    });
  };
  const deleteWork = (data) => {
    dispatchUser({
      type: "DELETE_WORK",
      payload: data,
    });
  };
  const editWork = (data) => {
    dispatchUser({
      type: "EDIT_WORK",
      payload: data,
    });
  };
  const addStudy = (data) => {
    dispatchUser({
      type: "ADD_STUDY",
      payload: data,
    });
  };
  const deleteStudy = (data) => {
    dispatchUser({
      type: "DELETE_STUDY",
      payload: data,
    });
  };
  const editStudy = (data) => {
    dispatchUser({
      type: "EDIT_STUDY",
      payload: data,
    });
  };
  const updateBusinessHours = (data) => {
    dispatchUser({
      type: "SET_BUSINESS_HOURS",
      payload: data,
    });
  };
  const setPrice = (data) => {
    dispatchUser({
      type: "SET_PRICE",
      payload: data,
    });
  };
  const cancelClass = (data) => {
    dispatchUser({
      type: "CANCEL_CLASS",
      payload: data,
    });
  };
  const discardInvitation = (data) => {
    dispatchUser({
      type: "DISCARD_INVITATION",
      payload: data,
    });
  };
  const acceptInvitation = (classData, invitation) => {
    dispatchUser({
      type: "ACCEPT_INVITATION",
      payload: {
        classData: classData,
        invitation: invitation,
      },
    });
  };
  const handleActivateTeacher = async () => {
    let response;
    response = await axios
      .patch(
        `/api/users/profile/`,
        { is_teacher: true },
        tokenConfig(userProfile)
      )
      .then((res) => {
        dispatchUser({
          type: "ACTIVATE_TEACHER",
        });
        return {
          result: true,
          message: "Cuenta de instructor activada correctamente",
        };
      })
      .catch((err) => {
        return {
          result: true,
          message: "La cuenta de instructor se ha activado correctamente",
        };
      });
    return response;
  };

  const [search, setSearch] = useState("");
  const newProgram = (data) => {
    dispatchUser({
      type: "NEW_PROGRAM",
      payload: data,
    });
  };
  const updateProgram = (data) => {
    dispatchUser({
      type: "UPDATE_PROGRAM",
      payload: data,
    });
  };
  const deleteProgram = (id) => {
    dispatchUser({
      type: "DELETE_PROGRAM",
      payload: id,
    });
  };
  const handleSubscribe = (program) => {
    dispatchUser({
      type: "SUBSCRIBE_PROGRAM",
      payload: program,
    });
  };

  const handleUnsubscribe = (program) => {
    dispatchUser({
      type: "UNSUBSCRIBE_PROGRAM",
      payload: program,
    });
  };

  const handleResubscribe = (program) => {
    dispatchUser({
      type: "RESUBSCRIBE_PROGRAM",
      payload: program,
    });
  };

  const connectStripe = (authCode) => {
    axios
      .post(
        "/api/users/stripe_connect/",
        { code: authCode },
        tokenConfig(userProfile, true)
      )
      .then((res) => {
        dispatchUser({
          type: "STRIPE_CONNECTED",
          payload: res.data,
        });
      })
      .catch((err) => {});
  };

  return (
    <AppContext.Provider
      value={{
        tokenConfig,
        verifyAccount,
        changeEmail,
        validateChangeEmail,
        sendResetPasswordEmail,
        ResetPassword,
        login,
        logout,
        register,
        userProfile,
        loadUser,
        updateBusinessHours,
        uploadProfileImage,
        saveUserInformation,
        saveProfileInformation,
        uploadVideoPresentation,
        savePresentation,
        saveTeach,
        addLenguage,
        deleteLenguage,
        addSkill,
        deleteSkill,
        addWork,
        deleteWork,
        editWork,
        addStudy,
        deleteStudy,
        editStudy,
        setPrice,
        cancelClass,
        discardInvitation,
        acceptInvitation,
        handleActivateTeacher,
        search,
        setSearch,
        newProgram,
        updateProgram,
        deleteProgram,
        handleSubscribe,
        handleUnsubscribe,
        handleResubscribe,
        connectStripe,
        changePassword,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
