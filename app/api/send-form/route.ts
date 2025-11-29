import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Disable body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const phone = formData.get("phone")?.toString();
    const company =
      formData.get("company")?.toString() || "No company provided";
    const project_type = formData.get("project_type")?.toString();
    const budget = formData.get("budget")?.toString();
    const details = formData.get("details")?.toString();

    // Attachment
    const attachmentFile = formData.get("attachment") as File | null;
    let attachments = [];

    if (attachmentFile && attachmentFile.size > 0) {
      const fileBuffer = Buffer.from(await attachmentFile.arrayBuffer());
      attachments.push({
        filename: attachmentFile.name,
        content: fileBuffer,
      });
    }

   
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "osamatech94@gmail.com", 
        pass: "lzbnatbvfkdegzkn", 
      },
    });

    const htmlContent = `
      <h2>New Project Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Project Type:</strong> ${project_type}</p>
      <p><strong>Budget:</strong> ${budget}</p>
      <p><strong>Details:</strong><br>${details}</p>
    `;

    await transporter.sendMail({
      from: email,
      to: "osamatech94@gmail.com",
      subject: `New Project Request from ${name}`,
      html: htmlContent,
      attachments,
    });

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
