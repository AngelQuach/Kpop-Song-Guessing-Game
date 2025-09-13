import { NextResponse } from "next/server";

const credentialSet = [
  { credential: "tropicalFruits123", pwd: "12345678" },
  { credential: "appleU@gmail.com", pwd: "12345678A" },
];

export async function POST(req: Request) {
  try {
    const { email, pwd } = await req.json();
    if (typeof email !== "string" || typeof pwd !== "string") {
      return NextResponse.json({ error: "Invalid payload", reason: `email:${email} pwd:${pwd}` }, { status: 400 });
    }

    // Get the matching code
    const targetUser = credentialSet.find((user: { credential: string, pwd: string }) => user.credential === email);
    if (!targetUser) return NextResponse.json({ ok: false, reason: "credential_not_found" }, { status: 400 });
    if (targetUser.pwd != pwd) return NextResponse.json({ ok: false, reason: "incorrect_pwd" }, { status: 400 });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}