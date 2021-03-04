export const userReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        is_authenticated: true,
        loading: false,
        user: action.payload.user,
        error: "",
      };
    case "AUTH_ERROR":
    case "FETCH_ERROR":
      console.log("entra");
      return {
        ...state,
        loading: false,
        user: state.user,
        error: "Algo ha ido mal",
      };

    case "LOGIN_SUCCESS":
      localStorage.setItem("access_token", action.payload.access_token);
      return {
        ...state,
        is_authenticated: true,
        loading: false,
        user: action.payload.user,
        access_token: action.payload.access_token,
        error: "",
      };

    case "LOGOUT":
      localStorage.removeItem("access_token");
      return {
        ...state,
        is_authenticated: false,
        loading: false,
        user: null,
        access_token: null,
        error: "",
      };
    case "UPLOAD_PROFILE_IMAGE":
      return {
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            picture: action.payload.profile.picture,
          },
        },
      };
    case "SAVE_USER_INFORMATION":
      return {
        ...state,
        user: {
          ...state.user,
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
        },
      };
    case "SAVE_PROFILE_INFORMATION":
      return {
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            is_enterprise: action.payload.profile.is_enterprise,
            company_name: action.payload.profile.company_name,
          },
        },
      };
    case "UPLOAD_VIDEO_PRESENTATION":
      return {
        ...state,
        user: {
          ...state.user,
          teacher: {
            ...state.user.teacher,
            videoPresentation: "",
          },
        },
      };
    case "SAVE_PRESENTATION":
      return {
        ...state,
        user: {
          ...state.user,
          teacher: {
            ...state.user.teacher,
            presentation: action.payload,
          },
        },
      };
    case "SAVE_TEACH":
      return {
        ...state,
        user: {
          ...state.user,
          teacher: {
            ...state.user.teacher,
            teaches: action.payload,
          },
        },
      };
    case "ADD_LENGUAGE":
      return {
        ...state,
        user: {
          ...state.user,
          teacher: {
            ...state.user.teacher,
            lenguages: [...state.user.teacher.lenguages, action.payload],
          },
        },
      };
    case "DELETE_LENGUAGE":
      return {
        ...state,
        user: {
          ...state.user,
          teacher: {
            ...state.user.teacher,
            lenguages: state.user.teacher.lenguages.filter(
              (lang) => lang.id !== action.payload.id
            ),
          },
        },
      };
    case "ADD_SKILL":
      return {
        ...state,
        user: {
          ...state.user,
          teacher: {
            ...state.user.teacher,
            skills: [...state.user.teacher.skills, action.payload],
          },
        },
      };
    case "DELETE_SKILL":
      return {
        ...state,
        user: {
          ...state.user,
          teacher: {
            ...state.user.teacher,
            skills: state.user.teacher.skills.filter(
              (skill) => skill.id !== action.payload.id
            ),
          },
        },
      };
    case "ADD_WORK":
      const arrayWorksAdd = [
        ...state.user.teacher.workExperience,
        action.payload,
      ];
      const worksAddSorted = arrayWorksAdd.sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
      );
      return {
        ...state,
        user: {
          ...state.user,
          teacher: {
            ...state.user.teacher,
            work_experience: worksAddSorted,
          },
        },
      };

    case "ADD_PROGRAM":
      return {
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            is_tutor: true,
          },
        },
      };
    case "NEW_PROGRAM":
      return {
        ...state,
        user: {
          ...state.user,
          teacher: {
            ...state.user.teacher,
            programs: [action.payload, ...state.user.teacher.programs],
          },
        },
      };
    case "UPDATE_PROGRAM":
      return {
        ...state,
        user: {
          ...state.user,
          teacher: {
            ...state.user.teacher,
            programs: state.user.teacher.programs.map((e) => {
              if (e.id == action.payload.id) {
                return { ...e, ...action.payload };
              }
              return e;
            }),
          },
        },
      };
    case "DELETE_PROGRAM":
      return {
        ...state,
        user: {
          ...state.user,
          teacher: {
            ...state.user.teacher,
            programs: state.user.teacher.programs.filter(
              (program) => program.id != action.payload
            ),
          },
        },
      };
    case "SUBSCRIBE_PROGRAM":
      return {
        ...state,
        user: {
          ...state.user,
          programs: [
            ...state.user.programs,
            {
              actived: action.payload.actived,
              id: action.payload.id,
              program_language: action.payload.program_language,
              program_price: action.payload.program_price,
              title: action.payload.title,
              user: action.payload.user,
              picture: action.payload.picture,
              subtitle: action.payload.subtitle,
            },
          ],
        },
      };
    case "UNSUBSCRIBE_PROGRAM":
      return {
        ...state,
        user: {
          ...state.user,
          programs: state.user.programs,
        },
      };
    case "RESUBSCRIBE_PROGRAM":
      return {
        ...state,
        user: {
          ...state.user,
          programs: state.user.programs,
        },
      };
    case "ACTIVATE_TEACHER":
      return {
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            is_teacher: true,
          },
        },
      };
    case "CHANGE_PASSWORD":
      return {
        ...state,
        is_changing_password: true,
      };
    case "CHANGE_PASSWORD_SUCCESS":
      return {
        ...state,
        is_changing_password: false,
      };
    case "CHANGE_PASSWORD_FAIL":
      return {
        ...state,
        is_changing_password: false,
        change_password_error: action.payload,
      };
    case "STRIPE_CONNECTED":
      return {
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            stripe_account_id: action.payload.profile.stripe_account_id,
            stripe_dashboard_url: action.payload.profile.stripe_dashboard_url,
          },
        },
      };
    default:
      return state;
  }
};
//programs: state.user.programs.filter(program => program.id != action.payload.id)
