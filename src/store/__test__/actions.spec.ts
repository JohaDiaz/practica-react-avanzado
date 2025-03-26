import {
  authLoginPending,
  AdvertsLoadedFulfilled,
  authLogin,
} from "../actions";
import type { Advert } from "@/pages/adverts/types";
import { advertCreatedFulfilled } from "@/store/actions";
import { ApiClientError } from "@/api/error";
import type { Credentials } from "@/pages/auth/types";

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

  //action creator asíncrono
  describe("authLogin thunk", () => {
    const credentials: Credentials = {
      email: "test@example.com",
      password: "123456",
    };
    const remember = false;
    const from = "/from";

    const dispatch = vi.fn();
    const router = {
      state: { location: { state: { from } } },
      navigate: vi.fn(),
    };
    const api = {
      authService: {
        login: vi.fn(),
      },
    };

    afterEach(() => {
      vi.clearAllMocks();
    });

    test("dispatches pending and fulfilled, then navigates on success", async () => {
      api.authService.login.mockResolvedValueOnce(undefined);

      const thunk = authLogin(credentials, remember);
      // @ts-expect-error - getState not used
      await thunk(dispatch, undefined, { api, router });

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: "auth/login/pending",
      });
      expect(api.authService.login).toHaveBeenCalledWith(credentials, remember);
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: "auth/login/fulfilled",
      });
      expect(router.navigate).toHaveBeenCalledWith(from, { replace: true });
    });

    test("dispatches pending and rejected on API error", async () => {
      const error = new ApiClientError(new Error("Unauthorized"));
      api.authService.login.mockRejectedValueOnce(error);

      const thunk = authLogin(credentials, remember);
      await expect(
        // @ts-expect-error - getState not used
        thunk(dispatch, undefined, { api, router }),
      ).resolves.toBeUndefined(); // No throw, el error se captura y no se relanza

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: "auth/login/pending",
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: "auth/login/rejected",
        payload: error,
      });
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
  describe("authLogin thunk", () => {
    const credentials: Credentials = {
      email: "test@example.com",
      password: "123456",
    };
    const remember = false;
    const from = "/from";

    const dispatch = vi.fn();
    const router = {
      state: { location: { state: { from } } },
      navigate: vi.fn(),
    };
    const api = {
      authService: {
        login: vi.fn(),
      },
    };

    afterEach(() => {
      vi.clearAllMocks();
    });

    test("dispatches pending and fulfilled, then navigates on success", async () => {
      api.authService.login.mockResolvedValueOnce(undefined);

      const thunk = authLogin(credentials, remember);
      // @ts-expect-error - getState not used
      await thunk(dispatch, undefined, { api, router });

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: "auth/login/pending",
      });
      expect(api.authService.login).toHaveBeenCalledWith(credentials, remember);
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: "auth/login/fulfilled",
      });
      expect(router.navigate).toHaveBeenCalledWith(from, { replace: true });
    });

    test("dispatches pending and rejected on API error", async () => {
      const error = new ApiClientError(new Error("Unauthorized"));
      api.authService.login.mockRejectedValueOnce(error);

      const thunk = authLogin(credentials, remember);
      await expect(
        // @ts-expect-error - getState not used
        thunk(dispatch, undefined, { api, router }),
      ).resolves.toBeUndefined(); // No throw, el error se captura y no se relanza

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: "auth/login/pending",
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: "auth/login/rejected",
        payload: error,
      });
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
