import type { Advert } from "@/pages/adverts/types";
import { adverts, auth } from "../reducers";

describe("auth reducer", () => {
  test('"should return auth/login/fulfilled" action', () => {
    const result = auth(undefined, { type: "auth/login/fulfilled" });
    expect(result).toBe(true);
  });

  test('should manage "auth/logout" action', () => {
    const result = auth(undefined, { type: "auth/logout" });
    expect(result).toBe(false);
  });

  test("should manage any other action", () => {
    const result = auth(true, { type: "ui/reset-error" });
    expect(result).toBe(true);
  });

  describe("adverts reducer", () => {
    const advert: Advert = {
      id: "1",
      name: "Advert 1",
      price: 100,
      sale: true,
      tags: ["lifestyle"],
      photo: null,
    };

    test('should manage "adverts/created/fulfilled" action', () => {
      const result = adverts(
        { data: [], loaded: false },
        { type: "adverts/created/fulfilled", payload: advert },
      );
      expect(result.data).toHaveLength(1);
      expect(result.data).toEqual([advert]);
      expect(result.loaded).toBe(false);
    });
  });
});
