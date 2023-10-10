// import { customInitApp } from "@/lib/firebase-admin-config";
// import { auth as adminAuth } from "firebase-admin";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  User,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase-config";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { user } = await request.json();

    const {
      user: { uid },
    } = await createUserWithEmailAndPassword(auth, user?.email, user?.password);

    const { id } = await stripe.customers.create({
      description: uid,
    });

    // Using displayName to store stripe customer id JUST BECAUSE of time constraints. This is not a good practice.
    // Should be stored in a database.
    updateProfile(auth.currentUser as User, { displayName: id });

    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    const uidOptions = {
      name: "session",
      value: uid,
      maxAge: expiresIn,
      httpOnly: true,
      // secure: true,
    };

    const stripeOptions = {
      name: "stripe",
      value: id,
      maxAge: expiresIn,
      httpOnly: true,
      // secure: true,
    };

    cookies().set(uidOptions);
    cookies().set(stripeOptions);

    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 500 }
    );
  }
}
