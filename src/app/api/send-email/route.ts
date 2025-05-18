import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    const { firstName, lastName, email, topic, message, recaptchaToken } = await req.json();

    // 1. Verify reCAPTCHA
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const recaptchaRes = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`,
        { method: "POST" },
    );
    const recaptchaData = await recaptchaRes.json();
    console.log("reCAPTCHA verification result:", recaptchaData);

    if (!recaptchaData.success) {
        return NextResponse.json({ error: "reCAPTCHA failed" }, { status: 400 });
    }

    // 2. Send email (with replyTo set to user's email)
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER, // must match authenticated user
            to: process.env.EMAIL_USER, // your email, so you receive the message
            replyTo: email, // user's email, so you can reply directly
            subject: `Contact Form Submission: ${topic}`,
            text: `
First Name: ${firstName}
Last Name: ${lastName}
Email: ${email}
Topic: ${topic}
Message: ${message}
            `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to send email:", error);
        return NextResponse.json(
            { error: "Failed to send email", details: String(error) },
            { status: 500 },
        );
    }
}
