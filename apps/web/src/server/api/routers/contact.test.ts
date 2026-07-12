import type { Database } from "@repo/db";
import { TRPCError } from "@trpc/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const sendMail = vi.fn(async (_options: unknown) => ({}));
vi.mock("nodemailer", () => ({
    default: { createTransport: vi.fn(() => ({ sendMail })) },
}));

// import AFTER the mock declaration (vi.mock is hoisted, but keep it explicit)
import { createCaller } from "@/server/api/root";

// The contact router never touches the DB, so an empty stub is fine.
const caller = createCaller({ db: {} as unknown as Database, headers: new Headers() });

const validInput = {
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
    topic: "General Inquiry",
    message: "Hello there",
    recaptchaToken: "tok",
};

function stubRecaptcha(success: boolean) {
    vi.stubGlobal(
        "fetch",
        vi.fn(async () => ({ json: async () => ({ success }) })),
    );
}

beforeEach(() => {
    sendMail.mockClear();
    vi.unstubAllGlobals();
});

describe("contactRouter.sendEmail", () => {
    it("rejects with BAD_REQUEST when reCAPTCHA verification fails", async () => {
        stubRecaptcha(false);

        await expect(caller.contact.sendEmail(validInput)).rejects.toSatisfy(
            error => error instanceof TRPCError && error.code === "BAD_REQUEST",
        );
        expect(sendMail).not.toHaveBeenCalled();
    });

    it("sends the email and reports success when reCAPTCHA passes", async () => {
        stubRecaptcha(true);

        await expect(caller.contact.sendEmail(validInput)).resolves.toEqual({ success: true });

        expect(sendMail).toHaveBeenCalledTimes(1);
        const mailArgs = sendMail.mock.calls[0]?.[0] as unknown as {
            replyTo: string;
            subject: string;
        };
        expect(mailArgs.replyTo).toBe("ada@example.com");
        expect(mailArgs.subject).toContain("General Inquiry");
    });

    it("strips HTML tags from inputs before emailing", async () => {
        stubRecaptcha(true);

        await caller.contact.sendEmail({
            ...validInput,
            firstName: "<b>Ada</b>",
            message: "<script>x</script>hi",
        });

        expect(sendMail).toHaveBeenCalledTimes(1);
        const mailArgs = sendMail.mock.calls[0]?.[0] as unknown as { text: string };
        expect(mailArgs.text).toContain("Ada");
        expect(mailArgs.text).toContain("hi");
        expect(mailArgs.text).not.toContain("<b>");
        expect(mailArgs.text).not.toContain("<script>");
    });

    it("wraps transport failures in an INTERNAL_SERVER_ERROR", async () => {
        stubRecaptcha(true);
        sendMail.mockRejectedValueOnce(new Error("SMTP is down"));

        await expect(caller.contact.sendEmail(validInput)).rejects.toSatisfy(
            error => error instanceof TRPCError && error.code === "INTERNAL_SERVER_ERROR",
        );
    });
});
