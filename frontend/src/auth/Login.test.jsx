import React from "react";
import { shallow } from "enzyme";
import Login from "./Login";
import LoginForm from "../components/Login/LoginForm";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { setToken } from "./Services/Autherize";

jest.mock('react-router-dom', () => {
    const actual = jest.requireActual('react-router-dom');
    return {
      ...actual,
      useNavigate: () => mockNavigate,
    };
  });

jest.mock("./Services/Autherize", () => ({
  setToken: jest.fn(),
}));

const mockNavigate = jest.fn();
const mock = new MockAdapter(axios);

describe("Login Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login />);
  });
  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  describe("When invalid username or password", () => {
    it("should display error message on failed login", async () => {
      mock.onPost("http://localhost:5500/auth/login").reply(401);

      const loginForm = wrapper.find(LoginForm);
      loginForm.prop("onLogin")("wronguser", "wrongpassword");

      await new Promise((resolve) => setTimeout(resolve)); // use setTimeout instead of setImmediate

      wrapper.update();

      expect(wrapper.find(LoginForm).prop("errorMessage")).toEqual(
        "Invalid username or password"
      );
    });
  });

  describe("When login successfully", () => {
    it("should call setToken and navigate on successful login", async () => {
      const token = "fake-token";
      const user = { username: "testuser" };
      mock
        .onPost("http://localhost:5500/auth/login")
        .reply(200, { token, user });

      const loginForm = wrapper.find(LoginForm);
      loginForm.prop("onLogin")("testuser", "correctpassword");

      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(setToken).toHaveBeenCalledWith(token, user.username);
      expect(mockNavigate).toHaveBeenCalledWith("/inventory");
    });
  });
});
