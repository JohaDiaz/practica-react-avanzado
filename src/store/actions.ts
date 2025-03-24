import type { Credentials } from "@/pages/auth/types";
import type { Advert, CreateAdvertDto } from "../pages/adverts/types";
import { isApiClientError } from "@/api/error";
import type { AppThunk } from ".";
import { login } from "@/pages/auth/service";

import { createAdvert } from "@/pages/adverts/service";
import { getAdvert as getAdvertService } from "@/pages/adverts/service";
import { getAdverts as getAdvertsFromAPI } from "@/pages/adverts/service";
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

export function authLogin(
  credentials: Credentials,
  remember: boolean,
): AppThunk<Promise<void>> {
  return async function (dispatch) {
    dispatch(authLoginPending());
    try {
      await login(credentials, remember);
      dispatch(authLoginFulfilled());
    } catch (error) {
      if (isApiClientError(error)) {
        dispatch(authLoginRejected(error));
      }
      throw error;
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

export const advertsLoaded = (): AppThunk<Promise<void>> => {
  return async (dispatch, getState) => {
    const state = getState();
    if (state.adverts.loaded) {
      return;
    }

    try {
      const adverts = await getAdvertsFromAPI();
      dispatch(AdvertsLoadedFulfilled(adverts, true));
    } catch (error) {
      console.error(error);
    }
  };
};

export const advertLoaded = (advertId: string): AppThunk<Promise<void>> => {
  return async (dispatch, getState) => {
    const state = getState();
    if (getAdvertDetail(state, advertId)) {
      return;
    }

    try {
      const advert = await getAdvertService(advertId);
      dispatch(AdvertsLoadedFulfilled([advert]));
    } catch (error) {
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

export function advertCreate(
  createAdvertDto: CreateAdvertDto,
): AppThunk<Promise<Advert>> {
  return async function (dispatch) {
    // AdverCreatePending
    try {
      const createdAdvert = await createAdvert(createAdvertDto);
      const advert = await getAdvertService(createdAdvert.id.toString());
      dispatch(advertCreatedFulfilled(advert));
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

export type Actions =
  | AuthLoginPending
  | AuthLoginFulfilled
  | AuthLoginRejected
  | AuthLogout
  | AdvertsLoadedFulfilled
  | AdvertCreatedFulfilled
  | AdvertDeleted
  | TagsLoaded
  | UiResetError;
