import { mailOptions, transporter } from "@/lib/nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, evaluation } = await req.json();
    let skillArr: string[] = [];

    const htmlTemplate = `
    <h2 style="font-size:2rem;color:black">Skill Recommendations:</h2>
      <ul>
      ${evaluation.skillReccomendations.data
        .map((item: any) => {
          if (!skillArr.includes(item)) {
            skillArr.push(item);
            return `<li style="font-size:1rem;color:black">${item}</li>`;
          }
        })
        .join("")}
      </ul>
      <h2 style="font-size:2rem;color:black">Jobs:</h2>
      <ul style="list-style-type:none;padding:0;">
        ${evaluation.jobs.data.matches
          .map(
            (job: any, i: number) => `
            <li style="font-size:1.5rem;color:black;font-weight:bold;margin-bottom:0.75rem">
              Job #${i + 1}
            <ul style="font-size:1rem;color:black;list-style-type:none;padding:0">
              ${Object.entries(job.metadata)
                .map(
                  ([key, value]) =>
                    `<li style="font-size:1rem;color:black;font-weight:normal">${key}: ${value}</li>`
                )
                .join("")}
            </ul>
          </li>`
          )
          .join("")}
      </ul>
    `;

    await transporter.sendMail({
      ...mailOptions,
      subject: "Your career path is here!",
      text: "Career path details",
      to: email,
      html: htmlTemplate,
    });
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error sending email" },
      { status: 400 }
    );
  }
}
