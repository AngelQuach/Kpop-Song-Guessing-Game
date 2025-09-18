import { NextResponse } from "next/server";
import { db } from "../../../../lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { email, verifyCode } = await req.json();

    if (typeof email !== "string" || typeof verifyCode !== "string") {
      return NextResponse.json({ error: "Invalid payload", reason: `email:${email} code:${verifyCode}` }, { status: 400 });
    }

    // Find pendingUser profile
    const snapshot = await db.collection("pendingUsers").where("email", "==", email).get();
    if (snapshot.empty) return NextResponse.json({ ok: false, reason: "pendingUser not created" }, { status: 404 });
    
    // Check if code match and hasn't expire
    const doc = snapshot.docs[0];
    const userData = doc.data();
    const docsRef = doc.ref;

    if (Date.now() > userData.expiresAt) return NextResponse.json({ ok: false, reason: "Verify code expired" }, { status: 401 });
    if (verifyCode !== userData.verifyCode) return NextResponse.json({ ok: false, reason: "Incorrect verify code" }, { status: 401 });
    
    // Now "migrate" user profile to users collection
    await db.collection("users").doc(email).set({
      email,
      username: email,
      pwd: userData.pwd,
      hashedPwd: userData.hashedPwd,
      createdAt: Date.now(),
    });
    await docsRef.delete();

    // At this point, verification has succeeded
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[VERIFY ERROR]", err);
    return NextResponse.json({ error: "Verification code check failed" }, { status: 500 });
  }
}