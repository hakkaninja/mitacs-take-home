import express from "express";
import cors from "cors";
import { institutionRouter } from "./routes/Institution.js";
import { locationRouter } from "./routes/Location.js";
import { populateData } from "./helpers/helpers.js";
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", institutionRouter);
app.use("/api/v1", locationRouter);

await populateData();

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
