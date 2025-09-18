import { NextResponse } from "next/server";
import { db } from "../../../../lib/firebase-admin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

function randomCode() {
    return String(Math.floor(Math.random() * 1_000_000)).padStart(6, "0");
}

export async function POST(req: Request) {
    const { email } = await req.json();
    try {
        if (!email || typeof email !== "string") {
            return NextResponse.json({ error: `Invalid email: ${email}` }, { status: 400 });
        }

        const code: string = randomCode();

        // First check if a verification code already sent (pendingUser exists already)
        const snapshot = await db.collection("pendingUsers").where("email", "==", email).get();
        if (snapshot.empty) {
          // If pendingUser profile not exists => Error!
          return NextResponse.json({ error: "Pending user profile not found for this email." }, { status: 404 });
        } 
        
        // If a code is already sent, update code
        const docRef = snapshot.docs[0].ref;
        await docRef.update({
          verifyCode: code,
          createdAt: Date.now(),
          expiresAt: Date.now() + 60 * 1000, // 1 minute from now in ms
        });

        // DEV: sends verify code to user
        console.log(`[DEV] Verification code for ${email}: ${code}`);

        return NextResponse.json({ ok: true }, { status: 201 });
    } catch (err) {
        console.error("[SEND CODE ERROR]:", err);
        return NextResponse.json({ error: "Failed to send verification code" }, { status: 500 });
    }
}