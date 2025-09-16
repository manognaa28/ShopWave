// __tests__/login.integration.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "@/app/login/page";
import { rest } from "msw";
import { setupServer } from "msw/node";

// Mock server for API calls
const server = setupServer(
  rest.post("/api/login", (req, res, ctx) => {
    const { email, password } = req.body as any;

    if (email === "john@example.com" && password === "password123") {
      return res(ctx.status(200), ctx.json({ user: { firstName: "John" } }));
    } else {
      return res(ctx.status(401), ctx.json({ error: "Invalid credentials" }));
    }
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Login Integration Tests", () => {

  it("renders the login form", () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("successfully logs in with correct credentials", async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/login successful/i)).toBeInTheDocument();
    });
  });

  it("shows error for invalid credentials", async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "wrong@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "wrongpass" } });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

});
