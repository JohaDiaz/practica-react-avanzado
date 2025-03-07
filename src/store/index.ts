import { combineReducers, createStore } from "redux";
import * as reducers from "./reducers";
// Importa un objeto con todos los exports del fichero



export default function configureStore(){
    const rootReducers = combineReducers(reducers);
    const store = createStore(rootReducers /* preloadedState, */,
        // @ts-expect-error: import devtools extension
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
           // @ts-expect-error: import devtools extension
        window.__REDUX_DEVTOOLS_EXTENSION__(),
         );
    return store;
}


// export type AppStore =typeof store;
// export type AppGetState = AppStore["getState"];
// export type RootState = ReturnType<AppGetState>;
// export type AppDispatch = AppStore["dispatch"];


