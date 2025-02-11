const express = require("express");
const router = require("./routes/index");
const cors = require("cors");
const { setupSwagger } = require("./config/swagger");

const app = express();
const port = parseInt(process.env.PORT || "3000", 10);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
setupSwagger(app);
app.use("/api", router);

app.listen(port, () => {
  console.log(`This app listening on http://localhost:${port}/`);
});

module.exports = app;
