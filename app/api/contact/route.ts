import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { W3_FORMS_ACCESS_KEY, NEXT_PUBLIC_SITE_URL } = process.env;

    if (!W3_FORMS_ACCESS_KEY) {
      console.error("❌ Error: W3_FORMS_ACCESS_KEY is missing in .env");
      return NextResponse.json({ success: false, message: "Server config error" }, { status: 500 });
    }

    const body = await request.json();

    const userAgent = request.headers.get("user-agent") || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

    const payload = {
      ...body,
      access_key: W3_FORMS_ACCESS_KEY,
    };

    const originDomain = NEXT_PUBLIC_SITE_URL || "https://misbakhul.my.id"; 

    console.log("🚀 Sending to Web3Forms from:", originDomain); 

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Origin": originDomain,
        "Referer": `${originDomain}/contact`, 
        "User-Agent": userAgent, 
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Web3Forms API Error:", res.status, errorText);
      return NextResponse.json({ success: false, message: `API Error: ${errorText}` }, { status: res.status });
    }

    const data = await res.json();
    console.log("✅ Web3Forms Response:", data);

    if (data.success) {
      return NextResponse.json({ success: true, message: "Email sent" });
    } else {
      console.error("❌ Web3Forms returned success: false", data);
      return NextResponse.json({ success: false, message: data.message || "Failed to send" }, { status: 500 });
    }

  } catch (error) {
    console.error("💥 CATCH BLOCK ERROR:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ 
        success: false, 
        message: "Internal Server Error", 
        debug: errorMessage 
    }, { status: 500 });
  }
}