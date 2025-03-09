import { combineReducers, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { useDispatch, useSelector } from "react-redux";
import { auth, adverts, ui } from "./reducers";
// Importa un objeto con todos los exports del fichero


import type { State } from "./reducers";


export default function configureStore(preloadedState?: Partial<State>){
    const rootReducer = combineReducers({ auth, adverts, ui });
    const store = createStore(
        rootReducer,
        //@ts-expect-error: preloaded state is not inferred
        preloadedState,
        composeWithDevTools(),
         );
         console.log("Estado inicial de Redux:", store.getState());

    return store;
    
}


export type AppStore = ReturnType<typeof configureStore>;
export type AppGetState = AppStore["getState"];
export type RootState = ReturnType<AppGetState>;
export type AppDispatch = AppStore["dispatch"];


export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();