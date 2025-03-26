import { getAdvertDetail } from "@/store/selectors";
import type { RootState } from "@/store";
import type { Advert } from "@/pages/adverts/types";

describe("getAdvertDetail", () => {
  const advert: Advert = {
    id: "advertExample",
    name: "Test Advert",
    price: 100,
    sale: true,
    tags: ["work"],
    photo: null,
  };

  const state: RootState = {
    auth: true,
    ui: { pending: false, error: null },
    tags: [],
    adverts: {
      data: [advert],
      loaded: true,
    },
  };

  test("should return the advert that matches the given id", () => {
    const result = getAdvertDetail(state, "advertExample");
    expect(result).toEqual(advert);
  });

  test("should return null if no matching advert is found", () => {
    const result = getAdvertDetail(state, "nonexistent-id");
    expect(result).toBeNull();
  });

  test("should return null if advertId is not provided", () => {
    const result = getAdvertDetail(state, undefined);
    expect(result).toBeNull();
  });
});
