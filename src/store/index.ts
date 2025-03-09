import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { useDispatch, useSelector } from "react-redux";
import { auth, adverts, ui, tags  } from "./reducers";
// Importa un objeto con todos los exports del fichero
import type { State } from "./reducers";
import * as thunk from "redux-thunk";
import type { Actions } from "./actions";


export default function configureStore(preloadedState?: Partial<State>){
    const rootReducer = combineReducers({ auth, adverts, ui, tags });
    const store = createStore(
        rootReducer,
        preloadedState as never,
        composeWithDevTools(
            applyMiddleware(thunk.withExtraArgument<State, Actions>())
        ),
         );

    return store;
    
}



export type AppStore = ReturnType<typeof configureStore>;
export type AppGetState = AppStore["getState"];
export type RootState = ReturnType<AppGetState>;
export type AppDispatch = AppStore["dispatch"];


export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();