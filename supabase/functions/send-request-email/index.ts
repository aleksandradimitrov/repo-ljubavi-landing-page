import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import nodemailer from "npm:nodemailer@6.9.13";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
};

interface RequestData {
    email: string;
    name?: string;
    language?: "en" | "bg" | "sr";
    details?: Record<string, any>;
}

const translations = {
    en: {
        subject: "We received your request - RepoLjubavi",
        greeting: "Hello",
        message: "Thank you for your request. We are currently reviewing it and will get back to you shortly.",
        adminSubject: "New Request Pending - RepoLjubavi",
    },
    bg: {
        subject: "Получихме вашата заявка - RepoLjubavi",
        greeting: "Здравейте",
        message: "Благодарим ви за заявката. В момента я разглеждаме и ще се свържем с вас скоро.",
        adminSubject: "Нова чакаща заявка - RepoLjubavi",
    },
    sr: {
        subject: "Primili smo vaš zahtev - RepoLjubavi",
        greeting: "Zdravo",
        message: "Hvala vam na zahtevu. Trenutno ga pregledamo i javićemo vam se uskoro.",
        adminSubject: "Novi zahtev na čekanju - RepoLjubavi",
    },
};

const handler = async (req: Request): Promise<Response> => {
    // Handle CORS preflight request
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { email, name, language = "en", details }: RequestData = await req.json();

        if (!email) {
            throw new Error("Email is required");
        }

        const t = translations[language] || translations.en;

        // Create Transporter
        const transporter = nodemailer.createTransport({
            host: Deno.env.get("SMTP_HOST") || "smtp.gmail.com",
            port: parseInt(Deno.env.get("SMTP_PORT") || "587"),
            secure: false, // false for TLS/STARTTLS (port 587)
            auth: {
                user: Deno.env.get("SMTP_USER"),
                pass: Deno.env.get("SMTP_PASS"),
            },
            tls: {
                // Do not fail on invalid certs (for development)
                rejectUnauthorized: true,
            },
        });

        // 1. Send email to the User
        const userMailOptions = {
            from: `"RepoLjubavi" <${Deno.env.get("SMTP_USER")}>`,
            to: email,
            subject: t.subject,
            text: `${t.greeting} ${name || ""},\n\n${t.message}\n\nBest regards,\nRepoLjubavi Team`,
            html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>${t.greeting} ${name || ""}!</h2>
          <p>${t.message}</p>
          <br>
          <p>Best regards,<br>RepoLjubavi Team</p>
        </div>
      `,
        };

        await transporter.sendMail(userMailOptions);

        // 2. Send email to Admins
        const adminEmails = Deno.env.get("ADMIN_EMAILS");
        if (adminEmails) {
            const adminMailOptions = {
                from: `"RepoLjubavi System" <${Deno.env.get("SMTP_USER")}>`,
                to: adminEmails, // nodemailer supports comma separated list
                subject: `${t.adminSubject} (${email})`,
                text: `New request received from: ${email}\nName: ${name || "N/A"}\n\nDetails:\n${JSON.stringify(details, null, 2)}`,
                html: `
          <div style="font-family: sans-serif; color: #333;">
            <h2>New Request Pending</h2>
            <p><strong>From:</strong> ${email}</p>
            <p><strong>Name:</strong> ${name || "N/A"}</p>
            <h3>Details:</h3>
            <pre style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${JSON.stringify(details, null, 2)}</pre>
          </div>
        `,
            };
            await transporter.sendMail(adminMailOptions);
        }

        return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error) {
        console.error("Error sending email:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
        });
    }
};

serve(handler);
