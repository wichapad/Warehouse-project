import React from "react";
import { shallow } from "enzyme";
import Login from "./Login";
import LoginForm from "../components/Login/LoginForm";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { setToken } from "./Services/Autherize";

// Mock navigate
jest.mock('react-router-dom', () => {
    const actual = jest.requireActual('react-router-dom');
    return {
      ...actual,
      useNavigate: () => mockNavigate,
    };
  });

  // mock set token
jest.mock("./Services/Autherize", () => ({
  setToken: jest.fn(),
}));

// สร้าง mock funtion navigate
const mockNavigate = jest.fn();
// สร้าง mock adapter axios เพื่อ จำลอง HTTP requst
const mock = new MockAdapter(axios);

describe("Login Component", () => {
  let wrapper;

  // ก่อนการ test render login components ใหม่ทุกคั้ง
  beforeEach(() => {
    wrapper = shallow(<Login />);
  });
  // หลังจากการทดสอบล้าง mock ออก
  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  describe("When invalid username or password", () => {
    it("should display error message on failed login", async () => {
      mock.onPost("http://localhost:5500/auth/login").reply(401);

      //เรียกฟังก์ชัน onLogin ที่เป็น prop ของ LoginForm ด้วยข้อมูล username และ password ที่ไม่ถูกต้อง
      const loginForm = wrapper.find(LoginForm);
      loginForm.prop("onLogin")("wronguser", "wrongpassword");

      await new Promise((resolve) => setTimeout(resolve)); // รอให้ promises ทำงานเสร็จ

      wrapper.update(); //อัปเดต component หลังจากที่ state เปลี่ยน

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

      //เรียกฟังก์ชัน onLogin ที่เป็น prop ของ LoginForm ด้วยข้อมูล username และ password ที่ถูกต้อง
      const loginForm = wrapper.find(LoginForm);
      loginForm.prop("onLogin")("testuser", "correctpassword");

      await new Promise((resolve) => setTimeout(resolve, 0)); //รอให้ promises ทำงานเสร็จ

      expect(setToken).toHaveBeenCalledWith(token, user.username);
      expect(mockNavigate).toHaveBeenCalledWith("/inventory");
    });
  });
});
