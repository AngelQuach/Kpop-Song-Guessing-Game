import { NextResponse } from "next/server";
import { setCode } from "../../../../lib/codeStore";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

function randomCode() {
    return String(Math.floor(Math.random() * 1_000_000)).padStart(6, "0");
}

export async function POST(req: Request) {
    try {
    const { email } = await req.json();
    if (typeof email !== "string") {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const code: string = randomCode();
    setCode(email, code, 600);

    // await resend.emails.send({
    //     from: process.env.RESEND_FROM!,
    //     to: email,
    //     subject: "Verification Code For IdolEar",
    //     text: `Your code is ${code}. It expires in 10 minutes.`,
    // });
    console.log(`[DEV] Verification code for ${email}: ${code}`);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}