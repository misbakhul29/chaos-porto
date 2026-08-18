import { apiRateLimiter } from "@/lib/rate-limiter";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
    try {
        const ip = request.headers.get("x-forwarded-for") || "unknown";
        if (!apiRateLimiter.check(ip)) {
            return NextResponse.json(
                { success: false, message: "Too many requests" },
                { status: 429 }
            );
        }

        const { RESEND_API_KEY } = process.env;

        if (!RESEND_API_KEY) {
            return NextResponse.json(
                { success: false, message: "Server configuration error" },
                { status: 500 }
            );
        }

        const resend = new Resend(RESEND_API_KEY);

        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        const { error: sendError } = await resend.emails.send({
            from: "contact@misbakhul.com",
            to: "admin@misbakhul.com",
            replyTo: `${name} <${email}>`,
            subject: `[Chaos Portfolio] New message from ${name}`,
            html: `<div style="max-width:560px;margin:0 auto;padding:40px 24px;font-family:Georgia,serif;color:#1a1a1a;font-size:16px;line-height:1.7;">
  <p style="margin:0 0 8px;font-size:13px;color:#999;font-family:monospace;">chaos-porto / contact</p>
  <hr style="border:none;border-top:1px solid #e5e5e5;margin:0 0 32px;" />
  <p style="margin:0 0 4px;font-size:13px;color:#999;">From: <strong style="color:#1a1a1a;">${name}</strong> &lt;${email}&gt;</p>
  <p style="margin:0 0 32px;font-size:13px;color:#999;">${new Date().toUTCString()}</p>
  <p style="margin:0;white-space:pre-wrap;">${message}</p>
  <hr style="border:none;border-top:1px solid #e5e5e5;margin:40px 0 0;" />
</div>`,
        });

        if (sendError) {
            console.error("[Resend send error]", sendError);
            return NextResponse.json(
                { success: false, message: sendError.message ?? "Failed to send email" },
                { status: 502 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[Resend unexpected error]", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}