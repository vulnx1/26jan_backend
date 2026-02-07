import axios from "axios";

export const sendWhatsApp = async (data) => {
  const isSample = data.type === "sample";

  const message = isSample
    ? `🧪 *New Sample Booking Request*

👤 Name: ${data.name}
📞 Phone: ${data.phone}
📧 Email: ${data.email}
🏢 Company: ${data.company}

🧪 Service: ${data.serviceType}
📦 Samples: ${data.quantity}
⚡ Urgency: ${data.urgency}

📝 Sample Description:
${data.sampleDescription}

📌 Additional Requirements:
${data.additionalRequirements || "N/A"}`
    : `📩 *New General Inquiry*

👤 Name: ${data.name}
📞 Phone: ${data.phone}
📧 Email: ${data.email}
🏢 Company: ${data.company || "N/A"}

🧪 Service: ${data.serviceType}

📝 Message:
${data.message}`;

  await axios.post(
    `https://graph.facebook.com/v18.0/${process.env.WA_PHONE_NUMBER_ID}/messages`,
    {
      messaging_product: "whatsapp",
      to: process.env.OWNER_WHATSAPP,
      type: "text",
      text: { body: message },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.WA_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
};
