import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "../login-page";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import * as store from "@/store";
import * as actions from "@/store/actions";

// Mock useAppDispatch y useAppSelector
const mockDispatch = vi.fn();
vi.mock("@/store", async () => {
  const actual = await vi.importActual<typeof store>("@/store");
  return {
    ...actual,
    useAppDispatch: () => mockDispatch,
    useAppSelector: vi.fn(() => ({ pending: false, error: null })),
  };
});

// Mock de la acción authLogin
vi.mock("@/store/actions", async () => {
  const actual = await vi.importActual<typeof actions>("@/store/actions");
  return {
    ...actual,
    authLogin: vi.fn(() => ({ type: "MOCKED_AUTH_LOGIN" })),
  };
});

describe("LoginPage component", () => {
  test("calls authLogin when form is submitted", async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", {
      name: /Log in to Nodepop/i,
    });

    fireEvent.change(emailInput, { target: { value: "test@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.click(submitButton);

    // Espera un tick del event loop
    await new Promise((r) => setTimeout(r, 0));

    expect(mockDispatch).toHaveBeenCalled();
    expect(actions.authLogin).toHaveBeenCalledWith(
      { email: "test@email.com", password: "123456" },
      false,
    );
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
