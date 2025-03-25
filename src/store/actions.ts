import type { Credentials } from "@/pages/auth/types";
import type { Advert, CreateAdvertDto } from "../pages/adverts/types";
import { isApiClientError } from "@/api/error";
import type { AppThunk } from ".";
import { getAdvertDetail } from "@/store/selectors";

//login
type AuthLoginPending = {
  type: "auth/login/pending";
};

type AuthLoginFulfilled = {
  type: "auth/login/fulfilled";
};

type AuthLoginRejected = {
  type: "auth/login/rejected";
  payload: Error;
};

type AuthLogout = {
  type: "auth/logout";
};

type AdvertsLoadedFulfilled = {
  type: "adverts/loaded/fulfilled";
  payload: { data: Advert[]; loaded: boolean };
};

type AdvertCreatedFulfilled = {
  type: "adverts/created/fulfilled";
  payload: Advert;
};

type AdvertsDetailRejected = {
  type: "adverts/detail/rejected";
  payload: Error;
};

type AdvertDeleted = {
  type: "adverts/deleted";
  payload: string;
};

type TagsLoaded = {
  type: "tags/loaded";
  payload: string[];
};

type UiResetError = {
  type: "ui/reset-error";
};

//actions creators
export const authLoginPending = (): AuthLoginPending => ({
  type: "auth/login/pending",
});

export const authLoginFulfilled = (): AuthLoginFulfilled => ({
  type: "auth/login/fulfilled",
});

export const authLoginRejected = (error: Error): AuthLoginRejected => ({
  type: "auth/login/rejected",
  payload: error,
});

//api
export function authLogin(
  credentials: Credentials,
  remember: boolean,
): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api, router }) {
    dispatch(authLoginPending());
    try {
      await api.authService.login(credentials, remember);
      dispatch(authLoginFulfilled());
      const to = router.state.location.state?.from ?? "/";
      router.navigate(to, { replace: true });
    } catch (error) {
      if (isApiClientError(error)) {
        dispatch(authLoginRejected(error));
      }
    }
  };
}

export const authLogout = (): AuthLogout => ({
  type: "auth/logout",
});

export const AdvertsLoadedFulfilled = (
  adverts: Advert[],
  loaded?: boolean,
): AdvertsLoadedFulfilled => {
  return {
    type: "adverts/loaded/fulfilled",
    payload: { data: adverts, loaded: !!loaded },
  };
};

// export const AdvertsLoadedFulfilled = (
//   adverts: Advert[],
// ): AdvertsLoadedFulfilled => {
//   return {
//     type: "adverts/loaded/fulfilled",
//     payload: adverts,
//   };
// };

//api
export const advertsLoaded = (): AppThunk<Promise<void>> => {
  return async (dispatch, getState, { api }) => {
    const state = getState();
    if (state.adverts.loaded) {
      return;
    }

    try {
      const adverts = await api.advertsService.getAdverts();
      dispatch(AdvertsLoadedFulfilled(adverts, true));
    } catch (error) {
      console.error(error);
    }
  };
};

export const advertsDetailRejected = (error: Error): AdvertsDetailRejected => ({
  type: "adverts/detail/rejected",
  payload: error,
});

//api
export const advertLoaded = (advertId: string): AppThunk<Promise<void>> => {
  return async (dispatch, getState, { api }) => {
    const state = getState();
    if (getAdvertDetail(state, advertId)) {
      return;
    }

    try {
      const advert = await api.advertsService.getAdvert(advertId);
      dispatch(AdvertsLoadedFulfilled([advert]));
    } catch (error) {
      if (isApiClientError(error)) {
        dispatch(advertsDetailRejected(error));
      }
      console.error(error);
    }
  };
};

export const advertCreatedFulfilled = (
  advert: Advert,
): AdvertCreatedFulfilled => ({
  type: "adverts/created/fulfilled",
  payload: advert,
});

//api
export function advertCreate(
  createAdvertDto: CreateAdvertDto,
): AppThunk<Promise<Advert>> {
  return async function (dispatch, _getState, { api, router }) {
    // AdverCreatePending
    try {
      const createdAdvert =
        await api.advertsService.createAdvert(createAdvertDto);
      const advert = await api.advertsService.getAdvert(
        createdAdvert.id.toString(),
      );
      dispatch(advertCreatedFulfilled(advert));
      await router.navigate(`/adverts/${createdAdvert.id}`);
      return advert;
    } catch (error) {
      if (isApiClientError(error)) {
        // Manage advertCreateRejected
      }
      throw error;
    }
  };
}

export const advertDeleted = (advertId: string): AdvertDeleted => ({
  type: "adverts/deleted",
  payload: advertId,
});

export const tagsLoaded = (tags: string[]): TagsLoaded => ({
  type: "tags/loaded",
  payload: tags,
});

export const uiResetError = (): UiResetError => ({
  type: "ui/reset-error",
});

// thunk para cargar los tags desde la API
// api
export const loadTags = (): AppThunk<Promise<void>> => {
  return async (dispatch, getState, { api }) => {
    const state = getState();
    if (state.tags.length) return;

    try {
      const tags = await api.advertsService.getTags();
      dispatch(tagsLoaded(tags));
    } catch (error) {
      console.error("Error al cargar tags:", error);
    }
  };
};

export type Actions =
  | AuthLoginPending
  | AuthLoginFulfilled
  | AuthLoginRejected
  | AuthLogout
  | AdvertsLoadedFulfilled
  | AdvertCreatedFulfilled
  | AdvertsDetailRejected
  | AdvertDeleted
  | TagsLoaded
  | UiResetError;
