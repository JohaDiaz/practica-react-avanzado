import { combineReducers, createStore } from "redux";
import * as reducers from "./reducers";
// Importa un objeto con todos los exports del fichero

import { useDispatch, useSelector } from "react-redux";
import type { State } from "./reducers";
import { composeWithDevTools } from "@redux-devtools/extension";

export default function configureStore(preloadedState: Partial<State>){
    const rootReducers = combineReducers(reducers);
    const store = createStore(rootReducers,
        //@ts-expect-error: preloaded state is not inferred
        preloadedState,
        composeWithDevTools(),
         );
    return store;
}


export type AppStore = ReturnType<typeof configureStore>;
export type AppGetState = AppStore["getState"];
export type RootState = ReturnType<AppGetState>;
export type AppDispatch = AppStore["dispatch"];


export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();