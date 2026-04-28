import { NextResponse } from "next/server";

interface ContactPayload {
    name: string;
    email: string;
    message: string;
}

export async function POST(request: Request) {
    try {
        const { SMTP_API_URL, SMTP_API_KEY } = process.env;

        if (!SMTP_API_URL || !SMTP_API_KEY) {
            return NextResponse.json(
                { success: false, message: "Server configuration error" },
                { status: 500 }
            );
        }

        const body: ContactPayload = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        const res = await fetch(`${SMTP_API_URL}/api/send-email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": SMTP_API_KEY,
            },
            body: JSON.stringify({
                sender: email,
                send_to: "misbakhul2904@gmail.com",
                subject: `[Chaos Portfolio] New message from ${name}`,
                email: `${message}\n\nFrom: ${name} <${email}>`,
            }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            return NextResponse.json(
                { success: false, message: `Upstream error: ${errorText}` },
                { status: res.status }
            );
        }

        return NextResponse.json({ success: true, message: "Email sent" });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(
            { success: false, message: "Internal Server Error", debug: errorMessage },
            { status: 500 }
        );
    }
}