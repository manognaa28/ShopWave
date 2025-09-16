import connectDB from "./lib/mongodb";
import User from "@/models/Users";

async function test() {
  try {
    await connectDB();
    console.log("Connected to DB");

    const user = await User.create({
      firstName: "Test",
      lastName: "User",
      email: "testuser@example.com",
      password: "hashedpassword123",
    });

    console.log("Created user:", user);
  } catch (e) {
    console.error("DB Test failed:", e);
  }
  process.exit();
}

test();
