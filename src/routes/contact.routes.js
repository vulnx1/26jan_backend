import express from "express";
import { sendEmail } from "../services/email.service.js";
import { sendWhatsApp } from "../services/whatsapp.service.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    await sendEmail(data);
    await sendWhatsApp(data);

    res.status(200).json({ success: true, message: "Sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

export default router;
