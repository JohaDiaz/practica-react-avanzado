import { combineReducers, createStore } from "redux";
import * as reducers from "./reducers";
// Importa un objeto con todos los exports del fichero

import { useDispatch, useSelector } from "react-redux";
import type { State } from "./reducers";


export default function configureStore(preloadedState: Partial<State>){
    const rootReducers = combineReducers(reducers);
    const store = createStore(rootReducers,
        preloadedState,
        // @ts-expect-error: import devtools extension
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
           // @ts-expect-error: import devtools extension
        window.__REDUX_DEVTOOLS_EXTENSION__(),
         );
    return store;
}


export type AppStore = ReturnType<typeof configureStore>;
export type AppGetState = AppStore["getState"];
export type RootState = ReturnType<AppGetState>;
export type AppDispatch = AppStore["dispatch"];


export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();