import { mailOptions, transporter } from "@/lib/nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, evaluation } = await req.json();
    let jobArr: string[] = [];
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
          .map((job: any) => {
            if (!jobArr.includes(job.metadata.Job)) {
              jobArr.push(job.metadata.Job);
              return `
            <li style="font-size:1.5rem;color:black;font-weight:bold;margin-bottom:0.75rem">
            <ul style="font-size:1rem;color:black">
              ${Object.entries(job.metadata)
                .filter(([key, _]) => key === "Job")
                .map(
                  ([_, value]) =>
                    `<li style="font-size:1rem;color:black;font-weight:normal">${value}</li>`
                )
                .join("")}
            </ul>
          </li>`;
            }
          })
          .join("")}
      </ul>
    `;

    await transporter.sendMail({
      ...mailOptions,
      subject: "Enhance your skills with EasyWork!",
      text: "Dont's worry, EasyWork could help you skills and potential career",
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
