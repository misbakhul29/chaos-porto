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
            from: email,
            to: "misbakhul2904@gmail.com",
            subject: `[Chaos Portfolio] New message from ${name}`,
            html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Message</title>
  </head>
  <body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td align="center" style="padding:48px 16px;">
          <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;width:100%;">

            <!-- Header -->
            <tr>
              <td style="padding-bottom:32px;">
                <p style="margin:0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#555;">
                  chaos portfolio
                </p>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="border-top:1px solid #1f1f1f;padding-bottom:32px;"></td>
            </tr>

            <!-- Subject line -->
            <tr>
              <td style="padding-bottom:24px;">
                <p style="margin:0;font-size:22px;font-weight:600;color:#f5f5f5;line-height:1.3;">
                  New message from ${name}
                </p>
              </td>
            </tr>

            <!-- Message body -->
            <tr>
              <td style="background:#111;border-radius:8px;padding:24px 28px;">
                <p style="margin:0;font-size:15px;color:#bbb;line-height:1.75;white-space:pre-wrap;">${message}</p>
              </td>
            </tr>

            <!-- Sender info -->
            <tr>
              <td style="padding-top:28px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="padding-right:12px;vertical-align:middle;">
                      <div style="width:36px;height:36px;border-radius:50%;background:#1f1f1f;text-align:center;line-height:36px;font-size:15px;font-weight:600;color:#888;">
                        ${name.charAt(0).toUpperCase()}
                      </div>
                    </td>
                    <td style="vertical-align:middle;">
                      <p style="margin:0;font-size:14px;font-weight:500;color:#e0e0e0;">${name}</p>
                      <p style="margin:4px 0 0;font-size:13px;color:#555;">${email}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="border-top:1px solid #1f1f1f;padding-top:28px;margin-top:28px;"></td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding-top:4px;">
                <p style="margin:0;font-size:11px;color:#333;letter-spacing:0.05em;">
                  Sent via chaos-porto contact form &middot; ${new Date().toUTCString()}
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
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