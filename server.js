const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("./middleware/logger.js");
const connectDB = require("./db");
dotenv.config({ path: "./config.env" });


const additionalRoute = require("./routes/additionalRoute.js");
const bannerRoute = require("./routes/bannerRoute.js");
const newsRoute = require("./routes/newsRoute.js");
const partnerRoute = require("./routes/partnerRoute.js");
const projectRoute = require("./routes/projectRoute.js");
const requestRoute = require("./routes/requestRoute.js");
const serviceRoute = require("./routes/serviceRoute.js");
const teamRoute = require("./routes/teamRoute.js");
const techRoute = require("./routes/techRoute.js");
const workRoute = require("./routes/workRoute.js");
const userRoute = require("./routes/userRoute.js");

const errorHandler = require("./middleware/error.js");
connectDB();
const app = express();
app.use(cors());
app.use(logger);
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/api/v1/additional", additionalRoute);
app.use("/api/v1/banner", bannerRoute);
app.use("/api/v1/news", newsRoute);
app.use("/api/v1/partner", partnerRoute);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/request", requestRoute);
app.use("/api/v1/service", serviceRoute);
app.use("/api/v1/team", teamRoute);
app.use("/api/v1/tech", techRoute);
app.use("/api/v1/work", workRoute);
app.use("/api/v1/user", userRoute);

app.use(errorHandler);

const server = app.listen(process.env.PORT);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Unhandled rejection error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
