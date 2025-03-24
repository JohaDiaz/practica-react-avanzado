//import { combineReducers } from "redux";
import type { Advert } from "../pages/adverts/types";
import type { Actions } from "./actions";

export type State = {
  auth: boolean;
  adverts: { data: Advert[] | null; loaded: boolean };
  ui: {
    pending: boolean;
    error: Error | null;
  };
  tags: string[];
  //adverts: { data:Advert[] | null; loaded: boolean};
};

const defaultState: State = {
  auth: false,
  adverts: { data: [], loaded: false },
  ui: {
    pending: false,
    error: null,
  },
  tags: [],
};

export function auth(
  state = defaultState.auth,
  action: Actions,
): State["auth"] {
  switch (action.type) {
    case "auth/login/fulfilled":
      return true;
    case "auth/logout":
      return false;
    default:
      return state;
  }
}

export function adverts(
  state = defaultState.adverts,
  action: Actions,
): State["adverts"] {
  switch (action.type) {
    case "adverts/loaded/fulfilled":
      console.log("Payload recibido:", action.payload);
      return {
        data: action.payload.data,
        loaded: action.payload.loaded,
      };
    case "adverts/created/fulfilled":
      return { ...state, data: [...(state.data ?? []), action.payload] };
    case "adverts/deleted":
      return {
        ...state,
        data:
          state.data?.filter((advert) => advert.id !== action.payload) ?? null,
      };
    default:
      return state;
  }
}

export function ui(state = defaultState.ui, action: Actions): State["ui"] {
  switch (action.type) {
    case "ui/reset-error":
      return { ...state, error: null };
    case "auth/login/pending":
      return { pending: true, error: null };
    case "auth/login/fulfilled":
      return { pending: false, error: null };
    case "auth/login/rejected":
      return { pending: false, error: action.payload };
    default:
      return state;
  }
}

export function tags(state = [], action: Actions): string[] {
  switch (action.type) {
    case "tags/loaded":
      return action.payload;
    default:
      return state;
  }
}

// export function reducer(state =defaultState, action: Actions): State{

//     return {
//         auth: auth(state.auth, action),
//         adverts: adverts(state.adverts, action),
//     }
// };

//export const reducer = combineReducers({ auth: auth, adverts: adverts});

//export const reducer = combineReducers({ auth, adverts});

// export function reducer(state = defaultState, action: Actions):  State {
//     switch (action.type){
//         case 'auth/login':
//             return {...state, auth: true};
//         case 'auth/logout':
//             return {...state, auth: false};
//         case 'adverts/created':
//             return { ...state, adverts: [...state.adverts, action.payload] };
//         case 'adverts/loaded':
//             return { ...state, adverts: action.payload };
//         default:
//             return state;
//     }
// }
