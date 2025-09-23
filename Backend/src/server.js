const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routers");
const { serverConfig, ConnectDB } = require("./config");
const { errorHandler } = require("./middlewares");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api", apiRoutes);

app.use(errorHandler);

app.listen(serverConfig.PORT, async () => {
  console.log(`Server is running on http://localhost:${serverConfig.PORT}`);
  await ConnectDB();
});