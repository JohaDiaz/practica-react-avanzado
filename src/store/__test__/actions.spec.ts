import { authLoginPending, AdvertsLoadedFulfilled } from "../actions";
import type { Advert } from "@/pages/adverts/types";
import { advertCreatedFulfilled } from "@/store/actions";

//action creator síncrono
describe("authLoginPending", () => {
  test('should return an "auth/login/pending" action', () => {
    const action = {
      type: "auth/login/pending",
    };
    const result = authLoginPending();
    expect(result).toEqual(action);
  });
});

//action creator síncrono
describe("advertsLoadedFulfilled", () => {
  test('should return an "adverts/loaded/fulfilled" action', () => {
    const adverts: Advert[] = [
      {
        id: "1",
        name: "name",
        sale: false,
        price: 10,
        tags: ["movil"],
        photo: null,
      },
    ];
    const action = {
      type: "adverts/loaded/fulfilled",
      payload: { data: adverts, loaded: true },
    };
    const result = AdvertsLoadedFulfilled(adverts, true);
    expect(result).toEqual(action);
  });
});

//action creator síncrono
describe("advertCreatedFulfilled", () => {
  test('should return an "adverts/created/fulfilled" action', () => {
    const advert: Advert = {
      id: "123",
      name: "Test Advert",
      sale: true,
      price: 100,
      tags: ["mobile"],
      photo: null,
    };

    const expectedAction = {
      type: "adverts/created/fulfilled",
      payload: advert,
    };

    const result = advertCreatedFulfilled(advert);
    expect(result).toEqual(expectedAction);
  });
});
