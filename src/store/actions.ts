import type { Advert } from "../pages/adverts/types";

//login
type AuthLoginPending = {
    type: "auth/login/pending";
};

type AuthLoginFulfilled = {
    type: "auth/login/fulfilled";
};

type AuthLoginRejected = {
    type: "auth/login/rejected";
    payload: Error,
};

type AuthLogout = {
    type: "auth/logout";
};

type AdvertsLoaded = {
    type: "adverts/loaded";
    payload: Advert[];
};

type AdvertCreated = {
    type: "adverts/created",
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
    type: "ui/reset-error",
}


//actions creators
export const authLoginPending = (): AuthLoginPending => ({
    type:"auth/login/pending",
})

export const authLoginFulfilled = (): AuthLoginFulfilled => ({
    type:"auth/login/fulfilled",
})


export const authLoginRejected = (error: Error ): AuthLoginRejected => ({
    type:"auth/login/rejected",
    payload: error,
})

//export function authLogin = (credentials)

export const authLogout = (): AuthLogout => ({
    type:"auth/logout",
})

export const advertsLoaded = (adverts: Advert[]): AdvertsLoaded => {
    console.log("Enviando anuncios a Redux:", adverts);
    return {
      type: "adverts/loaded",
      payload: adverts,
    };
  };

export const advertCreated = (advert: Advert): AdvertCreated => ({
    type: "adverts/created",
    payload: advert,
})

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
})



export type Actions = AuthLoginPending | AuthLoginFulfilled | AuthLoginRejected |  AuthLogout | AdvertsLoaded | AdvertCreated | AdvertDeleted | TagsLoaded | UiResetError; 