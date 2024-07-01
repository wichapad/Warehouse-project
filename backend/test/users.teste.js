// const request = require("supertest");
// const app = require("../server");
// const pool = require("../config");
// const bcrypt = require("bcryptjs");

// const { createUser } = require("../controllers/usersController");

// jest.mock("../config");
// jest.mock("bcryptjs");

// describe("Users Controller - Create User", () => {
//   it("should return 200 and the created user object", async () => {
//     // Mock bcrypt.hash to resolve to a hashed password
//     bcrypt.hash.mockResolvedValue("hashedpassword");

//     // Mock pool.query to resolve with a user object
//     pool.query.mockResolvedValue({
//       rows: [{ userid: 1, username: "testuser", password: "hashedpassword" }],
//     });

//     const response = await request(app)
//       .post("/users/create")
//       .send({ username: "testuser", password: "testpassword" });

//     expect(response.status).toBe(201);
//     expect(response.body.userid).toBe(1);
//     expect(response.body.username).toBe("testuser");
//     expect(response.body.password).not.toBeDefined(); // ตรวจสอบว่า password ไม่ถูกส่งกลับมา
//   });
// });
