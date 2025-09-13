import { NextResponse } from "next/server";
import { getCode, clearCode } from "../../../../lib/codeStore";

export async function POST(req: Request) {
  try {
    const { email, verifyCode } = await req.json();
    if (typeof email !== "string" || typeof verifyCode !== "string") {
      return NextResponse.json({ error: "Invalid payload", reason: `email:${email} code:${verifyCode}` }, { status: 400 });
    }

    // Get the matching code
    const idealCode = getCode(email);
    if (!idealCode) return NextResponse.json({ ok: false, reason: "no_code" }, { status: 400 });
    if (Date.now() > idealCode.expiresAt) return NextResponse.json({ ok: false, reason: "expired" }, { status: 400 });

    // Compare code
    if (verifyCode !== idealCode.code) return NextResponse.json({ ok: false, reason: "mismatch" }, { status: 400 });

    clearCode(email);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}