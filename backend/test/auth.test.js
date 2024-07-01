const request = require("supertest");
const app = require("../server");
const pool = require("../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("../config");

const { login } = require("../controllers/authController");

describe("Auth Controll - Login", () => {
  describe("when username and password correct", () => {
    it("should return 200 and token if login is successful", async () => {
      //mock data สำหรับ user ใน database
      const user = {
        userid: 1,
        username: "testuser",
        password: "hashedpassword",
      };

      //mock query ข้อมูลจาก database
      pool.query.mockResolvedValueOnce({ rows: [user] });

      //mock bcrypt ให้ mach password สำเร็จ
      bcrypt.compare.mockResolvedValueOnce(true);

      // mock jwt ให้ return token
      jwt.sign.mockReturnValue("fakeToken");

      //ทดสอบ login
      const response = await request(app)
        .post("/auth/login")
        .send({ username: "testuser", password: "correctpassword" });

      expect(response.status).toBe(200);
      expect(response.body.token).toBe("fakeToken");
      expect(response.body.user).toEqual({ userId: 1, username: "testuser" });
    });
  });
  describe("When this user does not exist", () => {
    it("should return 404 if user is not found", async () => {
      // mock query database ให้เป็นค่าว่าง
      pool.query.mockResolvedValueOnce({ rows: [] });
      //ทดสอบ login
      const response = await request(app)
        .post("/auth/login")
        .send({ username: "nonexistentuser", password: "password123" });
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("User not found");
    });
  });
  describe("When username or password is wrong",()=>{
    it("should return 401 if password is incorrect", async ()=>{
      const user = {userid:1 ,username:"testuser",password:"hashedpassowrd"}

      pool.query.mockResolvedValueOnce({rows:[user]})
      bcrypt.compare.mockResolvedValueOnce(false)

      const response = await request(app)
      .post("/auth/login")
      .send({username:"testuser",password:"wrongpassword"})
      expect(response.status).toBe(401)
      expect(response.body.error).toBe("Invalid username or password")
    })
  })
});
