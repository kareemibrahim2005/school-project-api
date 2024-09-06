const express = require("express");
const userRoutes = require("./src/Users/users-routes");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const bodyParser = require("body-parser");
const app = express();
const port = 9000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "School api",
      version: "1.0.0",
      description: "A simple Express School API",
    },
    servers: [
      {
        url: "http://localhost:9000",
      },
    ],
  },
  apis: ["./src/Users/users-routes.js"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
