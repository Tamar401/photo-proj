import { Resend } from "resend";
import { NextResponse } from "next/server";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    console.log("📨 קיבלנו בקשה ל-POST ב-/api/contact");
    
    const body: Body = await request.json();
    const { name = "", email = "", phone = "", message = "" } = body;

    console.log("📋 נתונים קיבלו:", { name, email, phone, messageLength: message.length });

    if (!name || !email || !message) {
      console.log("⚠️ שדות חובה חסרים");
      return NextResponse.json({ error: "חסרים שדות חובה" }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const EMAIL_TO = process.env.EMAIL_TO || "r0527149555@gmail.com";

    console.log("🔑 בדיקה של API Key:", RESEND_API_KEY ? "✅ קיים" : "❌ חסר");
    console.log("📧 שולח אל:", EMAIL_TO);

    if (!RESEND_API_KEY) {
      console.error("❌ API Key חסר!");
      return NextResponse.json({ 
        error: "שירות המייל לא מוגדר. אנא פנה למנהל האתר." 
      }, { status: 500 });
    }

    const resend = new Resend(RESEND_API_KEY);

    console.log("🚀 שולח דוא״ל דרך Resend...");
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: EMAIL_TO,
      subject: `הודעה חדשה מאתר הצילומים - ${name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff4fb; border-radius: 10px;">
          <h2 style="color: #ffb4d8; text-align: center;">📧 הודעה חדשה מאתר הצילומים</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <p style="margin: 10px 0;"><strong style="color: #331a34;">שם:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #331a34;">אימייל:</strong> <a href="mailto:${email}" style="color: #ffb4d8;">${email}</a></p>
            ${phone ? `<p style="margin: 10px 0;"><strong style="color: #331a34;">טלפון:</strong> <a href="tel:${phone}" style="color: #ffb4d8;">${phone}</a></p>` : ''}
          </div>

          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h3 style="color: #331a34; margin-top: 0;">הודעה:</h3>
            <p style="color: #5d3a59; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="text-align: center; color: #7e5b7b; font-size: 12px; margin-top: 20px;">
            הודעה זו נשלחה מטופס יצירת קשר באתר הצילומים
          </p>
        </div>
      `,
    });

    console.log("✅ דוא״ל נשלח בהצלחה!", result);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("❌ Contact API error:", {
      message: err?.message,
      code: err?.code,
      status: err?.status,
      fullError: err
    });
    return NextResponse.json({ 
      error: err?.message || "שגיאה בשליחת ההודעה. נסה שוב מאוחר יותר." 
    }, { status: 500 });
  }
}
