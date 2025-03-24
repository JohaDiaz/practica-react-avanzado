import type { RootState } from ".";

export const getIsLogged = (state: RootState) => state.auth;

export const getAllAdverts = (state: RootState) => {
  return state.adverts.data || [];
};

//export const getTweets = (state: RootState) => state.tweets.data || [];

export const getAdvertDetail = (state: RootState, advertId?: string) =>
  advertId
    ? (state.adverts.data?.find(
        (advert) => String(advert.id).trim() === String(advertId).trim(),
      ) ?? null)
    : null;

export const getUi = (state: RootState) => state.ui;

export const getAllTags = (state: RootState) => state.tags;
