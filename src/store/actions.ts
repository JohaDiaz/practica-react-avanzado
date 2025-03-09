import type { Advert } from "../pages/adverts/types";

type AuthLogin = {
    type: "auth/login";
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



//actions creators
export const authLogin = (): AuthLogin => ({
    type:"auth/login"
})

export const authLogout = (): AuthLogout => ({
    type:"auth/logout"
})

export const advertsLoaded = (adverts: Advert[]): AdvertsLoaded => {
    console.log("Enviando anuncios a Redux:", adverts);
    return {
      type: "adverts/loaded",
      payload: adverts,
    };
  };

export const advertcreated = (advert: Advert): AdvertCreated => ({
    type: "adverts/created",
    payload: advert,
})



export type Actions = AuthLogin | AuthLogout | AdvertsLoaded | AdvertCreated; 