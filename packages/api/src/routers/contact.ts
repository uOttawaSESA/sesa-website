import { createTRPCRouter, publicProcedure } from "@repo/api/trpc";
import { envServer } from "@repo/env";
import { TRPCError } from "@trpc/server";
import nodemailer from "nodemailer";
import * as z from "zod";

/** Escape user input before interpolating it into the HTML email body. */
const escapeHtml = (text: string) =>
    text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

const EmailRequest = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
    topic: z.string(),
    message: z.string(),
    recaptchaToken: z.string().transform(token => encodeURIComponent(token)),
});

export const contactRouter = createTRPCRouter({
    sendEmail: publicProcedure.input(EmailRequest).mutation(async ({ input }) => {
        const { firstName, lastName, email, topic, message, recaptchaToken } = input;

        // 1. Verify reCAPTCHA
        const recaptchaSecret = envServer.RECAPTCHA_SECRET_KEY;

        const recaptchaRes = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`,
            { method: "POST" },
        );
        const recaptchaData = await recaptchaRes.json();

        if (!recaptchaData.success)
            throw new TRPCError({ code: "BAD_REQUEST", message: "reCAPTCHA failed" });

        // 2. Send email (with replyTo set to user's email)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: envServer.EMAIL_USER,
                pass: envServer.EMAIL_PASS,
            },
        });

        const safe = {
            firstName: escapeHtml(firstName),
            lastName: escapeHtml(lastName),
            email: escapeHtml(email),
            topic: escapeHtml(topic),
            message: escapeHtml(message),
        };

        try {
            await transporter.sendMail({
                from: envServer.EMAIL_USER, // must match authenticated user
                to: envServer.EMAIL_USER, // your email, so you receive the message
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
            <p><strong>First Name:</strong> ${safe.firstName}</p>
            <p><strong>Last Name:</strong> ${safe.lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${safe.email}" style="color:#8824dc;">${safe.email}</a></p>
            <p><strong>Topic:</strong> ${safe.topic}</p>
            <div style="margin-top: 18px;">
                <strong>Message:</strong>
                <div style="background: #fff; border-radius: 6px; padding: 12px 16px; margin-top: 6px; color: #333; white-space: pre-line;">
                    ${safe.message}
                </div>
            </div>
        </div>
    `,
            });

            return { success: true };
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "An unexpected error occurred while sending the message.",
                cause: error,
            });
        }
    }),
});
