import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  const { data } = await request.json();

  const handleTemplateRender = () => {
    let html = "";
    for (const part in data) {
      const partlength = Object.keys(data[part]).length;
      if (partlength > 0) {
        html += `<h3>${part} (${partlength}):</h3>`;
        for (const question in data[part]) {
          html += `<p>- ${question}: ${data[part][question]}</p>`;
        }
      }
    }
    return html;
  };

  handleTemplateRender();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: process.env.MY_EMAIL,
    subject: `Message de ${Object.keys(data)[0][0]} ${Object.keys(data)[0][1]}`,
    html: handleTemplateRender(),
  };

  const sendMailPromise = () =>
    new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject("Il y a eu une erreur...");
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: "Email envoyé" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
