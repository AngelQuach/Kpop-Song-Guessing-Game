import { NextResponse } from "next/server";
import { db } from "../../../../lib/firebase-admin";
import bcrypt from "bcrypt";

export async function POST(req: Response) {
    const { email, pwd } = await req.json();

    try {
        if (!email || typeof email !== "string" || !pwd || typeof pwd !== "string") {
            return NextResponse.json({ error: `Invalid email/pwd: ${email}, ${pwd}` }, { status: 400 });
        }

        const snapshot = await db.collection("users").where("email", "==", email).get();

        if (snapshot.empty) {
            // Create a pendingUser
            const hashedPwd = await bcrypt.hash(pwd, 10);

            await db.collection("pendingUsers").add({
                email,
                pwd,
                hashedPwd,
                username: email,
                verifyCode: null,
                createdAt: Date.now(),
                expiresAt: null,
            });

            return NextResponse.json({ ok: true }, { status: 201 });
        } else return NextResponse.json({ ok: false, reason: "User already exists" }, { status: 401 });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Check failed" }, { status: 500 });
    }
}