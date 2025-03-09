//import { combineReducers } from "redux";
import type { Advert } from "../pages/adverts/types";
import type { Actions } from "./actions";

export type State = {
    auth: boolean;
    adverts: Advert[];
    ui:{
        pending: boolean,
        error: Error | null,
    };
    //adverts: { data:Advert[] | null; loaded: boolean};
};

const defaultState: State = {
    auth: false,
    adverts: [],
    ui:{
        pending: false,
        error: null,
    }
    //adverts: {data:null, loaded:false},
};

export function auth(state = defaultState.auth, action: Actions): State["auth"]{
        switch (action.type){
            case 'auth/login/fulfilled':
                return true;
            case 'auth/logout':
                return false;
            default:
                return state;
    }
};

export function adverts(state = defaultState.adverts, action: Actions): State["adverts"] {
    switch (action.type) {
        case "adverts/loaded":
            console.log("Payload recibido en adverts/loaded:", action.payload);
            if (!Array.isArray(action.payload)) {
                console.error("Error: el payload no es un array", action.payload);
                return state;
            }
            return [...action.payload];
        case "adverts/created":
            return [...state, action.payload];
        default:
            return state;
    }
}

export function ui(state = defaultState.ui, action: Actions): State["ui"]{

    switch (action.type){
        case "ui/reset-error":
            return {...state, error: null };
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