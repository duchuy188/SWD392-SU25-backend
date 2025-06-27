const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerAuth = require("./src/middlewares/swagger.middleware");
const { swaggerSpec, swaggerUiOptions } = require("./src/config/swagger");
const connectDB = require("./src/config/database");
const models = require("./src/models");

require("dotenv").config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://educhatbot-ai.vercel.app",
      "https://swd-392-su-25-admin-dashboard-eosin.vercel.app",
      "https://swd-392-su-25-frontend.vercel.app",

      // "https://your-frontend-domain.com" // Uncomment and replace with your actual frontend domain

    ], // Thay bằng domain FE thật của bạn
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply authentication middleware to Swagger UI
app.use(
  "/api-docs",
  swaggerAuth,
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);



// Add your routes here
app.use('/api/majors', require('./src/routes/majors.routes'));
app.use('/api/scholarships', require('./src/routes/scholarships.routes'));
app.use('/api/chat', require('./src/routes/chat.routes'));
app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api/admin', require('./src/routes/admin.routes'));
app.use('/api/tests', require('./src/routes/tests.routes'));
app.use('/api/notifications', require('./src/routes/notification.routes'));

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Đã xảy ra lỗi server',
    message: err.message || 'Unknown error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `Swagger documentation is available at http://localhost:${PORT}/api-docs`
  );
});
