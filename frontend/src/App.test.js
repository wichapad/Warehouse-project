import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders login page by default", () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={["/login"]}>
      <App />
    </MemoryRouter>
  );
  // ตรวจสอบว่า element ที่มีข้อความ "Login" ปรากฏอยู่ในหน้า
  const loginHeading = getByText(/username/i);
  expect(loginHeading).toBeInTheDocument();
});

test("renders inventory page on navigation", () => {
  render(
    <MemoryRouter initialEntries={["/inventory"]}>
      <App />
    </MemoryRouter>
  );
});
