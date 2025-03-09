import type { RootState } from ".";

export const getIsLogged = (state: RootState) => state.auth;

export const getAllAdverts = (state: RootState) => state.adverts;

//export const getTweets = (state: RootState) => state.tweets.data || [];

export const getAdvertDetail = (state: RootState, advertId?: string) =>
    advertId
      ? state.adverts.find((advert) => String(advert.id).trim() === String(advertId).trim()) ?? null
      : null;