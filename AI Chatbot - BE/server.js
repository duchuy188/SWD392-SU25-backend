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
app.use(cors({
  origin: '*',
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
}));
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `Swagger documentation is available at http://localhost:${PORT}/api-docs`
  );
});
