import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import productsRoutes from "./routes/product.route.js";
import brandRoutes from "./routes/brand.route.js";
import categoryRoutes from "./routes/category.route.js";
import userRouter from "./routes/user.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";

const app = express();

/* ===========================
   Security Middlewares
=========================== */

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL
      ? process.env.CLIENT_URL.split(",")
      : "*",
    credentials: true,
  })
);

app.use(compression());

/* ===========================
   Request Parsing
=========================== */

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ===========================
   Logging
=========================== */

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

/* ===========================
   Rate Limiting
=========================== */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api", limiter);

/* ===========================
   Health Check
=========================== */

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

/* ===========================
   API Routes
=========================== */

app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/brands", brandRoutes);
app.use("/api/v1/categories", categoryRoutes);

app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

/* ===========================
   404 Handler
=========================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ===========================
   Global Error Handler
=========================== */

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
  });
});

export default app;