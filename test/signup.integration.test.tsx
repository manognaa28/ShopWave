// __tests__/signup.integration.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignupPage from "@/app/signup/page";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.post("/api/signup", (req, res, ctx) => {
    const { email } = req.body as any;
    if (email === "exists@example.com") {
      return res(ctx.status(400), ctx.json({ error: "Email already registered" }));
    }
    return res(ctx.status(200), ctx.json({ success: true }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Signup Integration Tests", () => {
  it("successfully registers a new user", async () => {
    render(<SignupPage />);

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "Doe" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /create an account/i }));

    await waitFor(() => {
      expect(screen.getByText(/account created/i)).toBeInTheDocument();
    });
  });

  it("shows error for existing email", async () => {
    render(<SignupPage />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "exists@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /create an account/i }));

    await waitFor(() => {
      expect(screen.getByText(/email already registered/i)).toBeInTheDocument();
    });
  });
});

