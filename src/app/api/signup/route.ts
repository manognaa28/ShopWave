import connectDB from "@/lib/mongodb";
import User from "@/models/Users";
import bcrypt from "bcryptjs";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    // ✅ Hash the password before saving
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hashedPassword, // ✅ store hashed
    });

    return new Response(
      JSON.stringify({ message: "Registered successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Signup error:", error);
    return new Response(JSON.stringify({ error: "Signup failed" }), {
      status: 500,
    });
  }
}
