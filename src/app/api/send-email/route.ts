import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

// will need to create RECAPTCHA SECRET KEY and email user and pass later on.
const RECAPTCHA_SECRET_KEY = null;
const EMAIL_USER = null;
const EMAIL_PASS = null;

const verifyRecaptcha = async (token: string) => {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();
    return data.success && data.score > 0.5; // accepts high-confidence users
};

export async function POST(req: NextRequest) {
    try {
        const { firstName, lastName, email, topic, message, recaptchaToken } = await req.json();

        const isHuman = await verifyRecaptcha(recaptchaToken);
        if (!isHuman)
            return NextResponse.json(
                { success: false, message: "reCAPTCHA verification failed." },
                { status: 400 },
            );

        // nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: EMAIL_USER, pass: EMAIL_PASS },
        });

        //TODO: need to add our email address here.
        await transporter.sendMail({
            from: `"${firstName} ${lastName}" <${email}>`,
            to: `${EMAIL_USER}`,
            subject: `New Contact Form Submission - ${topic}`,
            text: `From ${firstName} ${lastName} (${email})\n\nMessage:\n${message}`,
        });

        return NextResponse.json({ success: true, message: "Email sent successfully." });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Email failed to send.", error: error },
            { status: 500 },
        );
    }
}
