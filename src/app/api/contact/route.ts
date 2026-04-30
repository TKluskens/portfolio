import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: "kluskenstom2004@gmail.com",
    replyTo: email,
    subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <p style="color:#888;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px">Portfolio Contact</p>
        <h2 style="margin:0 0 24px">${subject || `Message from ${name}`}</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
          <tr><td style="padding:8px 0;color:#888;font-size:13px;width:80px">From</td><td style="padding:8px 0;font-size:13px">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#888;font-size:13px">Email</td><td style="padding:8px 0;font-size:13px"><a href="mailto:${email}">${email}</a></td></tr>
        </table>
        <div style="background:#f5f5f5;border-radius:4px;padding:20px;font-size:14px;line-height:1.7;white-space:pre-wrap">${message}</div>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
