import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import contactRoutes from "./routes/contact.routes.js";

dotenv.config();

const app = express();

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend URL
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from the public directory
app.use('/assets', express.static(path.join(__dirname, '..', 'public', 'assets'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.avif')) {
      res.set('Content-Type', 'image/avif');
    } else if (path.endsWith('.webp')) {
      res.set('Content-Type', 'image/webp');
    }
  }
}));

// Test route to verify static files are being served
app.get('/test-image', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'assets', 'hero', 'hero1.avif'));
});

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
