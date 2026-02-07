import nodemailer from "nodemailer";

export const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const isSample = data.type === "sample";

  const subject = isSample
    ? "🧪 New Sample Booking Request"
    : "📩 New General Inquiry";

  const html = isSample
    ? `
      <h2>New Sample Booking Request</h2>
      <hr/>
      <p><b>Name:</b> ${data.name}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Phone:</b> ${data.phone}</p>
      <p><b>Company:</b> ${data.company}</p>
      <p><b>Service:</b> ${data.serviceType}</p>
      <p><b>Number of Samples:</b> ${data.quantity}</p>
      <p><b>Urgency:</b> ${data.urgency}</p>
      <p><b>Sample Description:</b></p>
      <p>${data.sampleDescription}</p>
      <p><b>Additional Requirements:</b></p>
      <p>${data.additionalRequirements || "N/A"}</p>
    `
    : `
      <h2>New General Inquiry</h2>
      <hr/>
      <p><b>Name:</b> ${data.name}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Phone:</b> ${data.phone}</p>
      <p><b>Company:</b> ${data.company || "N/A"}</p>
      <p><b>Service:</b> ${data.serviceType}</p>
      <p><b>Message:</b></p>
      <p>${data.message}</p>
    `;

  const mailOptions = {
    from: `"Lab Website" <${process.env.EMAIL_USER}>`,
    to: process.env.OWNER_EMAIL, // supports multiple emails
    replyTo: data.email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};
