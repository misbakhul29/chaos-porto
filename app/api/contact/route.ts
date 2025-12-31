import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { W3_FORMS_ACCESS_KEY } = process.env;

    if (!W3_FORMS_ACCESS_KEY) {
      console.error("❌ Error: W3_FORMS_ACCESS_KEY is missing in .env");
      return NextResponse.json({ success: false, message: "Server config error" }, { status: 500 });
    }

    const body = await request.json();

    const payload = {
      ...body,
      access_key: W3_FORMS_ACCESS_KEY,
    };

    console.log("🚀 Sending to Web3Forms..."); 
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text(); // Baca sebagai text dulu jaga-jaga kalau bukan JSON
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
        debug: errorMessage // Hapus baris ini nanti di production
    }, { status: 500 });
  }
}