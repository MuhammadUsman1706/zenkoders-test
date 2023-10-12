import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  //Remove the value and expire the cookie
  cookies().delete("session");
  cookies().delete("stripe");
  return NextResponse.json({ success: true }, { status: 200 });
}
