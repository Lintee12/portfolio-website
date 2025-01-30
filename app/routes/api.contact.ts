import { ActionFunction, json } from "@remix-run/node";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const action: ActionFunction = async ({ request }) => {
  const { name, email, message }: { name: string; email: string; message: string } =
    await request.json();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.NOTIFY_EMAIL,
    subject: "New Contact Form Submission",
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return json({ message: "Success, email sent!" });
  } catch (error) {
    console.error(error);
    return json({ error: "There was an issue sending your email." }, { status: 500 });
  }
};
