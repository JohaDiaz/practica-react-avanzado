import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { useDispatch, useSelector } from "react-redux";
import { auth, adverts, ui, tags } from "./reducers";
// Importa un objeto con todos los exports del fichero
import type { State } from "./reducers";
import * as thunk from "redux-thunk";
import type { Actions } from "./actions";

import * as authService from "../pages/auth/service";
import * as advertsService from "../pages/adverts/service";
import type { createBrowserRouter } from "react-router";

type Router = ReturnType<typeof createBrowserRouter>;

type Api = {
  authService: typeof authService;
  advertsService: typeof advertsService;
};

type ExtraArgument = {
  api: Api;
  router: Router;
};

const failureRedirects = (router: Router) => (store) => (next) => (action) => {
  const result = next(action);

  if (!action.type.endsWith("/rejected")) {
    return result;
  }
  if (action.payload.code === "NOT_FOUND") {
    return router.navigate("/404");
  }
  if (action.payload.code === "UNAUTHORIZED") {
    return router.navigate("/login");
  }
  return result;
};

export default function configureStore(
  preloadedState: Partial<State>,
  router: Router,
) {
  const rootReducer = combineReducers({ auth, adverts, ui, tags });
  const store = createStore(
    rootReducer,
    preloadedState as never,
    composeWithDevTools(
      applyMiddleware(
        thunk.withExtraArgument<State, Actions, ExtraArgument>({
          api: { authService, advertsService },
          router,
        }),
        failureRedirects(router),
      ),
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

export type AppThunk<ReturnType = void> = thunk.ThunkAction<
  ReturnType,
  RootState,
  ExtraArgument,
  Actions
>;
