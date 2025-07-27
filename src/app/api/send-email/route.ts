import { NextRequest, NextResponse } from "next/server";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import nodemailer from "nodemailer";
import * as z from "zod";

const purify = (text: string) =>
    DOMPurify(new JSDOM("<!DOCTYPE html>").window).sanitize(text, { ALLOWED_TAGS: [] });

const EmailRequest = z.object({
    firstName: z.string().transform(purify),
    lastName: z.string().transform(purify),
    email: z.string().transform(purify),
    topic: z.string().transform(purify),
    message: z.string().transform(purify),
    recaptchaToken: z.string().transform(token => encodeURIComponent(token)),
});

export async function POST(req: NextRequest) {
    const requestBody = EmailRequest.safeParse(await req.json());
    if (!requestBody.success)
        return NextResponse.json(
            { error: "Invalid request", details: requestBody.error.issues },
            { status: 422 },
        );

    const { firstName, lastName, email, topic, message, recaptchaToken } = requestBody.data;

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
            html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #222; background: #faf8ff; padding: 24px; border-radius: 10px;">
            <h2 style="color: #8824dc; margin-bottom: 16px;">Contact Form Submission</h2>
            <p><strong>First Name:</strong> ${firstName}</p>
            <p><strong>Last Name:</strong> ${lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#8824dc;">${email}</a></p>
            <p><strong>Topic:</strong> ${topic}</p>
            <div style="margin-top: 18px;">
                <strong>Message:</strong>
                <div style="background: #fff; border-radius: 6px; padding: 12px 16px; margin-top: 6px; color: #333; white-space: pre-line;">
                    ${message}
                </div>
            </div>
        </div>
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
