import express from "express";
import { runConversion, getClassName } from "./scripts/builder.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.text());

app.post("/", async (req, res) => {
  try {
    const link = req.body;
    if (!link) {
      throw new Error("Invalid link");
    }

    const responseObj = {
      className: await getClassName(link), // assuming className is a string
      body: await runConversion(link),
    };

    res.json(responseObj);
  } catch (error) {
    console.error("Error processing link:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
