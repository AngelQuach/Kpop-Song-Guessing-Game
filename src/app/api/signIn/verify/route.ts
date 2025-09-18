import { NextResponse } from "next/server";
import { db } from "../../../../lib/firebase-admin";
import bcrypt from "bcrypt";

export async function POST(req: Response) {
    const { credential, pwd } = await req.json();

    try {
        if (!credential || typeof credential !== "string" || !pwd || typeof pwd !== "string")
          return NextResponse.json({ error: `Invalid credential/pwd: ${credential}, ${pwd}` }, { status: 400 });
        
        // Find if a matching email / username exists
        let snapshot = await db.collection("users").where("email", "==", credential).get();
        if (snapshot.empty) {
          snapshot = await db.collection("users").where("username", "==", credential).get();
          
          // If neither exists, return early
          if (snapshot.empty) return NextResponse.json({ ok: false, reason: "User not found" }, { status: 404 });
        }

        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();

        // const hashedPwd = await bcrypt.hash(pwd, 10);
        // const pwdMatch = await bcrypt.compare(hashedPwd, userData.hashedPwd);
        const pwdMatch = pwd === userData.pwd;

        // Compare password
        if (!pwdMatch) {
          return NextResponse.json({ ok: false, reason: "Incorrect password" }, { status: 401 });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Login check failed:", err);
        return NextResponse.json({ error: "Login check failed" }, { status: 500 });
    }
}