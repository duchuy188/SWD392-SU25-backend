const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerAuth = require("./src/middlewares/swagger.middleware");
const { swaggerSpec, swaggerUiOptions } = require("./src/config/swagger");
const sequelize = require("./src/config/database");
const scholarshipRoutes = require("./src/routes/scholarshipRoutes");
const schoolRoutes = require("./src/routes/schoolRoutes");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to SQL Server successfully!");
  })
  .catch((err) => {
    console.error("Unable to connect to SQL Server:", err);
  });

// Apply authentication middleware to Swagger UI
app.use(
  "/api-docs",
  swaggerAuth,
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to AI Chatbot API" });
});
app.use("/api/schools", schoolRoutes);
app.use("/api/scholarships", scholarshipRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `Swagger documentation is available at http://localhost:${PORT}/api-docs`
  );
});
