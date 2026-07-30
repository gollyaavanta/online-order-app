import { config } from "dotenv";
config({ path: ".env" });

import app from "./app.js";
import connectDB from "./database/index.js";

const PORT = process.env.PORT || 6000;

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Graceful shutdown
    process.on("SIGINT", () => {
      console.log("Shutting down server...");
      server.close(() => process.exit(0));
    });

    process.on("SIGTERM", () => {
      console.log("Shutting down server...");
      server.close(() => process.exit(0));
    });

  } catch (error) {
    console.error("Failed to start server");
    console.error(error);
    process.exit(1);
  }
};

startServer();