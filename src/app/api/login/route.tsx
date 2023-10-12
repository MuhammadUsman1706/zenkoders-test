import { auth } from "@/lib/firebase-config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { user } = await request.json();
    const {
      user: { uid, displayName },
    } = await signInWithEmailAndPassword(auth, user.email, user.password);

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
      value: displayName as string,
      maxAge: expiresIn,
      httpOnly: true,
      // secure: true,
    };

    cookies().set(uidOptions);
    cookies().set(stripeOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const session = cookies().get("session")?.value || "";

  // Validate if the cookie exist in the request
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  return NextResponse.json({ isLogged: true }, { status: 200 });
}
